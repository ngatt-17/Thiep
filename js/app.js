/**
 * THIỆP MỜI LỄ TỐT NGHIỆP • TẠ THỊ NGA
 * Phong cách Light Blue Quiet Luxury • Cá nhân hóa qua URL ?guest=id
 */

(function () {
  'use strict';

  // --- 1. CHUYỂN ĐỔI CHẾ ĐỘ SÁNG / TỐI (MẶC ĐỊNH: SÁNG) ---
  const THEME_STORAGE_KEY = 'thiep_nga_theme';

  function layGiaoDien() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // Mặc định là LIGHT MODE theo yêu cầu thiết kế mới
    return 'light';
  }

  function apDungGiaoDien(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('nut-doi-giao-dien');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
    }
  }

  function khoiTaoGiaoDien() {
    apDungGiaoDien(layGiaoDien());
    const btn = document.getElementById('nut-doi-giao-dien');
    if (btn) {
      btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'light' ? 'dark' : 'light';
        apDungGiaoDien(next);
        localStorage.setItem(THEME_STORAGE_KEY, next);
      });
    }
  }

  // --- 2. HIỂN THỊ THÔNG TIN SỰ KIỆN TỪ CONFIG ---
  function napThongTinSuKien() {
    const cfg = window.THONG_TIN_SU_KIEN;
    if (!cfg) return;

    ganChu('nhan-su-kien', cfg.nguoiTotNghiep.nhanSuKien);
    ganChu('ten-nguoi-tot-nghiep', cfg.nguoiTotNghiep.ten);
    ganChu('loi-dan', cfg.nguoiTotNghiep.loiDan);

    ganChu('hien-thi-ngay', cfg.thoiGian.ngayHienThi);
    ganChu('hien-thi-gio', cfg.thoiGian.gioHienThi);
    ganChu('hien-thi-dia-diem', cfg.diaDiem.tenDiaDiem);
    ganChu('hien-thi-dia-chi', cfg.diaDiem.diaChi);

    const linkBanDo = document.getElementById('link-xem-ban-do');
    if (linkBanDo && cfg.diaDiem.linkBanDo) {
      linkBanDo.href = cfg.diaDiem.linkBanDo;
    }

    const linkThemLich = document.getElementById('link-them-lich');
    if (linkThemLich && cfg.thoiGian.targetDate) {
      linkThemLich.href = taoLienKetLich(cfg);
    }
  }

  function taoLienKetLich(cfg) {
    const batDau = new Date(cfg.thoiGian.targetDate);
    const ketThuc = new Date(cfg.thoiGian.targetEndDate || batDau.getTime() + 2 * 60 * 60 * 1000);
    const dinhDangThoiGian = (date) => date.getFullYear()
      + String(date.getMonth() + 1).padStart(2, '0')
      + String(date.getDate()).padStart(2, '0') + 'T'
      + String(date.getHours()).padStart(2, '0')
      + String(date.getMinutes()).padStart(2, '0') + '00';
    const diaDiem = `${cfg.diaDiem.tenDiaDiem}, ${cfg.diaDiem.diaChi}`;
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `${cfg.nguoiTotNghiep.nhanSuKien} • ${cfg.nguoiTotNghiep.ten}`,
      dates: `${dinhDangThoiGian(batDau)}/${dinhDangThoiGian(ketThuc)}`,
      details: cfg.nguoiTotNghiep.loiDan,
      location: diaDiem,
      ctz: 'Asia/Ho_Chi_Minh'
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  function ganChu(id, noiDung) {
    const el = document.getElementById(id);
    if (el && noiDung) el.textContent = noiDung;
  }

  // --- 3. CÁ NHÂN HÓA LỜI MỜI THEO URL (?guest=slug) ---
  function locHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  async function napLoiMoiCaNhanHoa() {
    const thamSoURL = new URLSearchParams(window.location.search);
    const guestId = thamSoURL.get('guest');

    const elTenKhach = document.getElementById('ten-khach-moi');
    const elLoiNhan = document.getElementById('noi-dung-loi-nhan');

    const cfg = window.THONG_TIN_SU_KIEN || {};
    const macDinh = cfg.khachMacDinh || {
      ten: "Bạn thân mến",
      loiNhan: "Hôm nay có thể chỉ là một ngày tốt nghiệp, nhưng sẽ ý nghĩa hơn rất nhiều nếu có bạn cùng Nga lưu lại khoảnh khắc đáng nhớ này."
    };

    if (!guestId) {
      hienThiKhach(macDinh.ten, macDinh.loiNhan);
      return;
    }

    try {
      const res = await fetch('./guests.json');
      if (!res.ok) throw new Error('Không thể tải file guests.json');
      const danhSachKhach = await res.json();

      const khach = danhSachKhach.find(k => k.id && k.id.toLowerCase() === guestId.toLowerCase().trim());

      if (khach) {
        hienThiKhach(khach.name, khach.message);
        document.title = `Thiệp Mời Lễ Tốt Nghiệp • ${cfg.nguoiTotNghiep?.ten || 'Tạ Thị Nga'} | Gửi ${khach.name}`;
      } else {
        hienThiKhach(macDinh.ten, macDinh.loiNhan);
      }
    } catch (loi) {
      console.warn('Sử dụng lời mời mặc định:', loi);
      hienThiKhach(macDinh.ten, macDinh.loiNhan);
    }

    function hienThiKhach(ten, loiNhan) {
      if (elTenKhach) {
        elTenKhach.textContent = ten;
      }
      if (elLoiNhan) {
        elLoiNhan.textContent = `"${loiNhan}"`;
      }
    }
  }

  // --- 4. BỘ ĐẾM NGƯỢC THỜI GIAN NHỎ, TINH TẾ ---
  function khoiTaoDemNguoc() {
    const cfg = window.THONG_TIN_SU_KIEN;
    if (!cfg || !cfg.thoiGian || !cfg.thoiGian.targetDate) return;

    const mocThoiGian = new Date(cfg.thoiGian.targetDate).getTime();
    if (isNaN(mocThoiGian)) return;

    const elNgay = document.getElementById('dem-nguoc-ngay');
    const elGio = document.getElementById('dem-nguoc-gio');
    const elPhut = document.getElementById('dem-nguoc-phut');
    const elGiay = document.getElementById('dem-nguoc-giay');
    const containerDemNguoc = document.getElementById('khung-dem-nguoc-dong');
    const thongBaoKetThuc = document.getElementById('thong-bao-dien-ra');

    function capNhat() {
      const hienTai = new Date().getTime();
      const conLai = mocThoiGian - hienTai;

      if (conLai <= 0) {
        if (containerDemNguoc) containerDemNguoc.style.display = 'none';
        if (thongBaoKetThuc) {
          thongBaoKetThuc.style.display = 'block';
          thongBaoKetThuc.textContent = 'Buổi lễ đang diễn ra. Cảm ơn bạn đã luôn ở bên cạnh Nga!';
        }
        return;
      }

      const ngay = Math.floor(conLai / (1000 * 60 * 60 * 24));
      const gio = Math.floor((conLai % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const phut = Math.floor((conLai % (1000 * 60 * 60)) / (1000 * 60));
      const giay = Math.floor((conLai % (1000 * 60)) / 1000);

      if (elNgay) elNgay.textContent = String(ngay).padStart(2, '0');
      if (elGio) elGio.textContent = String(gio).padStart(2, '0');
      if (elPhut) elPhut.textContent = String(phut).padStart(2, '0');
      if (elGiay) elGiay.textContent = String(giay).padStart(2, '0');
    }

    capNhat();
    setInterval(capNhat, 1000);
  }

  // --- 5. NỀN ĐỘNG DYNAMIC CANVAS: HẠT NƯỚC, ÁNH SÁNG & TƯƠNG TÁC CHUỘT ---
  function khoiTaoNenDong() {
    const canvas = document.getElementById('canvas-nen-dong');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let hatList = [];
    const SO_LUONG_HAT = Math.min(window.innerWidth < 768 ? 32 : 60, 75);
    const mouse = { x: null, y: null, radius: 150 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    class Hat {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 15;
        this.radius = Math.random() * 2.5 + 1.2;
        this.vy = -(Math.random() * 0.45 + 0.2);
        this.vx = (Math.random() - 0.5) * 0.35;
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = Math.random() * 0.02 + 0.01;
        this.alpha = Math.random() * 0.5 + 0.35;
        this.isGlowOrb = Math.random() < 0.22;
        if (this.isGlowOrb) {
          this.radius = Math.random() * 10 + 7;
          this.alpha = Math.random() * 0.2 + 0.12;
        }
      }

      update() {
        this.phase += this.phaseSpeed;
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.phase) * 0.4;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0.1) {
            const force = (1 - dist / mouse.radius) * 1.5;
            this.x -= (dx / dist) * force;
            this.y -= (dy / dist) * force;
          }
        }

        if (this.y < -35 || this.x < -35 || this.x > width + 35) {
          this.reset(false);
        }
      }

      draw(isDark) {
        ctx.beginPath();
        if (this.isGlowOrb) {
          const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
          if (isDark) {
            grad.addColorStop(0, `rgba(128, 216, 255, ${this.alpha * 1.2})`);
            grad.addColorStop(0.5, `rgba(79, 195, 247, ${this.alpha * 0.5})`);
            grad.addColorStop(1, `rgba(79, 195, 247, 0)`);
          } else {
            grad.addColorStop(0, `rgba(2, 132, 199, ${this.alpha * 1.2})`);
            grad.addColorStop(0.5, `rgba(14, 165, 233, ${this.alpha * 0.5})`);
            grad.addColorStop(1, `rgba(14, 165, 233, 0)`);
          }
          ctx.fillStyle = grad;
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const color = isDark
            ? `rgba(128, 216, 255, ${this.alpha})`
            : `rgba(2, 132, 199, ${this.alpha * 1.1})`;
          ctx.fillStyle = color;
          ctx.shadowBlur = isDark ? 8 : 4;
          ctx.shadowColor = isDark ? 'rgba(79, 195, 247, 0.6)' : 'rgba(2, 132, 199, 0.35)';
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    function initParticles() {
      hatList = [];
      for (let i = 0; i < SO_LUONG_HAT; i++) {
        hatList.push(new Hat());
      }
    }

    function drawConnections(isDark) {
      const maxDist = 95;
      for (let i = 0; i < hatList.length; i++) {
        if (hatList[i].isGlowOrb) continue;
        for (let j = i + 1; j < hatList.length; j++) {
          if (hatList[j].isGlowOrb) continue;
          const dx = hatList[i].x - hatList[j].x;
          const dy = hatList[i].y - hatList[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alphaRatio = (1 - dist / maxDist);
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(79, 195, 247, ${alphaRatio * 0.22})`
              : `rgba(2, 132, 199, ${alphaRatio * 0.20})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(hatList[i].x, hatList[i].y);
            ctx.lineTo(hatList[j].x, hatList[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, width, height);

      drawConnections(isDark);

      for (let i = 0; i < hatList.length; i++) {
        hatList[i].update();
        hatList[i].draw(isDark);
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resize();
    initParticles();
    requestAnimationFrame(animate);
  }

  // Khởi chạy
  document.addEventListener('DOMContentLoaded', () => {
    khoiTaoGiaoDien();
    napThongTinSuKien();
    napLoiMoiCaNhanHoa();
    khoiTaoDemNguoc();
    khoiTaoNenDong();
  });

})();

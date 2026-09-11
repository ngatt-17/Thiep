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

    ganChu('hien-thi-ngay', cfg.thoiGian.ngayHienThi);
    ganChu('hien-thi-gio', cfg.thoiGian.gioHienThi);
    ganChu('hien-thi-dia-diem', cfg.diaDiem.tenDiaDiem);
    ganChu('hien-thi-dia-chi', cfg.diaDiem.diaChi);

    const linkBanDo = document.getElementById('link-xem-ban-do');
    if (linkBanDo && cfg.diaDiem.linkBanDo) {
      linkBanDo.href = cfg.diaDiem.linkBanDo;
    }

    const linkHustMap = document.getElementById('link-hust-map');
    if (linkHustMap && cfg.diaDiem.linkHustMap) {
      linkHustMap.href = cfg.diaDiem.linkHustMap;
    }

    const linkSdt = document.getElementById('link-sdt-lien-he');
    const chuSdt = document.getElementById('chu-sdt-lien-he');
    if (linkSdt && cfg.nguoiTotNghiep.sdt) {
      linkSdt.href = `tel:${cfg.nguoiTotNghiep.sdt}`;
      if (chuSdt) {
        chuSdt.textContent = `${cfg.nguoiTotNghiep.sdt} • ${cfg.nguoiTotNghiep.tenLienHe || 'Nga'}`;
      }
    }

    if (cfg.thongDiepThem) {
      if (cfg.thongDiepThem.nhacNho) ganChu('chu-nhac-nho-noi-dung', cfg.thongDiepThem.nhacNho);
      if (cfg.thongDiepThem.loiNhanChay) ganChu('chu-thoai-chay', cfg.thongDiepThem.loiNhanChay);
    }
  }

  function ganChu(id, noiDung) {
    const el = document.getElementById(id);
    if (el && noiDung) el.textContent = noiDung;
  }

  // --- 3. CÁ NHÂN HÓA LỜI MỜI THEO URL (?guest=slug) ---
  async function napLoiMoiCaNhanHoa() {
    const thamSoURL = new URLSearchParams(window.location.search);
    const guestId = thamSoURL.get('guest');
    const anDemNguoc = thamSoURL.get('nocountdown') === '1' || thamSoURL.get('capture') === '1';

    if (anDemNguoc) {
      document.body.classList.add('che-do-chup-anh');
    }

    const elTenKhach = document.getElementById('ten-khach-moi');
    const elLoiNhan = document.getElementById('noi-dung-loi-nhan');

    const cfg = window.THONG_TIN_SU_KIEN || {};
    const macDinh = cfg.khachMacDinh || {
      ten: "Bạn thân mến",
      loiNhan: "Bốn năm thanh xuân khép lại bằng một ngày thật đặc biệt. Nga rất mong bạn sẽ có mặt, cùng chung vui và lưu lại những khoảnh khắc thật đẹp trong ngày tốt nghiệp này nhé!"
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
        hienThiKhach(khach.name, khach.message || macDinh.loiNhan);
        document.title = `Thiệp mời tham dự Lễ tốt nghiệp • ${cfg.nguoiTotNghiep?.ten || 'Tạ Thị Nga'} | Gửi ${khach.name}`;
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
        elLoiNhan.textContent = `"${loiNhan || macDinh.loiNhan}"`;
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

  // --- 6. MASCOT CHIM CÁNH CỤT CUTE & DYNAMIC INTERACTION ---
  function khoiTaoMascotCanhCut() {
    const mascotTrai = document.getElementById('mascot-trai');
    const mascotPhai = document.getElementById('mascot-phai');
    const thoaiPhai = document.getElementById('thoai-canh-cut-phai');

    const cauThoaiPhai = [
      "Nga cảm ơn bạn nhiều lắm! Thả ngàn tim nè! 💙🐧",
      "Có bạn đến là ngày tốt nghiệp của Nga trọn vẹn nhất! ✨",
      "Một chiếc ôm ấm áp gửi tới bạn từ Nga! 🐧✨",
      "Thả tim xỉu luôn nè, bạn bấm nữa đi! 💙💙💙",
      "Hẹn gặp bạn ngày 26/09 tại Bách khoa nhé! 🎓🎉",
      "Yêu thương đong đầy gửi tới bạn thân mến! 💙"
    ];

    let idxPhai = 0;

    function taoHieuUngTimNo(x, y) {
      const bieuTuong = ['💙', '✨', '💎', '⭐', '🐧', '💙'];
      const soLuong = 8;

      for (let i = 0; i < soLuong; i++) {
        const el = document.createElement('span');
        el.className = 'hat-tim-no';
        el.textContent = bieuTuong[Math.floor(Math.random() * bieuTuong.length)];

        // Tọa độ bắn ngẫu nhiên hình tròn
        const goc = (i / soLuong) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
        const khoangCach = 38 + Math.random() * 50;
        const dx = Math.cos(goc) * khoangCach;
        const dy = Math.sin(goc) * khoangCach - 18;
        const rot = (Math.random() * 60 - 30) + 'deg';

        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.setProperty('--dx', dx + 'px');
        el.style.setProperty('--dy', dy + 'px');
        el.style.setProperty('--rot', rot);

        document.body.appendChild(el);
        setTimeout(() => el.remove(), 950);
      }
    }

    function ganSuKienMascot(mascot, thoaiEl, danhSachCauThoai, getIdx, setIdx) {
      if (!mascot) return;

      mascot.addEventListener('click', (e) => {
        // Nhảy nhót vui sướng
        mascot.classList.remove('nhay-tung-tang');
        void mascot.offsetWidth; // Force reflow
        mascot.classList.add('nhay-tung-tang');

        // Bắn tim
        const rect = mascot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        taoHieuUngTimNo(centerX, centerY);

        // Đổi câu thoại nếu có
        if (thoaiEl && danhSachCauThoai && danhSachCauThoai.length > 0) {
          let cur = getIdx();
          cur = (cur + 1) % danhSachCauThoai.length;
          setIdx(cur);
          thoaiEl.textContent = danhSachCauThoai[cur];

          thoaiEl.classList.add('dang-hien');
          clearTimeout(thoaiEl._timer);
          thoaiEl._timer = setTimeout(() => {
            thoaiEl.classList.remove('dang-hien');
          }, 3200);
        }
      });
    }

    ganSuKienMascot(mascotTrai, null, null, null, null);
    ganSuKienMascot(mascotPhai, thoaiPhai, cauThoaiPhai, () => idxPhai, (v) => idxPhai = v);
  }

  // --- 7. MASCOT CHIM CÁNH CỤT CHẠY LON TON NGANG MÀN HÌNH (RUNNING PENGUIN MASCOT) ---
  function khoiTaoMascotChayLonTon() {
    const elRunner = document.getElementById('chu-canh-cut-chay');
    if (!elRunner) return;

    let isRunning = false;
    let animId = null;
    let lastTrailTime = 0;

    function taoVetTim(x, y, sangPhai) {
      const bieuTuong = ['💙', '✨', '💙', '⭐', '💙'];
      const el = document.createElement('span');
      el.className = 'vet-tim-chay';
      el.textContent = bieuTuong[Math.floor(Math.random() * bieuTuong.length)];

      const dx = (sangPhai ? -1 : 1) * (14 + Math.random() * 22);
      const dy = -(10 + Math.random() * 18);
      const rot = (Math.random() * 50 - 25) + 'deg';

      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.setProperty('--dx', dx + 'px');
      el.style.setProperty('--dy', dy + 'px');
      el.style.setProperty('--rot', rot);

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1250);
    }

    function chayQuaManHinh() {
      if (isRunning) return;
      isRunning = true;

      const screenW = window.innerWidth;
      
      // 80% chạy từ trái sang phải, 20% chạy từ phải sang trái
      const sangPhai = Math.random() < 0.8;
      const direction = sangPhai ? 1 : -1;

      elRunner.style.display = 'flex';
      // Chim luôn chạy ở vị trí dẫn đầu hướng di chuyển, dòng chữ đi liền ngang người phía sau
      elRunner.style.flexDirection = sangPhai ? 'row-reverse' : 'row';
      elRunner.classList.add('dang-chay');

      // Đo chiều rộng chính xác sau khi đã bật hiển thị flex
      const runnerW = elRunner.offsetWidth || 350;
      const startX = sangPhai ? -runnerW - 60 : screenW + 60;
      const endX = sangPhai ? screenW + 60 : -runnerW - 60;

      let currentX = startX;
      elRunner.style.transform = `translate3d(${currentX}px, 0, 0)`;

      const innerMascot = elRunner.querySelector('.than-canh-cut-chay-inner');
      if (innerMascot) {
        innerMascot.style.transform = `scaleX(${direction})`;
      }

      let lastTime = performance.now();

      function step(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        // Tốc độ chạy lạch bạch vui nhộn (~110px/s)
        const pixelsPerSec = 110;
        currentX += (sangPhai ? 1 : -1) * pixelsPerSec * dt;

        elRunner.style.transform = `translate3d(${currentX}px, 0, 0)`;

        // Sinh hạt tim và bụi sao rơi lại phía sau chân chú chim cánh cụt
        if (now - lastTrailTime > 420) {
          lastTrailTime = now;
          const mRect = innerMascot ? innerMascot.getBoundingClientRect() : elRunner.getBoundingClientRect();
          if (mRect.right > 0 && mRect.left < screenW) {
            const trailX = sangPhai ? mRect.left + 12 : mRect.right - 12;
            const trailY = mRect.bottom - 18;
            taoVetTim(trailX, trailY, sangPhai);
          }
        }

        // Kiểm tra xem đã chạy hết màn hình chưa
        const daXong = sangPhai ? (currentX >= endX) : (currentX <= endX);
        if (daXong) {
          cancelAnimationFrame(animId);
          elRunner.classList.remove('dang-chay');
          elRunner.style.display = 'none';
          isRunning = false;

          // Lên lịch cho lần chạy tiếp theo sau 12s - 22s
          const thoiGianCho = 12000 + Math.random() * 10000;
          setTimeout(chayQuaManHinh, thoiGianCho);
        } else {
          animId = requestAnimationFrame(step);
        }
      }

      animId = requestAnimationFrame(step);
    }

    // Lần chạy đầu tiên: xuất hiện sau 3.5s khi mở trang
    setTimeout(chayQuaManHinh, 3500);
  }

  // Khởi chạy
  document.addEventListener('DOMContentLoaded', () => {
    khoiTaoGiaoDien();
    napThongTinSuKien();
    napLoiMoiCaNhanHoa();
    khoiTaoDemNguoc();
    khoiTaoNenDong();
    khoiTaoMascotCanhCut();
    khoiTaoMascotChayLonTon();
  });

})();


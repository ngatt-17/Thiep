/**
 * THIỆP MỜI LỄ TỐT NGHIỆP • TẠ THỊ NGA
 * Logic tối giản, đọc tham số ?guest=id từ URL và đếm ngược thời gian thực.
 */

(function () {
  'use strict';

  // --- 1. CHUYỂN ĐỔI CHẾ ĐỘ SÁNG / TỐI ---
  const THEME_STORAGE_KEY = 'thiep_nga_theme';

  function layGiaoDien() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // Mặc định: Dark Luxury
  }

  function apDungGiaoDien(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('nut-doi-giao-dien');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    }
  }

  function khoiTaoGiaoDien() {
    apDungGiaoDien(layGiaoDien());
    const btn = document.getElementById('nut-doi-giao-dien');
    if (btn) {
      btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = cur === 'dark' ? 'light' : 'dark';
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
    ganChu('thong-tin-khoa-nganh', cfg.nguoiTotNghiep.chuyenNganhKhoa);
    ganChu('loi-dan', cfg.nguoiTotNghiep.loiDan);
    ganChu('chu-ky-nguoi-moi', cfg.nguoiTotNghiep.chuKy);

    ganChu('hien-thi-ngay', cfg.thoiGian.ngayHienThi);
    ganChu('hien-thi-gio', cfg.thoiGian.gioHienThi);
    ganChu('hien-thi-truong', cfg.diaDiem.truong);
    ganChu('hien-thi-hoi-truong', cfg.diaDiem.hoiTruong);
    ganChu('hien-thi-dia-chi', cfg.diaDiem.diaChi);

    // Link chữ nhỏ "Xem bản đồ ↗"
    const linkBanDo = document.getElementById('link-xem-ban-do');
    if (linkBanDo && cfg.diaDiem.linkBanDo) {
      linkBanDo.href = cfg.diaDiem.linkBanDo;
    }
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

    const tieuDeLoiChao = document.getElementById('tieu-de-loi-chao');
    const noiDungLoiNhan = document.getElementById('noi-dung-loi-nhan');

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
      if (!res.ok) throw new Error('Không thể đọc file guests.json');
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
      if (tieuDeLoiChao) {
        tieuDeLoiChao.innerHTML = `Hẹn gặp bạn nhé, <span class="diem-nhan-ten-khach">${locHTML(ten)}</span>`;
      }
      if (noiDungLoiNhan) {
        noiDungLoiNhan.textContent = `"${loiNhan}"`;
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

  // Khởi chạy khi DOM sẵn sàng
  document.addEventListener('DOMContentLoaded', () => {
    khoiTaoGiaoDien();
    napThongTinSuKien();
    napLoiMoiCaNhanHoa();
    khoiTaoDemNguoc();
  });

})();

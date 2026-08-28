/**
 * CẤU HÌNH THIỆP MỜI LỄ TỐT NGHIỆP • TẠ THỊ NGA
 * Bạn có thể dễ dàng thay đổi thông tin sự kiện tại đây.
 */
const THONG_TIN_SU_KIEN = {
  // Người tốt nghiệp
  nguoiTotNghiep: {
    ten: "Tạ Thị Nga",
    nhanSuKien: "LỄ TỐT NGHIỆP",
    chuyenNganhKhoa: "Cử nhân Báo chí & Truyền thông • Khóa 2022 – 2026",
    loiDan: "Khoảnh khắc này sẽ trọn vẹn hơn khi có bạn ở đó.",
    chuKy: "Tạ Thị Nga"
  },

  // Thời gian (targetDate định dạng YYYY-MM-DDTHH:mm:ss dùng cho countdown)
  thoiGian: {
    targetDate: "2026-10-24T08:30:00",
    ngayHienThi: "Thứ Bảy, 24 Tháng 10, 2026",
    gioHienThi: "08:30"
  },

  // Địa điểm tổ chức
  diaDiem: {
    truong: "Học viện Báo chí và Tuyên truyền",
    hoiTruong: "Hội trường Lớn • Tòa nhà A1",
    diaChi: "36 Xuân Thủy, Cầu Giấy, Hà Nội",
    linkBanDo: "https://maps.google.com/?q=H%E1%BB%8Dc+vi%E1%BB%87n+B%C3%A1o+ch%C3%AD+v%C3%A0+Tuy%C3%AAn+truy%E1%BB%81n,+36+Xu%C3%A2n+Th%E1%BB%A7y,+H%C3%A0+N%E1%BB%99i"
  },

  // Nội dung mặc định khi URL không có ?guest= hoặc khách không có trong guests.json
  khachMacDinh: {
    ten: "Bạn thân mến",
    loiNhan: "Hôm nay có thể chỉ là một ngày tốt nghiệp, nhưng sẽ ý nghĩa hơn rất nhiều nếu có bạn cùng Nga lưu lại khoảnh khắc đáng nhớ này."
  }
};

window.THONG_TIN_SU_KIEN = THONG_TIN_SU_KIEN;

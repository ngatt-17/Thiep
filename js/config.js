/**
 * GRADUATION INVITATION CONFIGURATION
 * Bạn có thể dễ dàng tùy chỉnh toàn bộ thông tin sự kiện tại file này.
 */
const GRADUATION_CONFIG = {
  // Thông tin người tốt nghiệp
  graduate: {
    name: "Tạ Thị Nga",
    title: "Cử nhân Báo chí & Truyền thông",
    ceremonyTag: "GRADUATION CEREMONY",
    academicYear: "CLASS OF 2022 - 2026",
    quote: "Khoảnh khắc này sẽ trọn vẹn hơn khi có bạn ở đó.",
    signatureText: "Tạ Thị Nga"
  },

  // Thời gian diễn ra sự kiện (Dùng cho countdown & calendar)
  eventTime: {
    // Định dạng: YYYY-MM-DDTHH:mm:ss (ví dụ: 2026-10-24T08:30:00)
    targetDate: "2026-10-24T08:30:00",
    
    // Chuỗi hiển thị trực tiếp trên thiệp
    displayDate: "Thứ Bảy, 24 Tháng 10, 2026",
    displayTime: "08:30 - 11:30 (Đón khách từ 08:00)",
    durationHours: 3 // Thời lượng cho sự kiện lịch (giờ)
  },

  // Địa điểm tổ chức
  venue: {
    institution: "Học viện Báo chí và Tuyên truyền",
    hall: "Hội trường Lớn • Tòa nhà A1",
    address: "36 Xuân Thủy, Cầu Giấy, Hà Nội",
    
    // Đường dẫn Google Maps khi click nút "Xem địa điểm"
    mapUrl: "https://maps.google.com/?q=H%E1%BB%8Dc+vi%E1%BB%87n+B%C3%A1o+ch%C3%AD+v%C3%A0+Tuy%C3%AAn+truy%E1%BB%81n,+36+Xu%C3%A2n+Th%E1%BB%A7y,+H%C3%A0+N%E1%BB%99i"
  },

  // Thông tin phản hồi (RSVP)
  rsvp: {
    // Đường dẫn Google Form hoặc link RSVP của bạn
    formUrl: "https://forms.google.com",
    deadline: "Vui lòng xác nhận trước ngày 20/10/2026"
  },

  // Lời nhắn mặc định khi URL không có ?guest= hoặc guest không tồn tại
  fallbackGuest: {
    greeting: "Bạn thân mến",
    message: "Hôm nay có thể chỉ là một ngày tốt nghiệp, nhưng sẽ ý nghĩa hơn rất nhiều nếu có bạn cùng Nga lưu lại khoảnh khắc đáng nhớ này. Rất mong được đón tiếp bạn!"
  },

  // Kỷ niệm / Polaroid note
  memoryCard: {
    photoCaption: "Save the moment • Autumn 2026",
    subtext: "Lưu giữ một chặng đường thanh xuân rực rỡ"
  },

  // Thông tin liên hệ phụ
  contact: {
    phone: "0912 345 678",
    note: "Nếu bạn cần chỉ đường hoặc hỗ trợ khi đến hội trường, đừng ngần ngại gọi cho Nga nhé!"
  }
};

// Export để sử dụng trên trình duyệt
window.GRADUATION_CONFIG = GRADUATION_CONFIG;

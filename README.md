# 🎓 Thiệp Mời Lễ Tốt Nghiệp Cá Nhân Hóa • Tạ Thị Nga

Website thiệp mời tốt nghiệp cá nhân hóa phong cách **Quiet Luxury & Editorial Cinematic**, thiết kế tối giản, thanh lịch, 100% tiếng Việt và sẵn sàng deploy trực tiếp lên **GitHub Pages**.

---

## 🌟 9 Thành Phần Cốt Lõi Trên Giao Diện

1. **Ảnh tốt nghiệp**: Bố cục 50/50 cột trái trên máy tính (hoặc phía trên trên điện thoại), xử lý cinematic bằng CSS.
2. **Nhãn "LỄ TỐT NGHIỆP"**: Điểm nhấn chữ vàng Champagne tinh tế.
3. **Tên chính "Tạ Thị Nga"**: Typography font Serif cổ điển, sang trọng.
4. **Thông tin khóa / ngành / năm**: Cử nhân Báo chí & Truyền thông • Khóa 2022 – 2026.
5. **Thời gian & Địa điểm**: Ngày, giờ, hội trường, địa chỉ chi tiết.
6. **Link chữ nhỏ "Xem bản đồ ↗"**: Tối giản, thanh lịch, mở Google Maps chỉ đường.
7. **Lời mời cá nhân hóa**: Tự động hiển thị *"Hẹn gặp bạn nhé, [Tên khách]"* cùng lời nhắn riêng từ file `guests.json`.
8. **Countdown nhỏ, tinh tế**: Bộ đếm ngày, giờ, phút, giây phong cách typography thanh mảnh.
9. **Nút chuyển chế độ Sáng / Tối**: Nút toggle ☀️ / 🌙 ở góc trên bên phải, lưu lựa chọn vào `localStorage`.

---

## 📁 Cấu Trúc Thư Mục Tinh Gọn

```text
Thiep/
├── index.html                  # Giao diện thiệp mời chính
├── guests.json                 # Danh sách khách mời & lời nhắn cá nhân
├── favicon.svg                 # Biểu tượng monogram website
├── css/
│   └── style.css               # Hệ thống CSS Quiet Luxury & Responsive
├── js/
│   ├── config.js               # Cấu hình thông tin sự kiện
│   └── app.js                  # Logic đọc URL ?guest=id, countdown & theme
├── assets/
│   └── images/
│       └── portrait.jpg        # Ảnh chân dung tốt nghiệp của Nga
└── README.md                   # Hướng dẫn sử dụng
```

---

## 🛠️ Hướng Dẫn Tùy Chỉnh

### 1. Thay Ảnh Chân Dung
- Đổi tên ảnh tốt nghiệp thật của Nga thành `portrait.jpg` và chép đè vào:
  ```text
  assets/images/portrait.jpg
  ```
- *Website đã thiết lập sẵn `object-fit: cover` và gradient overlay chuyển mượt bằng CSS, tự động căn chỉnh hoàn hảo.*

---

### 2. Thay Đổi Thông Tin Sự Kiện
Mở file [`js/config.js`](file:///c:/Users/Admin/Downloads/Thiep/js/config.js) để chỉnh sửa:

```javascript
const THONG_TIN_SU_KIEN = {
  nguoiTotNghiep: {
    ten: "Tạ Thị Nga",
    nhanSuKien: "LỄ TỐT NGHIỆP",
    chuyenNganhKhoa: "Cử nhân Báo chí & Truyền thông • Khóa 2022 – 2026",
    loiDan: "Khoảnh khắc này sẽ trọn vẹn hơn khi có bạn ở đó.",
    chuKy: "Tạ Thị Nga"
  },

  thoiGian: {
    targetDate: "2026-10-24T08:30:00", // Định dạng YYYY-MM-DDTHH:mm:ss cho countdown
    ngayHienThi: "Thứ Bảy, 24 Tháng 10, 2026",
    gioHienThi: "08:30"
  },

  diaDiem: {
    truong: "Học viện Báo chí và Tuyên truyền",
    hoiTruong: "Hội trường Lớn • Tòa nhà A1",
    diaChi: "36 Xuân Thủy, Cầu Giấy, Hà Nội",
    linkBanDo: "https://maps.google.com/?q=..."
  }
};
```

---

### 3. Quản Lý Danh Sách Khách Mời Trong `guests.json`
Mở file [`guests.json`](file:///c:/Users/Admin/Downloads/Thiep/guests.json) và thêm người nhận thiệp:

```json
[
  {
    "id": "nguyen-van-a",
    "name": "Nguyễn Văn A",
    "message": "Nga rất vui nếu bạn có mặt trong ngày đặc biệt này."
  },
  {
    "id": "tran-thi-b",
    "name": "Trần Thị B",
    "message": "Cảm ơn bạn vì đã đồng hành cùng Nga."
  }
]
```

#### Cách tạo link riêng gửi cho từng người:
Chỉ cần thêm `?guest=id` vào sau địa chỉ website của bạn:
- Gửi bạn A: `https://ngatt-17.github.io/Thiep/?guest=nguyen-van-a`
- Gửi bạn B: `https://ngatt-17.github.io/Thiep/?guest=tran-thi-b`
- Khi truy cập không có `?guest=...` hoặc id không có trong danh sách, website sẽ tự động hiển thị lời mời mặc định thân thương.

---

## 🌐 Deploy Lên GitHub Pages (Cập Nhật Tự Động)

Mỗi khi bạn sửa đổi file `guests.json` hoặc thông tin sự kiện, chỉ cần chạy các lệnh sau trong terminal:

```bash
git add .
git commit -m "Cập nhật danh sách khách mời"
git push origin main
```

GitHub Pages sẽ tự động cập nhật website chỉ sau khoảng 1 phút!
Link trang chủ: **`https://ngatt-17.github.io/Thiep/`**

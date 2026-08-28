# 🎓 Thiệp Mời Lễ Tốt Nghiệp Cá Nhân Hóa • Tạ Thị Nga

Website thiệp mời tốt nghiệp cá nhân hóa phong cách **Light Blue Quiet Luxury**, thiết kế tối giản, thanh lịch, airy, ấm áp và sẵn sàng deploy trực tiếp lên **GitHub Pages**.

---

## 🌟 Bố Cục Nội Dung Mới & Điểm Nhấn

1. **LỄ TỐT NGHIỆP**: Nhãn micro-tag xanh thanh lịch.
2. **Tên chính "Tạ Thị Nga"**: Typography font Serif Display trang trọng, nổi bật.
3. **Cử nhân Báo chí & Truyền thông • Khóa 2022 – 2026**: Thông tin ngắn gọn.
4. **Câu quote ngắn**: *"Khoảnh khắc này sẽ trọn vẹn hơn khi có bạn ở đó."*
5. **Khối cá nhân hóa ngay phía trên**:
   - Dòng chào: *Hẹn gặp bạn nhé,*
   - **TÊN KHÁCH MỜI**: Điểm nhấn thị giác quan trọng với font Serif Display lớn và màu xanh accent.
   - Lời nhắn cá nhân riêng từ `guests.json`.
6. **Ngày tốt nghiệp**: Nổi bật, dễ đọc.
7. **Thời gian**: Giờ đón khách & diễn ra.
8. **Địa điểm**: Hội trường & học viện.
9. **Link chữ nhỏ "Xem bản đồ ↗"**: Mở Google Maps chỉ đường.
10. **Countdown nhỏ, tinh tế**: Bộ đếm typography tối giản ở cuối trang.
11. **Nút chuyển chế độ Sáng / Tối**: ☀️ / 🌙 ở góc trên bên phải (Mặc định là giao diện **Light Blue Quiet Luxury** thanh lịch).

---

## 📁 Cấu Trúc Thư Mục

```text
Thiep/
├── index.html                  # Giao diện thiệp mời chính
├── guests.json                 # Danh sách khách mời & lời nhắn cá nhân
├── favicon.svg                 # Biểu tượng monogram website
├── css/
│   └── style.css               # Hệ thống CSS Light Blue Quiet Luxury & Responsive
├── js/
│   ├── config.js               # Cấu hình thông tin sự kiện
│   └── app.js                  # Logic đọc URL ?guest=id, countdown & theme
├── assets/
│   └── images/
│       ├── portrait.jpg        # Ảnh chân dung tốt nghiệp của Nga
│       └── monogram.svg        # Editorial Monogram "TN"
└── README.md                   # Hướng dẫn sử dụng
```

---

## 🛠️ Hướng Dẫn Tùy Chỉnh

### 1. Thay Ảnh Chân Dung
- Đổi tên ảnh tốt nghiệp thật của Nga thành `portrait.jpg` và chép đè vào:
  ```text
  assets/images/portrait.jpg
  ```
- *Website đã thiết lập sẵn `object-fit: cover` và gradient overlay chuyển mượt bằng CSS sang nền xanh sáng, tự động căn chỉnh hoàn hảo.*

---

### 2. Thay Đổi Thông Tin Sự Kiện
Mở file [`js/config.js`](file:///c:/Users/Admin/Downloads/Thiep/js/config.js) để chỉnh sửa:

```javascript
const THONG_TIN_SU_KIEN = {
  nguoiTotNghiep: {
    ten: "Tạ Thị Nga",
    nhanSuKien: "LỄ TỐT NGHIỆP",
    chuyenNganhKhoa: "Cử nhân Báo chí & Truyền thông • Khóa 2022 – 2026",
    loiDan: "Khoảnh khắc này sẽ trọn vẹn hơn khi có bạn ở đó."
  },

  thoiGian: {
    targetDate: "2026-10-24T08:30:00", // Định dạng YYYY-MM-DDTHH:mm:ss cho countdown
    ngayHienThi: "Thứ Bảy, 24 Tháng 10, 2026",
    gioHienThi: "08:30"
  },

  diaDiem: {
    tenDiaDiem: "Hội trường Lớn • Tòa nhà A1, Học viện Báo chí và Tuyên truyền",
    diaChi: "36 Xuân Thủy, Cầu Giấy, Hà Nội",
    linkBanDo: "https://maps.google.com/?q=..."
  }
};
```

---

### 3. Quản Lý Danh Sách Khách Mời Trong `guests.json`
Mở file [`guests.json`](file:///c:/Users/Admin/Downloads/Thiep/guests.json) và thêm bạn bè:

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

#### Cách gửi link riêng cho từng người:
Chỉ cần thêm `?guest=id` vào sau địa chỉ website:
- Gửi bạn A: `https://ngatt-17.github.io/Thiep/?guest=nguyen-van-a`
- Gửi bạn B: `https://ngatt-17.github.io/Thiep/?guest=tran-thi-b`
- Khi người nhận mở link, ngay ở nửa trên của thiệp họ sẽ thấy ngay dòng chào trang trọng dành riêng cho chính mình!
- Nếu truy cập không có `?guest=...`, website tự động hiển thị lời mời mặc định *"Bạn thân mến"*.

---

## 🌐 Deploy Lên GitHub Pages (Cập Nhật Tự Động)

Mỗi khi bạn sửa đổi file `guests.json` hoặc thông tin sự kiện, chỉ cần chạy các lệnh sau trong terminal:

```bash
git add .
git commit -m "Cập nhật thiệp mời"
git push origin main
```

GitHub Pages sẽ tự động cập nhật website chỉ sau khoảng 1 phút!
Link trang chủ: **`https://ngatt-17.github.io/Thiep/`**

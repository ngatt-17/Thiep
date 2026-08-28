# 🎓 Thiệp Mời Lễ Tốt Nghiệp Cá Nhân Hóa • Tạ Thị Nga

Website thiệp mời tốt nghiệp cao cấp phong cách **Quiet Luxury & Editorial Cinematic**, hỗ trợ tạo link cá nhân hóa cho từng khách mời, đếm ngược thời gian thực, lưu lịch và triển khai hoàn toàn miễn phí trên **GitHub Pages**.

---

## 🌟 Tính Năng Nổi Bật

- **Quiet Luxury & Cinematic**: Thiết kế bố cục 50/50 chuẩn tạp chí cao cấp. 75-80% nền tối/sáng sâu lắng, 5% điểm nhấn Champagne Gold tinh tế, đường nét hairline thanh mảnh.
- **Cá nhân hóa theo đường link (`?guest=id`)**: Mỗi người bạn nhận được một link riêng với lời chào và lời chúc đặc biệt dành cho riêng họ.
- **Dark Mode & Light Mode**: Hỗ trợ chuyển đổi giao diện Sáng / Tối mượt mà qua nút bấm ☀️ / 🌙, tự động ghi nhớ tùy chọn vào `localStorage`.
- **Đếm ngược thời gian thực**: Bộ đếm ngày, giờ, phút, giây phong cách typography tối giản.
- **Tương tác thông minh**:
  - Xác nhận tham dự (RSVP qua Google Form).
  - Thêm sự kiện vào Google Calendar & Tải file `.ics` (tương thích Apple Calendar/iOS & Outlook).
  - Xem vị trí hội trường trên Google Maps.
  - Nút sao chép link thiệp 1-chạm kèm Toast thông báo.
- **Công cụ tạo link độc quyền (`tools/link-generator.html`)**:
  - Tự động chuyển đổi tiếng Việt có dấu sang Slug ID (ví dụ: *Nguyễn Văn A* ➔ `nguyen-van-a`).
  - Xem trước link trực tiếp, copy 1-chạm gửi qua Messenger/Zalo.
  - Thêm bạn mới và tải về file `guests.json` đã cập nhật ngay trên trình duyệt mà không cần biết code.
- **100% Zero-Build & GitHub Pages Ready**: Chạy hoàn toàn bằng HTML, CSS và JavaScript thuần, không cần Node.js hay cơ sở dữ liệu.

---

## 📁 Cấu Trúc Thư Mục

```text
Thiep/
├── index.html                  # Giao diện thiệp mời chính
├── guests.json                 # Dữ liệu danh sách khách mời cá nhân hóa
├── favicon.svg                 # Biểu tượng website (Monogram TN)
├── css/
│   └── style.css               # Hệ thống CSS Design System & Responsive
├── js/
│   ├── config.js               # File cấu hình toàn bộ thông tin sự kiện
│   └── app.js                  # Logic đếm ngược, cá nhân hóa, calendar, theme
├── assets/
│   └── images/
│       ├── portrait.jpg        # Ảnh chân dung tốt nghiệp chính của Nga
│       ├── polaroid.jpg        # Ảnh kỷ niệm phong cách polaroid
│       └── monogram.svg        # Editorial Monogram "TN"
├── tools/
│   └── link-generator.html     # Công cụ quản lý & tạo link khách mời
└── README.md                   # Hướng dẫn chi tiết
```

---

## 🚀 Hướng Dẫn Tùy Chỉnh & Sử Dụng

### 1. Cách Thay Ảnh Chân Dung
Ảnh chân dung được thiết kế với chuẩn `object-fit: cover` và toàn bộ hiệu ứng gradient/vignette được xử lý bằng CSS.

- **Bước 1**: Chuẩn bị ảnh chân dung tốt nghiệp thật của Tạ Thị Nga (ưu tiên ảnh chụp dọc tỉ lệ 2:3 hoặc 3:4, độ nét cao).
- **Bước 2**: Đổi tên ảnh thành `portrait.jpg` và chép đè vào thư mục:
  ```text
  assets/images/portrait.jpg
  ```
- **Bước 3**: (Tùy chọn) Để đổi ảnh kỷ niệm ở góc dưới thiệp, chép ảnh vào:
  ```text
  assets/images/polaroid.jpg
  ```
> *Website sẽ tự động căn chỉnh và xử lý màu sắc hoàn hảo mà không cần bạn sửa bất kỳ dòng code nào!*

---

### 2. Cách Thay Đổi Thông Tin Sự Kiện (Ngày, Giờ, Địa Điểm)
Mở file [`js/config.js`](file:///c:/Users/Admin/Downloads/Thiep/js/config.js) bằng bất kỳ trình soạn thảo nào (VS Code, Notepad, v.v.) và chỉnh sửa các thông số:

```javascript
const GRADUATION_CONFIG = {
  graduate: {
    name: "Tạ Thị Nga",                         // Tên hiển thị lớn
    title: "Cử nhân Báo chí & Truyền thông",      // Chuyên ngành / Danh hiệu
    ceremonyTag: "GRADUATION CEREMONY",
    academicYear: "CLASS OF 2022 - 2026",
    quote: "Khoảnh khắc này sẽ trọn vẹn hơn khi có bạn ở đó."
  },

  eventTime: {
    targetDate: "2026-10-24T08:30:00",          // Định dạng YYYY-MM-DDTHH:mm:ss cho countdown
    displayDate: "Thứ Bảy, 24 Tháng 10, 2026",  // Ngày hiển thị trên thiệp
    displayTime: "08:30 - 11:30 (Đón khách từ 08:00)",
    durationHours: 3                            // Số giờ sự kiện (dùng cho lịch)
  },

  venue: {
    institution: "Học viện Báo chí và Tuyên truyền",
    hall: "Hội trường Lớn • Tòa nhà A1",
    address: "36 Xuân Thủy, Cầu Giấy, Hà Nội",
    mapUrl: "https://maps.google.com/?q=..."    // Link Google Maps
  },

  rsvp: {
    formUrl: "https://forms.google.com/..."     // Link Google Form xác nhận tham dự
  }
};
```

---

### 3. Cách Thêm Bạn Bè & Tạo Link Riêng Cho Từng Người

#### Cách 1: Dùng Công Cụ Trực Quan (Khuyên dùng - Cực nhanh)
1. Mở file [`tools/link-generator.html`](file:///c:/Users/Admin/Downloads/Thiep/tools/link-generator.html) trên trình duyệt (hoặc click nút *"Tạo link"* ở góc trên thiệp).
2. Nhập **Họ và tên bạn bè** (ví dụ: `Hoàng Minh Châu`) ➔ Công cụ tự động tạo slug `hoang-minh-chau`.
3. Nhập **Lời nhắn riêng** dành cho bạn ấy.
4. Bấm **"📋 Sao chép link này ngay"** để gửi trực tiếp qua Messenger / Zalo.
5. Bấm **"+ Thêm vào danh sách tạm thời"**.
6. Sau khi nhập hết danh sách bạn bè, bấm nút **"💾 Tải về guests.json"** và lưu đè file này vào thư mục gốc của dự án.

#### Cách 2: Chỉnh sửa trực tiếp file `guests.json`
Mở file [`guests.json`](file:///c:/Users/Admin/Downloads/Thiep/guests.json) và thêm người mới theo cấu trúc:
```json
[
  {
    "id": "nguyen-van-a",
    "name": "Nguyễn Văn A",
    "message": "Nga rất vui nếu có bạn đến chung vui trong ngày đặc biệt này ❤️"
  },
  {
    "id": "hoang-minh-chau",
    "name": "Hoàng Minh Châu",
    "message": "Cảm ơn vì đã luôn đồng hành cùng Nga. Nhớ đến chung vui nhé!"
  }
]
```

---

## 🌐 Hướng Dẫn Deploy Lên GitHub Pages (3 Bước)

Vì đây là website **100% tĩnh**, bạn có thể đưa lên mạng trong vòng 2 phút hoàn toàn miễn phí:

### Bước 1: Đẩy mã nguồn lên GitHub
Mở Terminal trong thư mục dự án và chạy các lệnh:
```bash
git init
git add .
git commit -m "Graduation invitation website for Ta Thi Nga"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```
*(Thay `USERNAME` và `REPO_NAME` bằng tài khoản và tên kho lưu trữ GitHub của bạn)*

### Bước 2: Kích hoạt GitHub Pages
1. Truy cập vào Repository trên GitHub: `https://github.com/USERNAME/REPO_NAME`.
2. Vào mục **Settings** ➔ chọn tab **Pages** ở thanh menu bên trái.
3. Tại mục **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`.
   - **Branch**: Chọn nhánh `main`, thư mục `/ (root)`.
4. Bấm **Save**.

### Bước 3: Hoàn tất & Chia sẻ link
Sau khoảng 1–2 phút, GitHub sẽ cung cấp đường link website chính thức của bạn:
```text
https://USERNAME.github.io/REPO_NAME/
```

Bây giờ bạn có thể gửi link thiệp mời cá nhân hóa cho bạn bè:
- Gửi bạn A: `https://USERNAME.github.io/REPO_NAME/?guest=nguyen-van-a`
- Gửi bạn B: `https://USERNAME.github.io/REPO_NAME/?guest=tran-thi-b`
- Khi người nhận mở link, website sẽ tự động cá nhân hóa tên và lời chúc dành riêng cho họ!

---

## 💻 Chạy Thử Nghiệm Local (Máy Tính Cá Nhân)

Để trình duyệt có thể đọc file `guests.json` mượt mà khi phát triển local, bạn chạy lệnh sau trong thư mục dự án:

```bash
# Sử dụng Python (có sẵn trên máy tính)
python -m http.server 8000
```
Sau đó mở trình duyệt và truy cập:
- Thiệp chính: `http://localhost:8000/`
- Xem thử bạn A: `http://localhost:8000/?guest=nguyen-van-a`
- Công cụ tạo link: `http://localhost:8000/tools/link-generator.html`

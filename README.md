# Doctor Reservation UI

رابط کاربری فارسی و RTL برای یک سامانه رزرو پزشک، ساخته‌شده فقط با HTML/CSS/JavaScript.

## فایل‌ها
- `index.html` صفحه رزرو و نمایش پزشکان
- `admin.html` پنل مدیریت
- `style.css` ظاهر و واکنش‌گرایی
- `script.js` منطق صفحه رزرو
- `admin.js` منطق پنل مدیریت

## اجرا
فقط `index.html` را با مرورگر باز کنید.

## نکته مهم
این نسخه Front-end مستقل است و اطلاعات را داخل `localStorage` مرورگر نگه می‌دارد. برای اتصال واقعی به FastAPI، در JavaScript باید درخواست‌های `fetch` به endpointهای API شما اضافه شوند.

Endpointهای مورد انتظار از API:
POST /create
GET /doctors
GET /doctors/{id}
DELETE /doctors/{id}/delete
PATCH /doctors/{id}/update
POST /doctors/{id}/reserve
DELETE /doctors/{id}/cancel
POST /ask_ai

در نسخه واقعی، بهتر است آدرس API در یک متغیر مانند `API_BASE_URL` تعریف شود و عملیات CRUD و رزرو به FastAPI متصل شوند.

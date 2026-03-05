# Fresh Choice Organic

## Current State
- Full product listing with 8 items (eggs, honey, chicken)
- Cart and checkout flow (UPI + COD)
- Order placed and stored in backend with phone, name, address, items, status
- Admin page at `/admin/orders` — accessible to anyone without authentication
- Orders queryable by phone number (`get_orders_by_phone`)
- Bilingual (English/Telugu) with language splash screen
- No login/authentication system
- No customer order dashboard
- No admin access control (anyone can access /admin/orders)
- No email notifications

## Requested Changes (Diff)

### Add
- **Customer OTP login**: Customer enters their mobile number → receives a simulated OTP (stored in backend, 6-digit) → enters OTP to log in. Logged-in state stored in React context (localStorage). Phone number used as their identity.
- **Customer dashboard** (`/my-orders`): After OTP login, customers can see all their own orders with live status tracking.
- **Admin OTP login**: Admin enters `7801099660` → OTP sent → logs in. Admin flag determined by phone number matching `7801099660`.
- **Admin panel** (`/admin/orders`): Protected behind admin OTP login. Admin sees all orders and can update status.
- **Order status reflected in customer dashboard**: When admin updates status, customer's `/my-orders` page shows the updated status in real-time (on refresh/refetch).
- **Email notification to Freshchoiceorg@gmail.com**: On every order placed, on every status update (especially Delivered), and on payment confirmation — send email notification to the admin email. Since email is disabled on this plan, implement a backend `email_log` that records all notification events (to, subject, body) so they can be reviewed; display a note in admin panel about email logs.
- **Login/logout flow**: Header shows login button when logged out; shows user phone + logout when logged in.
- **OTP backend functions**: `send_otp(phone)` generates and stores a 6-digit OTP with timestamp. `verify_otp(phone, otp)` verifies and returns a session token. Session stored in backend map.
- **Session validation**: `validate_session(phone, token)` returns user role (customer | admin).

### Modify
- **Admin page** — now requires admin login (redirect to login if not authenticated as admin)
- **Checkout page** — after order placed, store order linked to customer's phone (already done by phone field). If customer is logged in via OTP, pre-fill phone number.
- **Header on HomePage** — add "My Orders" button (login-gated) and login/logout icon
- **Order confirmation page** — show "View My Orders" link if customer is logged in

### Remove
- Nothing removed

## Implementation Plan

1. **Backend**: Add OTP system — `send_otp(phone)`, `verify_otp(phone, otp)` → returns session token, `validate_session(phone, token)` → returns role. Add `email_log` type and `get_email_logs()` for admin. Add `place_order_v2` that also logs email event on placement. Status update also logs email event.
2. **AuthContext (frontend)**: React context storing `{ phone, token, role }` in localStorage. Provides `login`, `logout`, `isAdmin`, `isLoggedIn`.
3. **OTP Login Modal/Page**: Phone entry → send OTP (backend) → OTP entry → verify → login. Used for both customers and admin.
4. **Customer dashboard** `/my-orders`: Shows orders filtered by logged-in phone. Live status badges. Requires login.
5. **Admin panel guard**: Redirect to admin login if not authenticated as admin.
6. **Header updates**: Add My Orders + Login/Logout to header in HomePage, CheckoutPage, etc.
7. **Email log panel** in admin: Shows all notification events (order placed, status changed) as a log.
8. **Translation keys**: Add new translation keys for login, OTP, my orders, etc.

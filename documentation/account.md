fileName : account.controller.js

🔐 registerAccount:
- কাজ: নতুন ইউজার বা অ্যাডমিন অ্যাকাউন্ট তৈরি করে।
- ইনপুট: username, email, password, role, adminKey (যদি role = admin হয়)
- প্রসেস:
  - সব ফিল্ড চেক করে
  - যদি admin হয়, তাহলে adminSecretKey যাচাই করে
  - password hash করে
  - নতুন account DB তে save করে
  - JWT token তৈরি করে
- আউটপুট: success message + token

🔐 loginAccount:
- কাজ: ইমেইল ও পাসওয়ার্ড যাচাই করে লগইন
- ইনপুট: email, password
- প্রসেস:
  - email check করে DB থেকে
  - password match করে
  - token তৈরি করে
- আউটপুট: success message + token

👁 getAllUserForAdmin:
- কাজ: সব ইউজারের account (password বাদে) দেখায় (admin use এর জন্য)
- আউটপুট: users array

👤 getSingleUser:
- কাজ: JWT token থেকে ইউজারের ID নিয়ে ওই ইউজারের ডাটা (password ছাড়া) ফেরত দেয়

✏️ updateUserAccount:
- কাজ: admin এর মাধ্যমে user এর status আপডেট করে

✏️ updateMyAccount:
- কাজ: ইউজার তার account এর বিভিন্ন field update করতে পারে

🗑 deleteUserAccount:
- কাজ: admin ইউজারকে মুছে দিতে পারে

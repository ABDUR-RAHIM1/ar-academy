
fileName : categories.controller.js

📁 Category Controller Documentation

🟢 createCategory:
- কাজ: নতুন একটি ক্যাটাগরি তৈরি করে
- ইনপুট: 
  - position: (number) ক্যাটাগরির সিরিয়াল অবস্থান
  - categorie: (string) ক্যাটাগরির নাম
  - description: (string) বর্ণনা
- প্রসেস:
  - ক্যাটাগরির নাম থেকে slug তৈরি করে
  - একই slug থাকলে error দেয়
  - নতুন ক্যাটাগরি DB তে save করে
- আউটপুট:
  - Success: 201 + message: "Successfully Created"
  - Fail: 400 (Already Created) / 500 (Server Error)


🟡 getCategories:
- কাজ: সব ক্যাটাগরির list আনবে
- প্রসেস:
  - position এবং _id অনুযায়ী sort করে ক্যাটাগরি দেখায়
- আউটপুট:
  - Success: 200 + ক্যাটাগরির array
  - Fail: 500 (Server Error)


🟠 updateCategory:
- কাজ: নির্দিষ্ট ক্যাটাগরি আপডেট করে
- ইনপুট:
  - categorieId (params): ক্যাটাগরির ID
  - body: { position, categorie, description }
- প্রসেস:
  - categorie থেকে slug তৈরি করে
  - দেওয়া ID দিয়ে ক্যাটাগরি আপডেট করে
- আউটপুট:
  - Success: 200 + message: "Successfully Updated"
  - Fail: 404 (ID না থাকলে বা না পেলে) / 500 (Server Error)


🔴 deleteCategory:
- কাজ: নির্দিষ্ট ক্যাটাগরি ডিলিট করে
- ইনপুট:
  - categorieId (params): ক্যাটাগরির ID
- প্রসেস:
  - ID অনুযায়ী ক্যাটাগরি খুঁজে ডিলিট করে
- আউটপুট:
  - Success: 200 + message: "Successfully Deleted"
  - Fail: 404 (ID না থাকলে বা ক্যাটাগরি না পেলে) / 500 (Server Error)

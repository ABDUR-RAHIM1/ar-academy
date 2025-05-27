fileName : sub-categories.controller.js


📁 Sub Category Controller Documentation

🟢 createSubCategory:
- কাজ: নতুন একটি সাব-ক্যাটাগরি তৈরি করে
- ইনপুট: 
  - sub_name: (string) সাব-ক্যাটাগরির নাম
  - description: (string) বিস্তারিত
  - categorieId: (ObjectId) মূল ক্যাটাগরির ID
  - type: (string) সাব-ক্যাটাগরির টাইপ
- প্রসেস:
  - sub_name থেকে slug তৈরি করে
  - slug আগে থেকেই থাকলে error
  - নতুন সাব-ক্যাটাগরি DB তে save করে
- আউটপুট:
  - Success: 201 + "Created Successfully"
  - Fail: 400 (Already Created / Missing Fields) / 500 (Server Error)


🟡 getAllSubCategories:
- কাজ: সব সাব-ক্যাটাগরি রিটার্ন করে
- আউটপুট:
  - Success: 200 + সব সাব-ক্যাটাগরির লিস্ট
  - Fail: 500 (Server Error)


🔵 getSubCategoriesByCategory:
- কাজ: নির্দিষ্ট ক্যাটাগরির অধীনে থাকা সাব-ক্যাটাগরিগুলো রিটার্ন করে
- ইনপুট:
  - categorieIdentifier (params): ক্যাটাগরির slug
- প্রসেস:
  - ক্যাটাগরির identifier দিয়ে ক্যাটাগরি খুঁজে
  - ওই ক্যাটাগরির `_id` ব্যবহার করে সাব-ক্যাটাগরি খুঁজে আনে
- আউটপুট:
  - Success: 200 + সাব-ক্যাটাগরির লিস্ট
  - Fail: 404 (ক্যাটাগরি না পেলে) / 500 (Server Error)


🟠 updateSubCategory:
- কাজ: নির্দিষ্ট সাব-ক্যাটাগরি আপডেট করে
- ইনপুট:
  - sub_id (params): সাব-ক্যাটাগরির ID
  - body: { sub_name, description, type }
- প্রসেস:
  - নতুন slug তৈরি করে আপডেট করা হয়
- আউটপুট:
  - Success: 200 + "Updated"
  - Fail: 404 (Not Found) / 500 (Server Error)


🔴 deleteSubCategory:
- কাজ: নির্দিষ্ট সাব-ক্যাটাগরি ডিলিট করে
- ইনপুট:
  - sub_id (params): সাব-ক্যাটাগরির ID
- আউটপুট:
  - Success: 200 + "Deleted"
  - Fail: 404 (Not Found) / 500 (Server Error)

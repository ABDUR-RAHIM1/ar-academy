OnushilonAcademy User Management & Access Control Documentation
১. ইউজার মডেল (User Model)
নতুন ফিল্ড ও স্ট্রাকচার
ফিল্ড নাম	টাইপ	বিবরণ	ডিফল্ট মান
role	String	ইউজারের রোল (নিচের enum থেকে একটি)	"generalStudent"
- superAdmin	
- instituteAdmin	
- instituteStudent	
- generalStudent	
referId	ObjectId (Reference)	এই ইউজারের রেফারেন্স আইডি, যেমন: প্রতিষ্ঠানের আইডি অথবা null	null
referModel	String	referId কোন মডেলের রেফারেন্স, যেমন Institute বা Admin	null

২. ইউজার ক্রিয়েশন ও রেফারেন্স লজিক
ইউজার টাইপ	role value	referId মান	ব্যাখ্যা
সুপার অ্যাডমিন	superAdmin	null অথবা নিজের আইডি	পুরো সাইট ও ডাটার নিয়ন্ত্রণ রাখবে
প্রতিষ্ঠানের অ্যাডমিন	instituteAdmin	প্রতিষ্ঠান (Institute) এর ObjectId	নিজ প্রতিষ্ঠানভিত্তিক সব ডেটা ম্যানেজ করবে
প্রতিষ্ঠানের ছাত্র	instituteStudent	প্রতিষ্ঠান (Institute) এর ObjectId	শুধুমাত্র প্রতিষ্ঠানভিত্তিক পরীক্ষা ও ডাটা অ্যাক্সেস পাবে
সাধারণ ছাত্র	generalStudent	null অথবা সিস্টেম অ্যাডমিন আইডি	সাধারণ সাইটের ফিচার ব্যবহার করবে

৩. এক্সেস কন্ট্রোল (Access Control)
৩.১ রোল ভিত্তিক চেক
সব কোডে সরাসরি স্ট্রিং চেক না করে Centralized Role Constants ব্যবহার করুন।

js
Copy
Edit
export const ROLES = {
  SUPER_ADMIN: "superAdmin",
  INSTITUTE_ADMIN: "instituteAdmin",
  INSTITUTE_STUDENT: "instituteStudent",
  GENERAL_STUDENT: "generalStudent",
};
উদাহরণ:

js
Copy
Edit
if (user.role === ROLES.INSTITUTE_ADMIN) {
  // বিশেষ অধিকার
}
৩.২ রেফারেন্স আইডি দিয়ে ফিল্টারিং
Institution ভিত্তিক ডাটা ফিল্টার করতে:

js
Copy
Edit
db.users.find({ referId: instituteId, role: ROLES.INSTITUTE_STUDENT });
ফ্রন্টএন্ড বা ব্যাকএন্ডে referId অনুযায়ী ডেটা লোড করুন।

৩.৩ রোল ও রেফারেন্স অনুযায়ী ড্যাশবোর্ড রাউটিং
রোল	ড্যাশবোর্ড
superAdmin	Super Admin Dashboard
instituteAdmin	Institute Admin Dashboard
instituteStudent	Institute Student Dashboard
generalStudent	Main Website Student Dashboard

৪. ডাটাবেস আপডেট ও মাইগ্রেশন
৪.১ নতুন ফিল্ড যুক্ত করা
MongoDB হলে নতুন ফিল্ড অটো অ্যাড হয়, ডিফল্ট ভ্যালু মডেলে সেট করুন।

৪.২ পুরনো ডেটা আপডেট করা
পুরনো ডকুমেন্টে নতুন ফিল্ড না থাকলে মাইগ্রেশন স্ক্রিপ্ট চালান।

js
Copy
Edit
db.users.updateMany(
  { referId: { $exists: false } },
  { $set: { referId: null } }
);
৫. একাউন্ট তৈরি ফ্লো
ইউজার টাইপ	একাউন্ট তৈরি প্রক্রিয়া	ফি পেমেন্ট
সাধারণ ছাত্র	সাইট থেকে নিজেই রেজিস্ট্রেশন	সরাসরি সাইটে পেমেন্ট
প্রতিষ্ঠান অ্যাডমিন	সুপার অ্যাডমিন দ্বারা তৈরি বা নিবন্ধন	প্রতিষ্ঠান নিজেই পেমেন্ট
প্রতিষ্ঠান ছাত্র	প্রতিষ্ঠান অ্যাডমিন দ্বারা তৈরি বা আমন্ত্রণ	প্রতিষ্ঠানকে পেমেন্ট

৬. পরবর্তী করণীয়
পুরনো কোডে scattered role check গুলো centralized constants ও middleware দিয়ে ধীরে ধীরে আপডেট করুন।

নতুন ফিচার বা মডিউলে নতুন মডেল স্ট্রাকচার ব্যবহার শুরু করুন।

পুরনো ডেটার জন্য মাইগ্রেশন স্ক্রিপ্ট চালান।

ইউজার রোল এবং referId অনুযায়ী ড্যাশবোর্ড ও এক্সেস নিয়ন্ত্রণ নিশ্চিত করুন।
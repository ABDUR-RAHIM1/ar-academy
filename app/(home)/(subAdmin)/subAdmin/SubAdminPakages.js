import { Button } from "@/components/ui/button";
import React from "react";

const packages = [
  {
    id: 1,
    name: "স্টার্টার প্যাকেজ",
    duration: 2,
  },
  {
    id: 2,
    name: "প্রফেশনাল প্যাকেজ",
    duration: 6,
  },
  {
    id: 3,
    name: "প্রিমিয়াম প্যাকেজ",
    duration: 12,
  },
];

export default function SubAdminPakages() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        সাব-অ্যাডমিন প্যাকেজ সমূহ
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {pkg.name}
            </h3>

            <p className="text-gray-600 mb-4">
              মেয়াদ: <b>{pkg.duration} মাস</b>
            </p>

            <Button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              প্যাকেজ কিনুন
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

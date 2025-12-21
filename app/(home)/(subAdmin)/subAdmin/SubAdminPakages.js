
import { getAllPackagesByAll } from "@/app/apiActions/packages";
import NoData from "@/utils/NoData";
import React from "react";
import PurchasePackageButton from "./PurchasePackageButton";



export default async function SubAdminPakages() {

  const { status, data: packages } = await getAllPackagesByAll()


  if (status !== 200 || !packages) {
    return <NoData text={"Packges Not found"} />
  };



  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="  my-6 ">
        <h2 className="text-2xl font-bold mb-6">
          সাব-অ্যাডমিন প্যাকেজ সমূহ
        </h2>
        <p className=" font-medium  underline">
          প্যাকেজ কিনে ফিচার গুলো ব্যাবহার করুন
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {pkg.name}
            </h3>

            <p className="text-gray-600 mb-4">
              মেয়াদ: <b>{pkg.duration} মাস</b>
            </p>
            <p className="text-gray-600 mb-4">
              {pkg.description}
            </p>

            <PurchasePackageButton
              packageId={pkg._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

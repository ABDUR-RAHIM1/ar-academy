import React from "react";
import Heading from "../../globals/Heading";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export default async function Subscription() {

  return (
    <div id="plans" className="my-10 px-3 md:px-5 py-10 rounded-md bg2 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <Heading text="কোর্স সমূহ" />
        <p className="mb-8 text-lg">আমাদের জনপ্রিয় কোর্সগুলো দেখুন— সীমিত আসন, এখনই ভর্তি হন!</p>
      </div>

      <div className="my-10 text-center">
        <Link
          href="/courses"
          className="inline-flex items-center justify-center gap-2 rounded-full w-[80%] sm:w-[50%] bg-blue-500 hover:bg-blue-600 text-white font-bold text-center py-4 px-3 transition-all duration-200 courseBtnAnimate"
        >
          <BookOpenCheck className="w-5 h-5" />
          {"কোর্সগুলো দেখুন"}
        </Link>
      </div>

    </div>
  );
}

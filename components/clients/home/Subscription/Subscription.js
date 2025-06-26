import React from 'react';
import SubScribeButton from './SubScribeButton';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NoData from '@/utils/NoData';
import { getAllPlans } from '@/app/apiActions/public/getAllPlan';
import Heading from '../../globals/Heading';

export default async function Subscription() {
  const { status, data } = await getAllPlans();


  if (status !== 200) {
    return <NoData text={"Plans not found!"} />
  };




  return (
    <div id='plans' className='my-10 px-3 md:px-5 py-10 rounded-md bg2'>
      <div className='py-10 rounded-md'>
        <div className="max-w-5xl mx-auto text-center">

          <Heading text={"সাবস্ক্রিপশন প্ল্যান বেছে নিন"} />
          <p className="mb-8 text-lg">আপনার প্রয়োজন অনুযায়ী সাবস্ক্রিপশন প্ল্যান বেছে নিন</p>

        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {data?.map((plan, index) => (
            <Card
              key={index}
              className={`w-full sm:w-[48%] md:w-[22%] transition-all hover:shadow-xl border-2 ${plan.isPopular ? 'border-yellow-500' : 'border-gray-200'
                }`}
            >
              <CardHeader>
                <div className=' flex items-center gap-2 text-left'>
                  <p >{plan.emoji}</p>
                  <CardTitle>{plan.label}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>


              <CardContent>

                <div className=' text-center mb-2'>
                  <del className=' inline-block text-center font-bold text-xl text-red-600'>
                    {
                      plan.price === 0 ? " ৳ 0 টাকা" : `৳  ${Math.floor(plan.price * 1.3)} টাকা`
                    }
                    {/* " ৳ 100 টাকা" */}
                  </del>
                </div>

                <p className="text-2xl font-bold text-center text-cyan-600 mb-4">
                  {plan.price === 0 ? "ফ্রি" : `৳ ${plan.price} টাকা`}
                </p>
                <div className=' mb-4'>
                  <SubScribeButton planInfoData={plan} />
                </div>

                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className=' list-none'> <span className=' color2'>⚬ </span> {feature}</li>
                  ))}
                </ul>
              </CardContent>

            </Card>
          ))}
        </div>
      </div>
    </div>

    // <div className="my-10 px-3 md:px-5 py-10 rounded-md bg2">
    //   <div className="py-10 rounded-md">
    //     <div className="max-w-5xl mx-auto text-center text-white">
    //       <h2 className="text-3xl font-bold mb-6">সাবস্ক্রিপশন প্ল্যান বেছে নিন</h2>
    //       <p className="mb-8 text-lg">আপনার প্রয়োজন অনুযায়ী আমাদের সাবস্ক্রিপশন প্ল্যান বেছে নিন</p>
    //     </div>

    //     <div className="flex flex-wrap justify-center gap-6">
    //       {data?.map((plan, index) => (
    //         <div
    //           key={index}
    //           className={`relative w-full sm:w-[48%] md:w-[22%] bg-white text-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 ${plan.isPopular ? "border-yellow-500 ring-2 ring-yellow-400" : ""
    //             }`}
    //         >
    //           {/* Popular badge */}
    //           {plan.isPopular && (
    //             <span className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
    //               জনপ্রিয়
    //             </span>
    //           )}

    //           <div className="text-center mb-4">
    //             <div className="text-4xl">{plan.emoji}</div>
    //             <h3 className="text-xl font-bold mt-2">{plan.label}</h3>
    //             <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
    //           </div>

    //           <div className="text-center my-4">
    //             <p className="text-2xl font-extrabold text-cyan-600">
    //               {plan.price === 0 ? "ফ্রি" : `${plan.price} টাকা`}
    //             </p>
    //           </div>

    //           <ul className="text-sm text-gray-600 list-disc list-inside space-y-2 mb-4">
    //             {plan.features.map((feature, i) => (
    //               <li key={i}>{feature}</li>
    //             ))}
    //           </ul>

    //           <div className="mt-auto">
    //             <SubScribeButton planInfoData={plan} />
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

  );
}

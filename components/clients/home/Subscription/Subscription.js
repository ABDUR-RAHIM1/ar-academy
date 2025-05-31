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

export default async function Subscription() {
  const { status, data } = await getAllPlans();


  if (status !== 200) {
    return <NoData text={"Plans not found!"} />
  };




  return (
    <div className='my-10 px-3 md:px-5 py-10 rounded-md bg2'>
      <div className='py-10 rounded-md'>
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">সাবস্ক্রিপশন প্ল্যান বেছে নিন</h2>
          <p className="mb-8 text-lg">আপনার প্রয়োজন অনুযায়ী আমাদের সাবস্ক্রিপশন প্ল্যান বেছে নিন</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {data?.map((plan, index) => (
            <Card
              key={index}
              className={`w-full sm:w-[48%] md:w-[22%] transition-all hover:shadow-xl border-2 ${plan.isPopular ? 'border-yellow-500' : 'border-gray-200'
                }`}
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{plan.emoji}</div>
                <CardTitle className="text-xl">{plan.label}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-2xl font-bold text-center text-cyan-600 mb-4">
                  {plan.price === 0 ? "ফ্রি" : `${plan.price} টাকা`}
                </p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                <SubScribeButton planInfoData={plan} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

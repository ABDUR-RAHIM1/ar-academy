 

const faqData = [
    {
        question: "এই প্ল্যাটফর্মে কোন কোন বিষয়ের উপর কোর্স পাওয়া যাবে?",
        answer:
            "আমাদের প্ল্যাটফর্মে বাংলা, ইংরেজি, গণিত, ইসলামিক (কুরআন-হাদিস), জব প্রস্তুতি, ভর্তি প্রস্তুতি সহ আরও অনেক বিষয়ের কোর্স রয়েছে।",
    },
    {
        question: "কীভাবে পরীক্ষায় অংশগ্রহণ করবো?",
        answer:
            "একটি বিষয় নির্বাচন করে সেখানে নির্ধারিত পরীক্ষা বোতামে ক্লিক করে আপনি অনলাইন পরীক্ষায় অংশ নিতে পারবেন। ফলাফল আপনার প্রোফাইলে সংরক্ষিত থাকবে।",
    },
    {
        question: "এই সাইটে কিভাবে রেজিস্ট্রেশন করবো?",
        answer:
            "হোমপেজে 'Join Now' অথবা 'Register' বাটনে ক্লিক করে আপনার নাম, মোবাইল নম্বর এবং পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন সম্পন্ন করতে পারবেন।",
    },
    {
        question: "ফলাফল কিভাবে দেখবো?",
        answer:
            "আপনার প্রোফাইল থেকে যেকোনো পরীক্ষার ফলাফল, পারফরম্যান্স রিপোর্ট ও বিষয়ভিত্তিক বিশ্লেষণ দেখতে পারবেন।",
    },
];

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Heading from "../../globals/Heading";

export default function Faq() {

    return (
        <div className=" w-full md:w-[60%] m-auto px-5 my-10">
            <Heading text={"প্রশ্নোত্তর (FAQ)"} />
            <Accordion type="single" collapsible className=" p-3 my-4 w-full border">
                {faqData.map(({ question, answer }, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

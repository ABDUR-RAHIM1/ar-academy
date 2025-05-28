import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";



export default function WrittenSolutions({ writtenData }) {

    return (
        <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className=" my-4 w-full space-y-2"
        >
            {writtenData?.map(({ ID, Question, Answer, Subject }, index) => (
                <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border rounded-md px-4 data-[state=open]:bg-secondary"
                >
                    <AccordionTrigger title={"উত্তর দেখতে ক্লিক করুন"} className="data-[state=closed]:py-2 flex items-center">
                        <p className=" font-semibold">
                            <span className="color1">প্রশ্ন নংঃ</span> <span className=" mx-2">{ID}</span>  {Question}
                            <small className=" text-sm text-gray-500 ml-3">
                                ({Subject})
                            </small>
                        </p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>
                            <span className="mx-2 color1 font-bold">উত্তরঃ</span> {Answer}
                        </p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

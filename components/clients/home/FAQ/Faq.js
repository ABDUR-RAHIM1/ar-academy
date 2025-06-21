import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Heading from "../../globals/Heading";
import { faqData } from "@/LocalDatabase/faqData";

export default function Faq() {
    return (
        <div id="faq" className="w-full md:w-[90%] xl:w-[80%] m-auto px-5 my-16">
            <Heading text={"প্রশ্নোত্তর (FAQ)"} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {faqData.map(({ question, answer }, index) => (
                    <Accordion
                        key={index}
                        type="single"
                        collapsible
                        className="border rounded-md px-2"
                    >
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>{question}</AccordionTrigger>
                            <AccordionContent>{answer}</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    );
}

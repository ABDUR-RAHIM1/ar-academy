import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function ChapterIntroduction({ fileType }) {
    return (
        <AlertDialog className={"w-full overflow-y-auto"}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">নির্দেশিকা
                    {
                        fileType !== "editor" ? " (xls File)" : " (Editor)"
                    }
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>চ্যাপ্টার যুক্ত করার নিয়মাবলী দেখুন।</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className=" w-full h-[70vh] overflow-y-auto px-3 py-5 bg-white rounded-xl shadow-md space-y-6">

                            <p className="text-gray-700">
                                আমাদের প্ল্যাটফর্মে সমাধান (xls file) যুক্ত করার সময়, নিচের নিয়ম ও ফরম্যাট অনুযায়ী তথ্য প্রদান করা বাধ্যতামূলক। দয়া করে প্রতিটি পয়েন্ট মনোযোগ দিয়ে পড়ুন:
                            </p>

                            <h2 className="text-xl font-semibold text-gray-800">✅ প্রয়োজনীয় ফিল্ডসমূহ</h2>
                            <div className="overflow-auto">
                                <table className="min-w-full border border-gray-300 text-sm">
                                    <thead className="bg-blue-100">
                                        <tr>
                                            <th className="border px-4 py-2">Field Name</th>
                                            <th className="border px-4 py-2">Description / উদাহরণ</th>
                                            <th className="border px-4 py-2">বাধ্যতামূলক?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ["Question", "প্রশ্নটি লিখুন যেমনঃ 'সূর্য কোথা থেকে উঠে?'", "✅ হ্যাঁ"],
                                            ["Option1", "প্রথম অপশন — যেমনঃ 'পূর্ব'", "✅ হ্যাঁ"],
                                            ["Option2", "দ্বিতীয় অপশন — যেমনঃ 'পশ্চিম'", "✅ হ্যাঁ"],
                                            ["Option3", "তৃতীয় অপশন — যেমনঃ 'উত্তর'", "✅ হ্যাঁ"],
                                            ["Option4", "চতুর্থ অপশন — যেমনঃ 'দক্ষিণ'", "✅ হ্যাঁ"],
                                            ["CorrectAnswer", "সঠিক উত্তরটি লিখুন — যেমনঃ 'পূর্ব'", "✅ হ্যাঁ"],
                                            ["Explanation", "প্রশ্নের ব্যাখ্যা — যেমনঃ 'সূর্য পূর্ব দিকে উঠে'", "❌ না"],
                                            ["Subeject", "সাবজেক্ট নাম — যেমনঃ 'বাংলা , ইংলিশ , গণিত'", "✅ হ্যাঁ"],
                                        ].map(([name, desc, required], index) => (
                                            <tr key={index} className="odd:bg-white even:bg-gray-50">
                                                <td className="border px-4 py-2 font-medium text-gray-900">{name}</td>
                                                <td className="border px-4 py-2 text-gray-700">{desc}</td>
                                                <td className="border px-4 py-2 text-center">{required}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800">✅ সঠিক উদাহরণ (Valid Entry):</h2>
                            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                                {`{
  "Question": "বাংলাদেশের রাজধানী কোথায়?",
  "Option1": "ঢাকা",
  "Option2": "চট্টগ্রাম",
  "Option3": "রাজশাহী",
  "Option4": "খুলনা",
  "CorrectAnswer": "ঢাকা",
  "Explanation": "বাংলাদেশের রাজধানী হচ্ছে ঢাকা।"
}`}
                            </pre>

                            <h2 className="text-xl font-semibold text-gray-800">🚫 ভুল উদাহরণ (Invalid Entry):</h2>
                            <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">
                                {`{
  "Question": "সূর্য কোথা থেকে উঠে?",
  "Option1": "পূর্ব",
  "Option2": "পশ্চিম",
  "CorrectAnswer": "উত্তর"
}`}
                            </pre>
                            <p className="text-red-600 font-medium">❌ কারণ: Option3, Option4 ও Explanation বাদ দেওয়া হয়েছে এবং CorrectAnswer সঠিক অপশন নয়।</p>

                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Ok</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

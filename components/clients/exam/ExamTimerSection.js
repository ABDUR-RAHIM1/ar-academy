import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle } from "lucide-react"

export default function ExamTimerSection({
    token,
    timeLeft,
    status,
    durationInMinutes,
    isSubmit,
    handleSubmitQuestion,
    totalQuestions,
    selectedCount
}) {
    return (
        <Card className="shadow-lg rounded-2xl bg-white/90 border border-gray-200">
            <CardHeader className="grid grid-cols-2">
                {/* Left: মোট সময় */}
                <div className="flex flex-col items-center">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        সময়
                    </CardTitle>
                    <span className="text-xl font-bold px-3 py-1 rounded-lg bg-blue-100 text-blue-600">
                        {durationInMinutes} মিনিট
                    </span>
                </div>

                {/* Right: সময় বাকি আছে */}
                <div className="flex flex-col items-center">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-red-500" />
                        সময় বাকি আছে
                    </CardTitle>
                    <span
                        className={`text-xl font-bold px-3 py-1 rounded-lg ${timeLeft === "00:00:00" ? "bg-gray-200 text-gray-600" : "bg-red-100 text-red-600"
                            }`}
                    >
                        {timeLeft}
                    </span>
                </div>
            </CardHeader>


            <CardContent className="space-y-3">
                {/* Question info */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>মোট প্রশ্ন:</span>
                    <span className="font-medium">{totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>উত্তর দেওয়া হয়েছে:</span>
                    <span className="font-medium">{selectedCount}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                            width: `${Math.min(
                                (selectedCount / totalQuestions) * 100 || 0,
                                100
                            )}%`,
                        }}
                    ></div>
                </div>

                {/* Submit button */}
                <Button
                    onClick={handleSubmitQuestion}
                    disabled={isSubmit || timeLeft === "00:00:00"}
                    className="w-full mt-3 flex items-center gap-2"
                >
                    <CheckCircle className="w-4 h-4" />
                    {isSubmit ? "জমা দেওয়া হয়েছে" : "জমা দিন"}
                </Button>
            </CardContent>
        </Card>
    )
}

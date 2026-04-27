import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, Eye, ListOrdered, CheckSquare, Zap, Minus } from "lucide-react"
import { useContext, useState } from "react"
import { contextD } from "@/contextApi/DashboardState"

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
    const { showToast } = useContext(contextD);
    const [showCard, setShowCard] = useState(true);  
 

    const handleSubmit = () => {
        if (!token) {
            showToast(404, "আপনি লগইন না থাকায় জমা দিতে ব্যর্থ হয়েছে!")
            return
        }
        handleSubmitQuestion()
    }

    // Function to format time for display
    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours > 0 ? hours + 'ঘ.' : ''}${remainingMinutes} মি.`;
    }

    // Status text and class consolidation
    const statusInfo = {
        upcoming: { text: "শুরু হয়নি", class: "text-yellow-700 bg-yellow-100" },
        finished: { text: "শেষ হয়ে গেছে", class: "text-red-700 bg-red-100" },
        active: { text: "চলছে", class: "text-green-700 bg-green-100" },
    };
    const currentStatus = statusInfo[status] || statusInfo.active;



    return (
        <div className="space-y-1">

            {/* 2. Compact Timer Card (যখন showCard true) */}
            {showCard && (
                <Card className="shadow-xl rounded-xl border border-gray-300">
                    <CardHeader className="py-2 px-4 border-b border-gray-200">


                        <div className=" flex items-center justify-between">
                            {/* Status Chip */}
                            <div className={`text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto ${currentStatus.class} mb-2`}>
                                {status === "upcoming"
                                    ? "🕒 " + currentStatus.text
                                    : status === "finished"
                                        ? "✅ " + currentStatus.text
                                        : "📌 " + currentStatus.text}
                            </div>
                            <div
                                // variant="outline"
                                onClick={() => setShowCard(!showCard)}
                                className=" block md:hidden border-red-500 bg-red-50 text-red-600 py-0 px-2 hover:bg-red-500 hover:text-white"
                            >
                                {showCard ? (
                                    <>
                                        <Minus className="w-4 h-4" />
                                        {/* টাইমার অংশটি লুকান */}
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-4 h-4" />
                                        {/* টাইমার অংশটি দেখান */}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Time Info */}
                        <div className="flex justify-between items-center space-x-2">
                            {/* Left: মোট সময় (Compact) */}
                            <div className="flex flex-col items-start w-1/2">
                                <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-blue-500" />
                                    মোট সময়:
                                </span>
                                <span className="text-sm md:text-base text-blue-600 font-bold">
                                    {formatDuration(durationInMinutes)}
                                </span>
                            </div>

                            {/* Right: সময় বাকি আছে (Prominent) */}
                            <div className="flex flex-col items-end w-1/2">
                                <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-red-500" />
                                    বাকি:
                                </span>
                                <span
                                    className={`text-lg md:text-xl font-extrabold transition-colors duration-300 ${timeLeft === "00:00:00"
                                        ? "text-gray-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {timeLeft}
                                </span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="py-2 px-4 space-y-3">
                        {/* Question Stats */}
                        <div className="grid grid-cols-2 gap-3 text-sm font-medium">
                            <div className="flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg">
                                <ListOrdered className="w-4 h-4 text-purple-500" />
                                <span>মোট: {totalQuestions}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg">
                                <CheckSquare className="w-4 h-4 text-green-500" />
                                <span>উত্তর: {selectedCount}</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    width: `${Math.min(
                                        (selectedCount / totalQuestions) * 100 || 0,
                                        100
                                    )}%`,
                                }}
                                title={`${Math.min(
                                    (selectedCount / totalQuestions) * 100 || 0,
                                    100
                                )}% সম্পন্ন`}
                            ></div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmit || timeLeft === "00:00:00"}
                            className="w-full mt-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-colors duration-200"
                        >
                            <CheckCircle className="w-4 h-4" />
                            {isSubmit ? "জমা দেওয়া হয়েছে" : "জমা দিন"}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* 3. Floating Mini-Bar (যখন showCard false) */}
            {!showCard && (
                // Fixed position, bottom-right for easy access on mobile/desktop
                <div
                    className="fixed bottom-4 left-4 z-50 bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl p-3 
                                border-2 border-red-500 flex items-center space-x-3 transition-all duration-300 transform 
                                hover:scale-[1.03] cursor-pointer w-fit"
                    onClick={() => setShowCard(true)} // Click to show the full card again
                    title="টাইমার অংশটি দেখান"
                >
                    <Zap className="w-5 h-5 text-red-500 animate-pulse" /> {/* Animate pulse for attention */}

                    {/* Time Left */}
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className={`text-sm font-extrabold ${timeLeft === "00:00:00" ? "text-gray-600" : "text-red-600"}`}>
                            {timeLeft}
                        </span>
                    </div>

                    {/* Answer Count */}
                    <div className="flex items-center space-x-1">
                        <CheckSquare className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-bold text-green-700">
                            {selectedCount}/{totalQuestions}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
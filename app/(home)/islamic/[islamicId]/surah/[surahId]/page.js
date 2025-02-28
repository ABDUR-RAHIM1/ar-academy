import fs from "fs";
import path from "path"; 
import AyahList from "../../../AyahList";
import SurahInfo from "../../../SurahInfo";

export default async function SurahDetails({ params }) {
    const { surahId } = await params;

    // JSON ফাইলের পাথ সেট করা
    const filePath = path.join(process.cwd(), "public/al-quran/allSurah", `${surahId}.json`);
  

    // ফাইল এক্সিস্ট করে কি না চেক করা
    if (!fs.existsSync(filePath)) {
        return <div className="text-center text-red-500">🔴 সূরা পাওয়া যায়নি!</div>;
    }

    // JSON ফাইল থেকে ডাটা পড়া
    const surahData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return (
        <div className="container mx-auto p-5">
            {/* সূরার সাধারণ তথ্য */}
            <SurahInfo surahDetails={surahData.surahDetails} />

            {/* সূরার আয়াত লিস্ট */}
            <AyahList verses={surahData.surah.verses} />
        </div>
    );
}

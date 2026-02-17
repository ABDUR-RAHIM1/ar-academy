import { cardStyle } from "@/utils/CardStyle";
import Link from "next/link";
import { bookIcon } from '@/Images/Images';
import Image from "next/image";

export const CategoriesCard = ({ categoriesData, index }) => {
    const { position, categorie, identifier, description } = categoriesData;
    const themeColor = cardStyle(position);

    return (
        <Link
            href={`/sub-categories/${identifier}`}
            style={{ borderBottomColor: themeColor }}
            className="group w-[48%] md:w-[23%] flex flex-col items-center justify-between p-4 md:p-6 my-2 md:my-4 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white border-b-4 hover:-translate-y-2 relative overflow-hidden"
        >
            {/* Index Number Badge - মোবাইলে একটু ছোট */}
            <div 
                className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] md:text-xs font-black shadow-inner bg-slate-50"
                style={{ color: themeColor }}
            >
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Icon Section */}
            <div className="relative mb-3 md:mb-4 flex flex-col items-center">
                <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                        src={bookIcon}
                        alt='category-icon'
                        width={64}
                        height={64}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    />
                </div>
            </div>

            {/* Text Content */}
            <div className="w-full text-center z-10 mb-3">
                <h4 className="font-extrabold text-[13px] md:text-lg text-slate-800 leading-tight mb-1 md:mb-2">
                    {categorie}
                </h4>
                <p className="text-[10px] md:text-xs text-slate-500 line-clamp-2 md:line-clamp-3 leading-snug font-medium">
                    {description}
                </p>
            </div>

            {/* Mobile-Friendly Action Button */}
            {/* md:opacity-0 group-hover:opacity-100 মানে ডেস্কটপে হোভার করলে আসবে, কিন্তু মোবাইলে সবসময় থাকবে */}
            <div 
                className="w-full py-2 px-3 rounded-xl text-center text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 translate-y-0"
                style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
            >
                Explore <span className="hidden md:inline">Details</span> 
                <span className="text-sm">→</span>
            </div>
        </Link>
    );
};
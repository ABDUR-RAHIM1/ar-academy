import { cardStyle } from "@/utils/CardStyle";
import Link from "next/link";
import { bookIcon } from '@/Images/Images';
import Image from "next/image";

export const CategoriesCard = ({ categoriesData, index }) => {
    const { position, categorie, identifier, description } = categoriesData;


    return (
        <Link
            href={`/sub-categories/${identifier}`}

             style={{ borderColor: cardStyle(position) }}
            className={`w-[48%] md:w-[22%] hover:shadow-xl transition-all flex flex-col items-center justify-between py-3 my-4 rounded-md shadow-xl bg-gray-100 hover:bg-gray-200 relative  border-b-2 `}

            title={`Position: ${position}`}
        >
            <blockquote className=" absolute top-2 left-2 bg-gray-200 py-1 px-2 rounded-full">
                <span className=" text-xl font-bold" style={{ color: cardStyle(position)}}>
                    {index + 1}
                </span>
            </blockquote>
            <div className='w-full flex justify-center'>
                <Image
                    src={bookIcon}
                    alt='ar-academy'
                    width={50}
                    height={50}
                    className='w-16 h-16'
                />
            </div>
            <div className='w-full text-center px-2'>
                <h4 className={`font-bold my-2 color1 text-xs md:text-base`}>{categorie}</h4>
                <p className='text-sm'>{description}</p>
            </div>
        </Link>
    )
}
import { cardStyle } from "@/utils/CardStyle";
import Link from "next/link";
import { bookIcon } from '@/Images/Images';
import Image from "next/image";

export const CategoriesCard = ({ categoriesData }) => {
    const { categorie, identifier, description } = categoriesData;

  
    return (
        <Link
            href={`/sub-categories/${identifier}`}

            style={{ borderLeft: `4px solid ${cardStyle(categorie)}` }}
            className={`w-[48%] md:w-[22%] hover:shadow-xl transition-all flex flex-col items-center justify-between py-3 my-4 rounded-md shadow-xl bg-gray-100 hover:bg-gray-200`}
        >
            <div className='w-full flex justify-center'>
                <Image
                    src={bookIcon}
                    alt='ar-academy'
                    width={50}
                    height={50}
                    className='w-16 h-16'
                />
            </div>
            <div className='w-full text-center'>
                <h4 className={`font-bold my-2 color1 text-xs md:text-base`}>{categorie}</h4>
                <p className='text-sm'>{description}</p>
            </div>
        </Link>
    )
}
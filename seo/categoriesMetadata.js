import { BASE_URL } from "@/constans";
import { SEO_KEYWORDS } from "./keywords";

export const categoriesMetadata = {
    title: "ক্যাটাগরি সমুহ",
    description: 'অনুশীলন একাডেমিতে সকল চাকরির প্রস্তুতি, একাডেমিক পড়াশোনা, ভর্তি প্রস্তুতি এবং স্কিল ডেভেলপমেন্টের জন্য বিভিন্ন ক্যাটাগরি ও বিষয়সমূহ খুঁজুন। আপনার পছন্দের বিষয় ও পরীক্ষা অনুযায়ী সঠিক কোর্স ও প্রশ্ন সেট বেছে নিন।',
    keywords: SEO_KEYWORDS.categorie || SEO_KEYWORDS.home,
    alternates: {
        canonical: `${BASE_URL}/categories`,
    },
    openGraph: {
        title: 'ক্যাটাগরি -- অনুশীলন একাডেমি',
        description: 'অনুশীলন একাডেমিতে সকল চাকরির প্রস্তুতি, একাডেমিক পড়াশোনা, ভর্তি প্রস্তুতি এবং স্কিল ডেভেলপমেন্টের জন্য বিভিন্ন ক্যাটাগরি ও বিষয়সমূহ খুঁজুন। আপনার পছন্দের বিষয় ও পরীক্ষা অনুযায়ী সঠিক কোর্স ও প্রশ্ন সেট বেছে নিন।',
        url: `${BASE_URL}/categories`,

        images: [
            {
                url: `${BASE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'অনুশীলন একাডেমি ক্যাটাগরি',
            },
        ],
        siteName: 'অনুশীলন একাডেমি',
        type: 'website',
        locale: 'bn_BD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ক্যাটাগরি -- অনুশীলন একাডেমি',
        description: 'অনুশীলন একাডেমিতে সকল চাকরির প্রস্তুতি, একাডেমিক পড়াশোনা, ভর্তি প্রস্তুতি এবং স্কিল ডেভেলপমেন্টের জন্য বিভিন্ন ক্যাটাগরি ও বিষয়সমূহ খুঁজুন। আপনার পছন্দের বিষয় ও পরীক্ষা অনুযায়ী সঠিক কোর্স ও প্রশ্ন সেট বেছে নিন।',
        images: ['/og-image.png'],
    },
};
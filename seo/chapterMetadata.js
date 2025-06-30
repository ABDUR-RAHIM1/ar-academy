import { BASE_URL } from "@/constans";
import { SEO_KEYWORDS } from "./keywords";

export const chapterMetadata = {
    title: "চ্যাপটার",
    description: 'জানুন অনুশীলন একাডেমির লক্ষ্য, ইতিহাস, এবং কীভাবে আমরা সরকারি-বেসরকারি চাকরির প্রস্তুতি, লাইভ এক্সাম, একাডেমিক ও স্কিল ডেভেলপমেন্টের মাধ্যমে আপনাদের পাশে আছি।',
    keywords: SEO_KEYWORDS.chapter || SEO_KEYWORDS.home,
    openGraph: {
        title: 'চ্যাপটার -- অনুশীলন একাডেমি',
        description: 'জানুন অনুশীলন একাডেমির লক্ষ্য, ইতিহাস, এবং কীভাবে আমরা সরকারি-বেসরকারি চাকরির প্রস্তুতি, লাইভ এক্সাম, একাডেমিক ও স্কিল ডেভেলপমেন্টের মাধ্যমে আপনাদের পাশে আছি।',
        url: `${BASE_URL}/about-us`,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Onushilon Academy OG Image',
            },
        ],
        siteName: 'অনুশীলন একাডেমি',
        type: 'website',
        locale: 'bn_BD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'চ্যাপটার -- অনুশীলন একাডেমি',
        description: 'জানুন অনুশীলন একাডেমির লক্ষ্য, ইতিহাস, এবং কীভাবে আমরা সরকারি-বেসরকারি চাকরির প্রস্তুতি, লাইভ এক্সাম, একাডেমিক ও স্কিল ডেভেলপমেন্টের মাধ্যমে আপনাদের পাশে আছি।',
        images: ['/og-image.png'],
    },
};

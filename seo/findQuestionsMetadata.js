import { BASE_URL } from "@/constans";
import { SEO_KEYWORDS } from "./keywords";

export const findQuestionsMetadata = {
    title: 'ফ্রি প্রশ্ন খুঁজুন - অনুশীলন একাডেমি',
    description: 'অনুশীলন একাডেমির মাধ্যমে সহজেই আপনার প্রয়োজনীয় প্রশ্ন খুঁজুন। বিভিন্ন বিষয়ের প্রশ্নপত্র, উত্তর এবং অধ্যয়ন উপকরণ ফ্রি তে খুঁজে পেতে আমাদের Find Questions পেজটি ব্যবহার করুন।',
    keywords: SEO_KEYWORDS.findQuestions || SEO_KEYWORDS.home,
    alternates: {
        canonical: `${BASE_URL}/find-question`,
    },
    openGraph: {
        title: 'ফ্রি প্রশ্ন খুঁজুন - অনুশীলন একাডেমি',
        description: 'অনুশীলন একাডেমির মাধ্যমে সহজেই প্রয়োজনীয় প্রশ্নপত্র ও অধ্যয়ন উপকরণ খুঁজে নিন।',
        url: `${BASE_URL}/find-question`,
        images: [
            {
                url: `${BASE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'ফ্রি প্রশ্ন খোঁজার পোর্টাল - অনুশীলন একাডেমি',
            },
        ],
        siteName: 'অনুশীলন একাডেমি',
        type: 'website',
        locale: 'bn_BD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ফ্রি প্রশ্ন খুঁজুন - অনুশীলন একাডেমি',
        description: 'অনুশীলন একাডেমির মাধ্যমে সহজেই প্রয়োজনীয় প্রশ্নপত্র ও অধ্যয়ন উপকরণ খুঁজে নিন।',
        images: [`${BASE_URL}/og-image.png`],
    },
};

import { BASE_URL } from "@/constans";
import { SEO_KEYWORDS } from "./keywords";

export const resultMetaData = {
  title: 'রেজাল্ট বিস্তারিত',
  keywords: [
    'অনুশীলন একাডেমি রেজাল্ট', 
    'লাইভ মডেল টেস্ট রেজাল্ট', 
    'বিসিএস পরীক্ষার ফলাফল', 
    'ভর্তি পরীক্ষার রেজাল্ট', 
    ...SEO_KEYWORDS.exam || SEO_KEYWORDS.home
  ],
  description: 'আপনার অধ্যায়ভিত্তিক পরীক্ষা অথবা মডেল টেস্টের সম্পূর্ণ রেজাল্ট এখানে দেখুন। সঠিক উত্তর, ভুল উত্তর, সময় ব্যবহারের বিশ্লেষণ এবং বিস্তারিত ব্যাখ্যার মাধ্যমে আপনার প্রস্তুতি নিরীক্ষা করুন অনুশীলন একাডেমির মাধ্যমে।',
  alternates: {
    canonical: `${BASE_URL}/result`,
  },
  openGraph: {
    title: 'রেজাল্ট বিস্তারিত - অনুশীলন একাডেমি',
    description: 'বিসিএস, ভর্তি ও চাকরি পরীক্ষার লাইভ মডেল টেস্টে অংশ নিয়ে বিস্তারিত রেজাল্ট দেখুন। অনুশীলন একাডেমি আপনাকে দেয় দ্রুত ফলাফল, ব্যাখ্যাসহ বিশ্লেষণ।',
    url: `${BASE_URL}/result`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'রেজাল্ট - অনুশীলন একাডেমি',
      },
    ],
    siteName: 'অনুশীলন একাডেমি',
    type: 'article',
    locale: 'bn_BD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'রেজাল্ট বিস্তারিত - অনুশীলন একাডেমি',
    description: 'চাকরি প্রস্তুতি ও একাডেমিক পরীক্ষার জন্য প্রতিদিনের লাইভ পরীক্ষার রেজাল্ট এখানে দেখুন - সঠিক উত্তর ও ব্যাখ্যাসহ।',
    images: [`${BASE_URL}/og-image.png`],
  },
};

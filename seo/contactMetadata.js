import { BASE_URL } from "@/constans";
import { SEO_KEYWORDS } from "./keywords";

export const contactMetadata = {
    title: 'যোগাযোগ',
    keywords: SEO_KEYWORDS.contact || SEO_KEYWORDS.home,
    description: 'অনুশীলন একাডেমির সাথে যোগাযোগ করুন। আমাদের অফিসের ঠিকানা, ফোন নম্বর, ইমেইল আইডি এবং যোগাযোগের ফর্ম এখানে পাবেন। আপনার প্রশ্ন বা সহায়তার জন্য আমাদের টিম সবসময় প্রস্তুত।',
    openGraph: {
        title: 'যোগাযোগ -- অনুশীলন একাডেমি',
        description: 'অনুশীলন একাডেমির সাথে যোগাযোগ করুন। আমাদের অফিসের ঠিকানা, ফোন নম্বর, ইমেইল আইডি এবং যোগাযোগের ফর্ম এখানে পাবেন। আপনার প্রশ্ন বা সহায়তার জন্য আমাদের টিম সবসময় প্রস্তুত।',
        url: `${BASE_URL}/contact`,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'অনুশীলন একাডেমি যোগাযোগ',
            },
        ],
        siteName: 'অনুশীলন একাডেমি',
        type: 'website',
        locale: 'bn_BD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'যোগাযোগ -- অনুশীলন একাডেমি',
        description: 'অনুশীলন একাডেমির সাথে যোগাযোগ করুন। আমাদের অফিসের ঠিকানা, ফোন নম্বর, ইমেইল আইডি এবং যোগাযোগের ফর্ম এখানে পাবেন। আপনার প্রশ্ন বা সহায়তার জন্য আমাদের টিম সবসময় প্রস্তুত।',
        images: ['/og-image.png'],
    },
};

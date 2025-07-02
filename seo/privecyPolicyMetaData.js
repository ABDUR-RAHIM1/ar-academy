import { BASE_URL } from "@/constans";
import { SEO_KEYWORDS } from "./keywords";

export const privecyPolicyMetaData = {
    title: 'গোপনীয়তা নীতি',
    description: 'অনুশীলন একাডেমির গোপনীয়তা নীতি সম্পর্কে জানুন। আমরা কীভাবে ব্যবহারকারীদের তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি, সেই সম্পর্কে বিস্তারিত তথ্য এখানে দেওয়া হয়েছে। আপনার ডেটা নিরাপত্তা আমাদের কাছে সর্বোচ্চ অগ্রাধিকার।',
    keywords: SEO_KEYWORDS.privacyPolicy || SEO_KEYWORDS.home,
    alternates: {
        canonical: `${BASE_URL}/privacy-policy`,
    },
    openGraph: {
        title: 'গোপনীয়তা নীতি -- অনুশীলন একাডেমি',
        description: 'অনুশীলন একাডেমির গোপনীয়তা নীতি সম্পর্কে জানুন। আমরা কীভাবে ব্যবহারকারীদের তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি, সেই সম্পর্কে বিস্তারিত তথ্য এখানে দেওয়া হয়েছে। আপনার ডেটা নিরাপত্তা আমাদের কাছে সর্বোচ্চ অগ্রাধিকার।',
        url: `${BASE_URL}/privacy-policy`,
        images: [
            {
                url: `${BASE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'অনুশীলন একাডেমি গোপনীয়তা নীতি',
            },
        ],
        siteName: 'অনুশীলন একাডেমি',
        type: 'website',
        locale: 'bn_BD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'গোপনীয়তা নীতি -- অনুশীলন একাডেমি',
        description: 'অনুশীলন একাডেমির গোপনীয়তা নীতি সম্পর্কে জানুন। আমরা কীভাবে ব্যবহারকারীদের তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি, সেই সম্পর্কে বিস্তারিত তথ্য এখানে দেওয়া হয়েছে। আপনার ডেটা নিরাপত্তা আমাদের কাছে সর্বোচ্চ অগ্রাধিকার।',
        images: ['/og-image.png'],
    },
}
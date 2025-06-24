 
import React from "react";
import ContactForm from "./ContactForm";


export const metadata = {
    title: "Contact",
};

const ContactPage = () => {




    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-blue-700 mb-8">Contact Us</h2>

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl p-8">
                {/* Contact Form */}

                <ContactForm />

                {/* Contact Info in Bengali */}
                <div className="flex flex-col justify-center space-y-4 text-gray-700">
                    <h3 className="text-2xl font-bold text-blue-700">যোগাযোগ করুন</h3>
                    <p>আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন। নিচের তথ্য ব্যবহার করেও যোগাযোগ করতে পারেন।</p>
                    <div>
                        <p className="font-semibold">📞 ফোন:</p>
                        <p>+৮৮০ ০১৩২১০৪০২৭৩</p>
                    </div>
                    <div>
                        <p className="font-semibold">📧 ইমেইল:</p>
                        <p>onushilonac@gmail.com</p>
                    </div>
                    <div>
                        <p className="font-semibold">📍 ঠিকানা:</p>
                        <p>ঢাকা, বাংলাদেশ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

"use client";
import React, { useContext, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { postActions } from '@/actions/admins/postActions';
import { resentVerificationEmail } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';

export default function ResentEmailVerification({ verifiedStatus, email }) {
    const { showToast } = useContext(contextD)
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleResendEmail = async () => {
        setLoading(true);
        setErrorMsg("");
        try {
          
            const payload = {
                method: "POST",
                api: resentVerificationEmail,
                body: { email }
            }

            const { status, data } = await postActions(payload)
            showToast(status, data)
            setSuccess(true);

        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (verifiedStatus) return null;

    return (
        <div className="my-4 text-sm text-right">
            {!success ? (
                <button
                    onClick={handleResendEmail}
                    disabled={loading}
                    className="text-blue-600 underline hover:text-blue-800 transition duration-200 disabled:opacity-50"
                >
                    {loading ? (
                        <span className="inline-flex items-center gap-1">
                            <Loader2 className="animate-spin w-4 h-4" />
                            Sending...
                        </span>
                    ) : (
                        "Resend verification email"
                    )}
                </button>
            ) : (
                <p className="text-green-600 font-medium">Verification email sent! Check Email</p>
            )}
            {errorMsg && <p className="text-red-500 mt-1">{errorMsg}</p>}
        </div>
    );
}

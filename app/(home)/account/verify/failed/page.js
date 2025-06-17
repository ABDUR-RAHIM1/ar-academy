
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function EmailVerifiedFailed() {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center px-4">
            <XCircle className="text-red-500 w-20 h-20 mb-4" />
            <h1 className="text-3xl font-bold text-red-700 mb-2">Verification Failed!</h1>
            <p className="text-red-600 mb-6">The verification link is invalid or expired.</p>

            <Link
                href={"/account/register"}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition"
            >
                Try Register Again
            </Link>
        </div>
    );
}

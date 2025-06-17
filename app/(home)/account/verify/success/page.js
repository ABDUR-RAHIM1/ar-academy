"use client";
import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { contextD } from "@/contextApi/DashboardState";
import { jwtDecode } from "jwt-decode";

export default function EmailVerifiedSuccess() {
  const { setLoginSignal } = useContext(contextD);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [tokenInfo, setTokenInfo] = useState({})

  useEffect(() => {

    const tokenSetter = async () => {
      if (token) {
        const decodedTokenInfo = jwtDecode(token);
        setTokenInfo(decodedTokenInfo)

        if (decodedTokenInfo.role === "user") {
          Cookies.set("onushilon_academy_session", token, { expires: 7 });
          setLoginSignal((prev) => !prev);
        } else {
          Cookies.set("onushilon_access", token, { expires: 7 });
        }

      }
    };

    tokenSetter()
  }, [token, setLoginSignal]);





  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center px-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Email Verified!</h1>
      <p className="text-green-600 mb-6">Your email has been successfully verified.</p>

      {
        tokenInfo.role === "user" ?
          <Link
            href={"/profile"}
            className=" inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Go to Profile
          </Link>

          :
          <Link
            href={"/dashboard"}
            className=" inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Go to Dashboard
          </Link>

      }
    </div >
  );
}

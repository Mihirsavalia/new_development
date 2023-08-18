"use client"
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

 const xeroconnect = () => {
  const router = useRouter();
  const getAccessCode = useSearchParams();
  const code = getAccessCode.get("code") || "";

  useEffect(() => {
    if (code) {
      localStorage.setItem("xerocode", code);
      router.push("/manage/companies");
    }
  }, [code, router]);

  return (
   <>
   </>
  );
};

export default xeroconnect;


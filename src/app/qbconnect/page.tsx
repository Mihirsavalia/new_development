"use client"
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

 const qbConnect = () => {
  const router = useRouter();
  const getAccessCode = useSearchParams();
  const code = getAccessCode.get("code") || "";
  const realmId = getAccessCode.get("realmId") || "";

  useEffect(() => {
    if (code && realmId) {
      localStorage.setItem("qbcode", code);
      localStorage.setItem("realmId", realmId);
      router.push("/manage/companies");
    }
  }, [code, realmId, router]);

  return (
   <>
   </>
  );
};

export default qbConnect;


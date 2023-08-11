"use client";

import Image from "next/image";
import Link from "next/link";
import { Typography } from "next-ts-lib";
import BackArrow from "../../assets/Icons/BackArrow";
import { useSearchParams } from "next/navigation";
import "next-ts-lib/dist/index.css";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { hasToken } from "@/utils/commonFunction";

export default function Forgetconfirm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    hasToken(router);
  }, [router]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="forgetWrapper flex items-center flex-col pt-5">
        <Image src="/logo.png" alt="Logo" width={194} height={100} priority />
        <Typography type="h3" className="pt-14 pb-2 font-bold capitalize">
          Check Your Email
        </Typography>
        <div className="content tracking-[0.28px] mb-2.5 text-[14px]">
          A password reset email has been sent to
          <span className="text-primary"> {email}. </span>
        </div>
        <div className="max-w-[450px] xs:!px-5 md:!px-0 tracking-[0.28px] flex justify-center items-center text-center text-[14px]">
          If you do not receive the email in a timely manner, please try again
          and make sure that you provide the correct email address.
        </div>
        <div className="backLoignWrapper pt-5 flex justify-center ">
          <Link href="signin">
            <div className="backArrow  items-center justify-center flex">
              <BackArrow />
              <div className="ml-2.5  ">
                <Typography
                  type="text"
                  className="!text-[14px] !font-normal text-primary  "
                >
                  Back to Login
                </Typography>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

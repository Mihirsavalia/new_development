"use client";
import Image from "next/image";
import EmailIcon from "../../assets/Icons/Email";
import { Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import Footer from "@/components/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { hasToken } from "@/utils/commonFunction";
import Link from "next/link";
import BackArrow from "@/assets/Icons/BackArrow";

export default function EmailActivate() {
  const router = useRouter();
  const Email = useSearchParams();
  const email = Email.get("email");

  useEffect(() => {
    hasToken(router);
  }, [router]);

  return (
    <>
      <div className="flex flex-col px-2 items-center justify-center min-h-screen">
        <span className="absolute top-0 pt-5">
          <Image src="/logo.png" alt="Logo" width={194} height={100} />
        </span>
        <span className="flex justify-center items-center">
          <EmailIcon />
        </span>
        <Typography
          type="h3"
          className="pt-4 pb-2 font-bold text-primary text-center"
        >
          Activate your PathQuest Account
        </Typography>
        <Typography type="h5" className="pb-2 !font-light text-center">
          We have sent a confirmation email to
        </Typography>
        <Typography
          type="h6"
          className="pb-2 !font-bold text-primary text-center"
        >
          {email}
        </Typography>
        <div className="backLoignWrapper pt-3 flex justify-center ">
          <Link href="signin">
            <div className="backArrow items-center justify-center flex">
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
      <span className="absolute bottom-0 left-0 w-full">
        <Footer />
      </span>
    </>
  );
}

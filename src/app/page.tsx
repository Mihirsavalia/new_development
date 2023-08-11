"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    } else {
      router.push("/profile");
    }
  }, [router]);
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <Loader helperText />
    </div>
  );
};

export default Home;

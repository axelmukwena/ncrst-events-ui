"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

import { initAuth } from "@/backend/service/firebase";
import LinearLoader from "@/components/Loaders/LinearLoader";
import { LocalUrl } from "@/utilities/constants";

const Signout: FC = () => {
  const router = useRouter();
  const auth = initAuth();

  useEffect(() => {
    auth.signOut();
    router.push(LocalUrl.HOME);
  }, []);

  return <LinearLoader />;
};

export default Signout;

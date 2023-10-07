"use client";

import { usePathname } from "next/navigation";
import React, { FC, ReactNode } from "react";

import { initAuth } from "@/backend/service/firebase";
import LinearLoader from "@/components/Loaders/LinearLoader";
import useCurrentUser from "@/hooks/useCurrentUser";
import { PUBLIC_ROUTES } from "@/utilities/constants";
import FirebaseView from "@/views/Firebase";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  initAuth();
  const { currentUser, currentUserLoading, firebaseUserLoading } =
    useCurrentUser();
  const pathname = usePathname();

  if (currentUserLoading || firebaseUserLoading) {
    return <LinearLoader />;
  }

  // if (!currentUser && !PUBLIC_ROUTES.includes(pathname)) {
  //   return <FirebaseView previousPath={pathname} />;
  // }
  return <>{children}</>;
};

export default AuthProvider;

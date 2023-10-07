"use client";

import React, { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";

const RecoilRootWrapper = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => <RecoilRoot>{children}</RecoilRoot>;

export default RecoilRootWrapper;

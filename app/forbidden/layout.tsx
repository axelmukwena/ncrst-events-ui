import "@/styles/globals.scss";

import type { Metadata } from "next";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => <body>{children}</body>;

export default RootLayout;

export const metadata: Metadata = {
  title: "Forbidden | National Science Events",
};

"use client";

import React, { FC, ReactNode } from "react";
import { styled } from "styled-components";

import { FlexRow } from "@/components/Elements/DisplayFlex";
import { color } from "@/utilities/color";

import Header from "../Header";

const Main = styled.main({
  minHeight: "100vh",
  height: "100%",
});

const MainContent = styled(FlexRow.StartStart)({
  top: "var(--header-height)",
  minHeight: "calc(100vh - var(--header-height))",
  height: "100%",
  backgroundColor: color.white,
  // position: "relative",
});

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => (
  <Main className="main-layout">
    <Header />
    <MainContent className="main-content">{children}</MainContent>
  </Main>
);

export default MainLayout;

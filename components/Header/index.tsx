import React, { FC } from "react";
import { styled } from "styled-components";

import { FlexRow } from "@/components/Elements/DisplayFlex";
import { color } from "@/utilities/color";

import HorizontalLogo from "../Logo/HorizontalLogo";
import SearchEvent from "../Search";
import MenuItems from "./MenuItems";

const Toolbar = styled(FlexRow.BetweenCenter)({
  backgroundColor: color.white,
  minHeight: "35px",
  padding: "0 40px",
  height: "var(--header-height)",
  position: "fixed",
  top: 0,
  zIndex: 100,
  boxShadow: "0 4px 16px #0000000a",
});

const Header: FC = () => (
  <Toolbar className="header-main">
    <FlexRow.StartCenter gap={10}>
      <HorizontalLogo />
      <SearchEvent />
    </FlexRow.StartCenter>
    <MenuItems />
  </Toolbar>
);

export default Header;

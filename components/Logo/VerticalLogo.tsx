import { IconShieldLockFilled } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

import { color } from "@/utilities/color";

import { FlexColumn } from "../Elements/DisplayFlex";

const LogoName = styled.div({
  fontSize: "30px",
  fontWeight: 700,
  color: color.gray800,
});

const VerticalLogo: FC = () => (
  <Link href="/">
    <FlexColumn.CenterCenter gap={3}>
      <IconShieldLockFilled size={70} />
      <FlexColumn.CenterCenter gap={5}>
        <LogoName>National Science Events</LogoName>
      </FlexColumn.CenterCenter>
    </FlexColumn.CenterCenter>
  </Link>
);

export default VerticalLogo;

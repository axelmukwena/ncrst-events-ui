import { IconTelescope } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

import { color } from "@/utilities/color";

import { FlexColumn, FlexRow } from "../Elements/DisplayFlex";

const LogoName = styled.div({
  fontSize: "16px",
  fontWeight: 700,
  color: color.gray800,
});

const HorizontalLogo: FC = () => (
  <Link href="/">
    <FlexRow.StartCenter gap={8}>
      <IconTelescope size={64} />
      <FlexColumn.CenterStart gap={0}>
        <LogoName>National Science Events</LogoName>
      </FlexColumn.CenterStart>
    </FlexRow.StartCenter>
  </Link>
);

export default HorizontalLogo;

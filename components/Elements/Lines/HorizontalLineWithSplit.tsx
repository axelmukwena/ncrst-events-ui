import { FC } from "react";
import styled from "styled-components";

import { color as utilColor } from "@/utilities/color";

import { FlexRow } from "../DisplayFlex";

interface HorizontalLineProps {
  width?: string;
  lineHeight?: string;
  color?: string;
  children: React.ReactNode;
}

const HorizontalLine = styled(FlexRow.CenterCenter)<HorizontalLineProps>(
  ({ width = "100%", lineHeight = "1px", color = utilColor.gray300 }) => ({
    width,
    "&:before, &:after": {
      content: '""',
      flex: 1,
      borderBottom: `${lineHeight} solid ${color}`,
    },
    "&:before": {
      marginRight: "10px",
    },
    "&:after": {
      marginLeft: "10px",
    },
  })
);

const HorizontalLineWithSplit: FC<HorizontalLineProps> = (props) => (
  <HorizontalLine {...props}>{props.children}</HorizontalLine>
);

export default HorizontalLineWithSplit;

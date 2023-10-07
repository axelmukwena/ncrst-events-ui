import { FC } from "react";
import { styled } from "styled-components";

import { color as utilColor } from "@/utilities/color";

const Hr = styled.hr<{ color: string; width: string }>(({ color, width }) => ({
  width,
  height: "1px",
  backgroundColor: color,
  border: "none",
}));

const HorizonalLine: FC<{ color?: string; width?: string }> = ({
  color = utilColor.gray300,
  width = "100%",
}) => <Hr color={color} width={width} />;

export default HorizonalLine;

import React, { FC } from "react";
import styled from "styled-components";

import { color } from "@/utilities/color";

const TooltipContainer = styled.div({
  position: "relative",
  display: "inline-block",
});

const TooltipText = styled.span<{
  bgColor: string;
}>(({ bgColor }) => ({
  fontSize: "12px",
  fontWeight: 600,
  visibility: "hidden",
  width: "120px",
  backgroundColor: bgColor,
  color: color.white,
  textAlign: "center",
  padding: "5px",
  borderRadius: "6px",
  position: "absolute",
  zIndex: 1,
  bottom: "135%",
  left: "50%",
  marginLeft: "-60px",
  opacity: 0,
  transition: "opacity 0.3s",
  boxShadow: "-1px 1px 4px 1px #0000003b",
  [`${TooltipContainer}:hover &`]: {
    visibility: "visible",
    opacity: 0.98,
  },
}));

interface TooltipProps {
  text: string;
  bgColor?: string;
  children: React.ReactNode;
}

const Tooltip: FC<TooltipProps> = ({
  text,
  children,
  bgColor = color.gray600,
}) => (
  <TooltipContainer className="tooltip-container">
    {children}
    <TooltipText bgColor={bgColor} className="tooltip">
      {text}
    </TooltipText>
  </TooltipContainer>
);

export default Tooltip;

import styled from "styled-components";

import { color as utilColor } from "@/utilities/color";

const CircularLoader = styled.div<{
  size?: number;
  color?: string;
}>(({ size = 16, color = "rgba(0, 0, 0, 0.1)" }) => ({
  border: `3px solid ${color}`,
  borderRadius: "50%",
  borderTop: `3px solid ${utilColor.gray700}`,
  borderRight: `3px solid ${utilColor.gray700}`,
  width: `${size}px`,
  height: `${size}px`,
  animation: `circular-loader 1s linear infinite`,
}));

export default CircularLoader;

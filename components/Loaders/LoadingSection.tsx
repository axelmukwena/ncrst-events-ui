import { FC } from "react";

import { FlexColumn } from "../Elements/DisplayFlex";
import CircularLoader from "./CircularLoader";

interface LoadingCircularSectionProps {
  size?: number;
  minHeight?: string;
}

const LoadingCircularSection: FC<LoadingCircularSectionProps> = ({
  size,
  minHeight = "calc(100vh - var(--header-height))",
}) => (
  <FlexColumn.CenterCenter
    style={{
      minHeight,
      height: "100%",
    }}
    className="loading-section"
  >
    <CircularLoader size={size} />
  </FlexColumn.CenterCenter>
);

export default LoadingCircularSection;

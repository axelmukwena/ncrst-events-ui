import { FC } from "react";
import styled from "styled-components";

import { color } from "@/utilities/color";

const LoaderWrapper = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  margin: "0 !important",
  padding: "0 !important",
  zIndex: "1301",
  width: "100%",
});

const BarContainer = styled.div({
  height: "4px",
  width: "100%",
  backgroundColor: color.gray400,
  position: "relative",
  overflow: "hidden",
});

const Bar = styled.span({
  position: "absolute",
  transition: "transform 0.1s linear",
  transformOrigin: "left",
  width: "auto",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: color.gray700,
});

const LinearLoader: FC = () => (
  <LoaderWrapper className="linear-loader">
    <BarContainer className="bar-container">
      <Bar
        className="bar-one"
        style={{
          animation:
            "linear-loader-one 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite",
        }}
      />
      <Bar
        className="bar-two"
        style={{
          animation:
            "linear-loader-two 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite",
        }}
      />
    </BarContainer>
  </LoaderWrapper>
);

export default LinearLoader;

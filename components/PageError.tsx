import { FC } from "react";
import styled from "styled-components";

import { color } from "@/utilities/color";

import { FlexColumn } from "./Elements/DisplayFlex";

const PageErrorContainer = styled(FlexColumn.CenterCenter)({
  minHeight: "calc(100vh - var(--header-height))",
  height: "100%",
});

const Title = styled.div({
  fontSize: "60px",
  fontWeight: 700,
  color: color.black,
});

const SubTitle = styled.div({
  fontSize: "20px",
  fontWeight: 600,
  color: color.gray900,
});

const Text = styled.div({
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray900,
});

interface PageErrorProps {
  name?: string;
}

const PageError: FC<PageErrorProps> = ({ name }) => (
  <PageErrorContainer gap={20} className="not-found">
    <Title>404</Title>
    <SubTitle>Not Found</SubTitle>
    <Text>
      Oops... We couldn't find{" "}
      {name ? `this ${name}` : "what you're looking for"}
    </Text>
  </PageErrorContainer>
);

export default PageError;

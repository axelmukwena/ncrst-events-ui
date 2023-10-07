import { styled } from "styled-components";

import { color } from "@/utilities/color";
import { size } from "@/utilities/size";

import { FlexColumn } from "./DisplayFlex";

export const FormErrorMessage = styled.p({
  color: color.red700,
  fontSize: size[12],
  fontWeight: 600,
  padding: "7px 0 0 8px",
});

export const FormSuccessMessage = styled.p({
  color: color.green700,
  fontSize: size[12],
  fontWeight: 600,
  padding: "7px 0 0 8px",
});

export const SidebarContainer = styled(FlexColumn.StartStart)({
  padding: "20px 30px 40px 20px",
  width: "360px",
  minHeight: "calc(100vh - var(--header-height))",
});

export const MainContainer = styled(FlexColumn.StartStart)({
  padding: "20px 30px",
  minHeight: "calc(100vh - var(--header-height))",
  height: "100%",
  borderLeft: `1px solid ${color.gray300}`,
  marginTop: "var(--header-height)",
});

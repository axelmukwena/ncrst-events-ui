import styled from "styled-components";

import { color } from "@/utilities/color";

export const buttonRoundIconStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px",
  borderRadius: "100%",
  border: `0px solid ${color.gray300}`,
  cursor: "pointer",
  backgroundColor: color.transparent,
  "&:hover": {
    backgroundColor: color.gray200,
  },
};

// @ts-expect-error
export const ButtonRoundIcon = styled.button({
  ...buttonRoundIconStyles,
});

export const PrimaryButton = styled.button({
  width: "200px",
  padding: "10px 20px",
  fontSize: "14px",
  fontWeight: 700,
  color: color.white,
  backgroundColor: color.gray800,
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: color.gray700,
  },
});

export const SecondaryButton = styled(PrimaryButton)({
  backgroundColor: color.gray150,
  color: color.gray800,
  border: `1px solid ${color.gray300}`,
  "&:hover": {
    backgroundColor: color.gray300,
  },
});

export const RedButton = styled(PrimaryButton)({
  backgroundColor: color.red500,
  "&:hover": {
    backgroundColor: color.red600,
  },
});

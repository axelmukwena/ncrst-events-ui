import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import React, { ReactElement } from "react";
import styled from "styled-components";

import { color } from "@/utilities/color";

import { buttonRoundIconStyles } from "../Elements/Buttons";
import { FlexColumn } from "../Elements/DisplayFlex";

const StyledOverlay = styled(DialogOverlay)({
  position: "fixed",
  inset: 0,
  backdropFilter: color.translucentBlur,
  backgroundColor: color.translucent,
  zIndex: 20,
});

const CenteredStyledDialogContent = styled(DialogContent)({
  position: "fixed",
  zIndex: 50,
  width: "40vw",
  maxHeight: "90vh",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: "4px",
  overflowY: "auto",
  overflowX: "hidden",
});

const DialogInner = styled(FlexColumn.StartStart)({
  padding: "var(--modal-padding-top)",
  height: "100%",
});

// @ts-expect-error
const CloseButton = styled(DialogClose)({
  position: "absolute",
  top: "25px",
  right: "25px",
  ...buttonRoundIconStyles,
});

interface DialogCenterProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

const DialogCenter = ({
  open,
  handleClose,
  children,
  contentClassName,
  contentStyle,
}: DialogCenterProps): ReactElement => (
  <Dialog open={open} onOpenChange={handleClose}>
    <StyledOverlay className="dialog-overlay">
      <CenteredStyledDialogContent
        className={`dialog-content no-focusborder dialog-center ${
          contentClassName || ""
        }`}
        style={contentStyle}
      >
        <DialogInner className="dialog-content-inner">{children}</DialogInner>
        <CloseButton>
          <IconX size={20} stroke={1.3} color={color.gray900} />
        </CloseButton>
      </CenteredStyledDialogContent>
    </StyledOverlay>
  </Dialog>
);

export default DialogCenter;

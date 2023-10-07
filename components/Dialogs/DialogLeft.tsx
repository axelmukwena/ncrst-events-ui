import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import React, { ReactElement } from "react";
import { styled } from "styled-components";

import { color } from "@/utilities/color";

import { buttonRoundIconStyles } from "../Elements/Buttons";
import { FlexColumn } from "../Elements/DisplayFlex";

const StyledOverlay = styled(DialogOverlay)({
  position: "fixed",
  inset: 0,
  backdropFilter: color.translucentBlur,
  backgroundColor: color.translucent,
  opacity: 1,
  transition: "opacity 0.4s linear",
  zIndex: 20,
  overflowY: "hidden",
});

const StyledDialogContent = styled(DialogContent)({
  position: "fixed",
  zIndex: 50,
  width: "80vw",
  maxWidth: "100%",
  maxHeight: "100vh",
  overflowY: "auto",
  overflowX: "hidden",
  top: "0",
  left: "0",
  backgroundColor: "white",
  overscrollBehavior: "contain",
});

const DialogInner = styled(FlexColumn.StartStart)({
  padding: "var(--modal-padding-top) 40px 0 40px",
  minHeight: "100vh",
  height: "100%",
});

// @ts-expect-error
const CloseButton = styled(DialogClose)({
  position: "absolute",
  top: "25px",
  right: "60px",
  ...buttonRoundIconStyles,
});

interface DialogLeftProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

const DialogLeft = ({
  open,
  handleClose,
  children,
  contentClassName,
  contentStyle,
}: DialogLeftProps): ReactElement => (
  <Dialog open={open} onOpenChange={handleClose}>
    <StyledOverlay className="dialog-overlay">
      <StyledDialogContent
        className={`dialog-content no-focusborder dialog-left ${
          contentClassName || ""
        }`}
        style={contentStyle}
      >
        <DialogInner className="dialog-content-inner">{children}</DialogInner>
        <CloseButton>
          <IconX size={20} stroke={3} color={color.gray500} />
        </CloseButton>
      </StyledDialogContent>
    </StyledOverlay>
  </Dialog>
);

export default DialogLeft;

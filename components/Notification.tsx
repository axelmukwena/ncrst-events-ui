"use client";

import { IconX } from "@tabler/icons-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { notificationState } from "@/store/notification";

import { FlexRow } from "./Elements/DisplayFlex";

const NotificationBox = styled.div<{ color: string }>(({ color }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
  backgroundColor: color,
}));

const MessageContainer = styled(FlexRow.CenterCenter)({
  height: "100%",
  margin: "12px 0",
  position: "relative",
});

const Message = styled.p({
  color: "white",
  fontWeight: 500,
  textAlign: "center",
});

const CloseIcon = styled(IconX)({
  position: "absolute",
  right: "20px",
  cursor: "pointer",
  color: "white",
  fontSize: "28px",
  borderRadius: "100%",
  padding: "5px",
  "&:hover": {
    backgroundColor: "#ffffff3b",
  },
});

const Notification: FC = () => {
  const [notification, setNotification] = useRecoilState(notificationState);
  const { message, type, seconds = 20000 } = notification;
  const [show, setShow] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const getColor = (): string => {
    switch (type) {
      case "error":
        return "#f44336";
      case "warning":
        return "#f36b24";
      case "success":
        return "#00c853";
      default:
        return "#000000";
    }
  };

  useEffect(() => {
    setShow(!!message);

    timeout.current = setTimeout(() => {
      setShow(false);
      setNotification({ message: null });
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }, seconds);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [notification]);

  const handleMouseHover = (value: boolean): void => {
    if (value && timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    } else {
      timeout.current = setTimeout(() => {
        setShow(false);
        setNotification({ message: null });
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      }, seconds);
    }
  };

  return (
    <>
      {show && (
        <NotificationBox
          color={getColor()}
          onMouseEnter={(): void => handleMouseHover(true)}
          onMouseLeave={(): void => handleMouseHover(false)}
        >
          <MessageContainer>
            <Message>{message}</Message>
            <CloseIcon onClick={(): void => setShow(false)} />
          </MessageContainer>
        </NotificationBox>
      )}
    </>
  );
};

export default Notification;

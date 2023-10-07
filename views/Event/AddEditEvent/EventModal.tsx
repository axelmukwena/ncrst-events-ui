import React, { ReactElement } from "react";
import { styled } from "styled-components";

import { Event } from "@/backend/service/event/types";
import DialogLeft from "@/components/Dialogs/DialogLeft";
import { color } from "@/utilities/color";
import { size } from "@/utilities/size";

import EventForm from "./EventForm";

export const DialofTitle = styled.div({
  color: color.black,
  fontSize: size[19],
  fontWeight: 900,
  letterSpacing: "-0.1px",
  padding: "0 20px",
});

interface EventModalProps {
  open: boolean;
  handleClose: () => void;
  event?: Event | null;
}

const EventModal = ({
  open,
  handleClose,
  event,
}: EventModalProps): ReactElement => (
  <DialogLeft
    open={open}
    handleClose={handleClose}
    contentClassName="add-event-dialog-content"
  >
    <DialofTitle className="add-event-form-title">
      {event ? `Update ${event.title}` : "Create a new event"}
    </DialofTitle>
    <EventForm event={event} />
  </DialogLeft>
);

export default EventModal;

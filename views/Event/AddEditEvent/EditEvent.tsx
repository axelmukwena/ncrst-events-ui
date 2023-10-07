import { IconEdit } from "@tabler/icons-react";
import { FC, useState } from "react";

import { Event } from "@/backend/service/event/types";
import { SecondaryButton } from "@/components/Elements/Buttons";
import { FlexRow } from "@/components/Elements/DisplayFlex";

import EventModal from "./EventModal";

interface EditEventProps {
  event: Event;
}

const EditEvent: FC<EditEventProps> = ({ event }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (): void => setOpen(!open);

  return (
    <>
      <SecondaryButton onClick={handleClose}>
        <FlexRow.BetweenCenter>
          <IconEdit size={18} />
          <div>Edit Event</div>
        </FlexRow.BetweenCenter>
      </SecondaryButton>
      <EventModal open={open} event={event} handleClose={handleClose} />
    </>
  );
};

export default EditEvent;

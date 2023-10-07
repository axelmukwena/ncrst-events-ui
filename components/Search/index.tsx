import { IconSearch } from "@tabler/icons-react";
import { FC, useState } from "react";
import styled from "styled-components";

import { FlexRow } from "@/components/Elements/DisplayFlex";
import { color } from "@/utilities/color";

import SearchEventsModal from "./SearchEventModal";

const SearchContainer = styled(FlexRow.StartCenter)({
  width: "370px",
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: "50px",
  border: `1px solid ${color.gray300}`,
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
});

const Placeholder = styled.div({
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray500,
});

const SearchEvent: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleSearchModal = (): void => {
    setOpen(!open);
  };
  return (
    <>
      <SearchContainer
        className="search-event-wrapper"
        gap={10}
        onClick={handleToggleSearchModal}
      >
        <IconSearch size={14} />
        <Placeholder>Search events</Placeholder>
      </SearchContainer>
      {open && (
        <SearchEventsModal open={open} handleClose={handleToggleSearchModal} />
      )}
    </>
  );
};

export default SearchEvent;

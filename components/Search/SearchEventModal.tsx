import { IconSearch } from "@tabler/icons-react";
import { FC, useState } from "react";
// import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import useSWR from "swr";

import { mockSearchEventByTitle } from "@/backend/mock/event";
import { Event, EventUrl } from "@/backend/service/event/types";
import DialogLeft from "@/components/Dialogs/DialogLeft";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import EventCard from "@/components/Events/EventsCard";
import CircularLoader from "@/components/Loaders/CircularLoader";
import { useDebounce } from "@/hooks/useDebounce";
// import { notificationState } from "@/store/notification";
import { color } from "@/utilities/color";

const SearchIcon = styled(IconSearch)({
  color: color.gray500,
});

const SearchInput = styled.input({
  minWidth: "400px",
  padding: "10px 8px",
  fontSize: "20px",
  fontWeight: 800,
  color: color.gray800,
  backgroundColor: color.white,
  border: "none",
  borderBottom: `4px solid ${color.gray200}`,
  "&:focus": {
    outline: "none",
    border: "none",
    borderBottom: `4px solid ${color.blue300}`,
  },
});
interface SearchEventModalProps {
  open: boolean;
  handleClose: () => void;
}

const SearchEventsModal: FC<SearchEventModalProps> = ({
  open,
  handleClose,
}) => {
  // const setNotification = useSetRecoilState(notificationState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState<number>(10);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 1000);

  const fetcher = async (): Promise<Event[]> => {
    if (!debouncedSearch) {
      return [];
    }

    // const params: GetManyEventsParams = {
    //   search_title: debouncedSearch,
    //   limit,
    //   skip: page * limit,
    // };

    const { events } = await mockSearchEventByTitle(debouncedSearch);
    return events;

    // if (!firebaseUser) {
    //   return null;
    // }
    // const token = await firebaseUser.getIdToken();
    // const userService = new EventService(token);
    // const res = await userService.getMany(params);
    // if (res.success) {
    //   return res;
    // }
    // throw new Error(res.message);
  };

  const usersSwrUrl = `${EventUrl.GET}?limit=${limit}&skip=${page}${
    debouncedSearch ? `&search=${debouncedSearch}` : ""
  }`;
  const { data: events = [], isLoading } = useSWR(usersSwrUrl, fetcher);

  return (
    <DialogLeft
      open={open}
      handleClose={handleClose}
      contentClassName="search-event-dialog-content"
    >
      <FlexColumn.StartStart
        className="search-event-dialog-main-container"
        gap={20}
      >
        <FlexRow.StartCenter className="search-event-dialog-header" gap={10}>
          <SearchIcon size={25} stroke={3} />
          <SearchInput
            className="search-event-input"
            placeholder="Search events"
            value={searchInput}
            onChange={(e): void => setSearchInput(e.target.value)}
          />
        </FlexRow.StartCenter>
        {isLoading && <CircularLoader size={30} />}

        <FlexRow.StartStart className="home-events-container" gap={20}>
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
          {!isLoading && !events.length && <div>No events found</div>}
        </FlexRow.StartStart>
      </FlexColumn.StartStart>
    </DialogLeft>
  );
};

export default SearchEventsModal;

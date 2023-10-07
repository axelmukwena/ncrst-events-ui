"use client";

import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import useSWR from "swr";

import { mockGetEventBySlug } from "@/backend/mock/event";
import { Event, EventUrl } from "@/backend/service/event/types";
import Carousel from "@/components/Carousels/Carousel";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import { MainContainer } from "@/components/Elements/General";
import GoogleMaps from "@/components/GoogleMaps";
import LoadingCircularSection from "@/components/Loaders/LoadingSection";
import { notificationState } from "@/store/notification";
import { color } from "@/utilities/color";
import { getFormatedDateFromTimestamp } from "@/utilities/helpers/formatDate";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";
import NotFound from "@/views/NotFound";

import EditEvent from "./AddEditEvent/EditEvent";

const EventMainContainer = styled(FlexColumn.StartStart)({
  marginTop: "50px",
  padding: "0 13vw",
});

export const Title = styled.div({
  color: color.black,
  fontSize: "40px",
  fontWeight: 800,
});

const DateText = styled.div({
  fontSize: "15px",
  fontWeight: 600,
  color: color.gray700,
});

const Description = styled.div({
  marginTop: "30px",
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray700,
});

interface EventViewProps {
  slug: string;
}

const EventView: FC<EventViewProps> = ({ slug }) => {
  const setNotification = useSetRecoilState(notificationState);

  const fetcher = async (): Promise<Event | null> => {
    const { event } = await mockGetEventBySlug(slug);
    if (event) {
      return event;
    }

    return null;
    // const token = "random-token";
    // const eventService = new EventService(token);
    // const res = await eventService.getBySlug(uid);
    // if (res.success) {
    //   return res.event;
    // }
    // throw new Error(res.message);
  };

  const eventSwrUrl = `${EventUrl.GET}/${slug}`;
  const { data: event, isLoading, error } = useSWR(eventSwrUrl, fetcher);

  useEffect(() => {
    if (error) {
      const message = getErrorMessage(error);
      setNotification({ message, type: "error" });
    } else {
      setNotification({ message: null });
    }
  }, [error]);

  if (isLoading) {
    return <LoadingCircularSection size={30} />;
  }

  if (!event) {
    return <NotFound name="Event" />;
  }

  return (
    <MainContainer className="event-view-main-container">
      <FlexColumn.CenterCenter>
        <Carousel
          images={[event.primary_image, ...event.images].map(
            (image) => image.url
          )}
          isEventPage
        />
      </FlexColumn.CenterCenter>

      <EventMainContainer className="event-view-main-container" gap={15}>
        <FlexRow.BetweenCenter>
          <FlexRow.StartStart gap={30}>
            <FlexRow.StartCenter
              className="event-organizer"
              gap={10}
              style={{ width: "auto" }}
            >
              <IconCalendar size={18} color={color.gray700} />
              <DateText className="event-date">
                {getFormatedDateFromTimestamp(event.start_date)}
              </DateText>
            </FlexRow.StartCenter>
            <FlexRow.StartCenter
              className="event-organizer"
              gap={10}
              style={{ width: "auto" }}
            >
              <IconMapPin size={18} color={color.gray700} />
              <DateText className="event-location">
                {event.location.address}
              </DateText>
            </FlexRow.StartCenter>
          </FlexRow.StartStart>
          <EditEvent event={event} />
        </FlexRow.BetweenCenter>
        <Title className="event-title">{event.title}</Title>
        <Description className="event-description">
          {event.description}
        </Description>

        {event.location.lat && event.location.lng && (
          <GoogleMaps lat={event.location.lat} lng={event.location.lng} />
        )}
      </EventMainContainer>
    </MainContainer>
  );
};

export default EventView;

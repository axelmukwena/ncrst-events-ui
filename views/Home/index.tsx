"use client";

import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import useSWR from "swr";

import { mockGetEvents } from "@/backend/mock/event";
import { Event, EventUrl } from "@/backend/service/event/types";
import Carousel from "@/components/Carousels/Carousel";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import { MainContainer } from "@/components/Elements/General";
import EventCard from "@/components/Events/EventsCard";
import LoadingCircularSection from "@/components/Loaders/LoadingSection";
import { notificationState } from "@/store/notification";
import { color } from "@/utilities/color";
import { BANNER_IMAGES } from "@/utilities/constants";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";

const Title = styled.div({
  color: color.black,
  fontSize: "19px",
  fontWeight: 900,
  letterSpacing: "-0.1px",
  padding: "0 20px",
});

const HomeView: FC = () => {
  const setNotification = useSetRecoilState(notificationState);
  const fetcher = async (): Promise<Event[]> => {
    const { events } = await mockGetEvents();
    return events;

    // const token = "random-token";
    // const eventService = new EventService(token);
    // const res = await eventService.getBySlug(uid);
    // if (res.success) {
    //   return res.event;
    // }
    // throw new Error(res.message);
  };

  const eventSwrUrl = `${EventUrl.GET}`;
  const { data: events = [], isLoading, error } = useSWR(eventSwrUrl, fetcher);

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

  return (
    <FlexRow.StartStart>
      <MainContainer className="home-view-main-container">
        <Carousel images={BANNER_IMAGES} isHomePageTop />
        <FlexColumn.StartStart
          className="home-events-container"
          gap={50}
          style={{ marginTop: "50px" }}
        >
          <FlexColumn.StartStart className="home-events-container" gap={20}>
            <Title className="home-title">Popular Events</Title>
            <FlexRow.StartStart className="home-events-row" gap={20}>
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </FlexRow.StartStart>
          </FlexColumn.StartStart>

          <FlexColumn.StartStart className="home-events-container" gap={20}>
            <Title className="home-title">Popular Events</Title>
            <FlexRow.StartStart className="home-events-row" gap={20}>
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </FlexRow.StartStart>
          </FlexColumn.StartStart>
        </FlexColumn.StartStart>
      </MainContainer>
    </FlexRow.StartStart>
  );
};

export default HomeView;

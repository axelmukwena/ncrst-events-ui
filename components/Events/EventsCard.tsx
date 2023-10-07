import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { Event } from "@/backend/service/event/types";
import { color } from "@/utilities/color";
import { getFormatedDateFromTimestamp } from "@/utilities/helpers/formatDate";

import { FlexColumn } from "../Elements/DisplayFlex";

const CardContainer = styled(FlexColumn.StartStart)({
  width: "318px",
  height: "360px",
  padding: "10px",
  borderRadius: "10px",
  backgroundColor: "white",
  boxShadow: "0 4px 16px #0000001a",
  "&:hover": {
    boxShadow: "0 4px 16px #00000030",
  },
});

const ImageContainer = styled(Image)({
  width: "100%",
  height: "200px",
  borderRadius: "10px",
  objectFit: "cover",
});

const Title = styled(Link)({
  fontSize: "20px",
  fontWeight: 800,
  letterSpacing: "-0.1px",
  color: color.gray700,
  "&:hover": {
    color: color.gray600,
  },
});

const DateText = styled.div({
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "-0.1px",
  color: color.red600,
});

const Organizer = styled.div({
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "-0.1px",
  color: color.gray600,
});

const Price = styled.div({
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "-0.1px",
  color: color.gray700,
});

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <CardContainer className="event-card" gap={20}>
    <ImageContainer
      width={318}
      height={200}
      src={event.primary_image.url}
      alt={event.primary_image.alt}
      className="event-card-image"
    />
    <FlexColumn.StartStart className="event-card-content" gap={3}>
      <Title href={`/events/${event.slug}`} className="event-card-title">
        {event.title}
      </Title>
      <DateText className="event-card-date">
        {getFormatedDateFromTimestamp(event.start_date)}
      </DateText>
      <Price className="event-card-price">{`${
        event.ticket_info.price ? `From $${event.ticket_info.price}` : "Free"
      }`}</Price>
      <Organizer className="event-card-organizer">{event.organizer}</Organizer>
    </FlexColumn.StartStart>
  </CardContainer>
);

export default EventCard;

import { FC } from "react";

import MainLayout from "@/components/Layout/Main";
import EventView from "@/views/Event";

interface EventPageProps {
  params: {
    event_slug: string;
  };
}

const EventPage: FC<EventPageProps> = ({ params }) => (
  <MainLayout>
    <EventView slug={params.event_slug} />
  </MainLayout>
);

export default EventPage;

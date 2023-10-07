import { FC } from "react";

import MainLayout from "@/components/Layout/Main";
import HomeView from "@/views/Home";

const HomePage: FC = () => (
  <MainLayout>
    <HomeView />
  </MainLayout>
);

export default HomePage;

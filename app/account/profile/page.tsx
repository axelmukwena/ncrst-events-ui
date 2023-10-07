import { FC } from "react";

import MainLayout from "@/components/Layout/Main";
import UserProfileView from "@/views/UserProfile";

const ProfilePage: FC = () => (
  <MainLayout>
    <UserProfileView />
  </MainLayout>
);

export default ProfilePage;

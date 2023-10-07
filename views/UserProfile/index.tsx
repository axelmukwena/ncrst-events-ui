"use client";

import { FC } from "react";
import styled from "styled-components";

import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import LoadingCircularSection from "@/components/Loaders/LoadingSection";
import useCurrentUser from "@/hooks/useCurrentUser";
import { color } from "@/utilities/color";
import { size } from "@/utilities/size";

import NotFound from "../NotFound";
import UserSidebar from "../Event/UserSidebar";
import ApiSettings from "./ApiSettings";
import ProfileForm from "./ProfileForm";

export const ProfileSectionContainer = styled(FlexColumn.StartStart)({
  padding: "40px",
  borderLeft: `1px solid ${color.gray300}`,
  minHeight: "calc(100vh - var(--header-height))",
  height: "100%",
});

export const ProfileTitle = styled.div({
  color: color.black,
  fontSize: size[19],
  fontWeight: 900,
  letterSpacing: "-0.1px",
});

const UserProfileView: FC = () => {
  const { currentUser, currentUserLoading } = useCurrentUser();

  if (currentUserLoading) {
    return <LoadingCircularSection size={30} />;
  }

  if (!currentUser) {
    return <NotFound name="User" />;
  }

  return (
    <FlexRow.StartStart gap={20} className="user-profile-view">
      <UserSidebar user={currentUser} />

      <FlexRow.StartStart>
        <ProfileForm user={currentUser} />
        <ApiSettings />
      </FlexRow.StartStart>
    </FlexRow.StartStart>
  );
};

export default UserProfileView;

import { FC } from "react";

import { FlexColumn } from "@/components/Elements/DisplayFlex";

import { ProfileSectionContainer, ProfileTitle } from "..";
import CopyToken from "./CopyToken";
import RevokeApiKey from "./RevokeApiKey";

const ApiSettings: FC = () => (
  <ProfileSectionContainer
    gap={35}
    style={{ width: "35%" }}
    className="api-settings"
  >
    <ProfileTitle>API Settings</ProfileTitle>
    <FlexColumn.StartStart gap={20}>
      <CopyToken />
      <RevokeApiKey />
    </FlexColumn.StartStart>
  </ProfileSectionContainer>
);

export default ApiSettings;

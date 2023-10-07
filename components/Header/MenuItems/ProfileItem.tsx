import {
  IconLogout,
  IconShieldCheckFilled,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { FC, useState } from "react";
import { styled } from "styled-components";

import ClickAwayListener from "@/components/ClickAwayListener";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import HorizonalLine from "@/components/Elements/Lines/HorizonalLine";
import UserAvatar from "@/components/UserAvatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { color } from "@/utilities/color";
import { LocalUrl } from "@/utilities/constants";
import { roleToText } from "@/utilities/helpers/text";
import { size } from "@/utilities/size";

const ProfileSectionWrapper = styled.div({
  position: "relative",
});

const ProfileIcon = styled.div({});

const DropdownWrapper = styled.div({
  position: "absolute",
  zIndex: 2000,
  padding: "15px",
  top: "30px",
  right: "-10px",
  backgroundColor: "transparent",
});

const DropdownMenuContainer = styled(FlexColumn.StartCenter)({
  marginTop: "10px",
  minWidth: "256px",
  width: "auto",
  backgroundColor: color.white,
  border: `1px solid ${color.gray150}`,
  boxShadow: "0 4px 16px #0000001a",
  borderRadius: "4px",
  transition: "top 2s ease-in,opacity 2s ease-in",
});

const ProfileMenuContainer = styled(FlexColumn.StartCenter)({
  gap: "6px",
  padding: "14px",
});

const MenuListItem = styled(FlexRow.StartCenter)({
  padding: "8px 12px",
  borderRadius: "4px",
  gap: "14px",
  "&:hover": {
    backgroundColor: color.gray100,
  },
});

const MenuName = styled.p({
  width: "100%",
  fontSize: size[13],
  fontWeight: 600,
  color: color.gray650,
});

const UserName = styled.p({
  fontSize: size[16],
  fontWeight: 500,
  lineHeight: size[22],
});

const UserEmail = styled.p({
  fontSize: size[13],
  fontWeight: 400,
  lineHeight: size[18],
});

const UserRole = styled.p({
  fontWeight: 700,
  color: color.gray700,
});

const menus = [
  { name: "Manage Profile", icon: IconUser, slug: LocalUrl.USER_PROFILE },
  { name: "Sign out", icon: IconLogout, slug: LocalUrl.SIGN_OUT },
];

const ProfileItem: FC = () => {
  const { currentUser } = useCurrentUser();
  const [open, setOpen] = useState<boolean>(false);

  const profileDropdownId = "profile-dropdown-menu";

  const handleMouseLeave = (): void => {
    const element = document.getElementById(profileDropdownId);
    if (element?.parentNode?.querySelector(":hover") === element) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <ProfileSectionWrapper className="profile-section">
        <ProfileIcon
          aria-label="Profile"
          onClick={(): void => setOpen(true)}
          onMouseEnter={(): void => setOpen(true)}
          onMouseLeave={handleMouseLeave}
        >
          <UserAvatar user={currentUser} size="xs" />
        </ProfileIcon>
        {open && (
          <ClickAwayListener onClickAway={(): void => setOpen(false)}>
            <DropdownWrapper
              onMouseLeave={(): void => setOpen(false)}
              id={profileDropdownId}
            >
              <DropdownMenuContainer>
                <ProfileMenuContainer className="profile-menu-container">
                  <FlexRow.StartCenter
                    gap={12}
                    className="user-info"
                    style={{ marginBottom: "14px" }}
                  >
                    <UserAvatar user={currentUser} size="xs" />
                    <FlexColumn.StartStart>
                      <UserName className="user-fullname">{`${currentUser.first_name} ${currentUser.last_name}`}</UserName>
                      <UserEmail className="user-email">
                        {currentUser.email}
                      </UserEmail>
                    </FlexColumn.StartStart>
                  </FlexRow.StartCenter>

                  <HorizonalLine />

                  <FlexRow.StartCenter gap={12} style={{ padding: "8px 12px" }}>
                    <IconShieldCheckFilled size={22} stroke={1.5} />
                    <UserRole className="user-role">
                      {roleToText(currentUser.roles[0]) || "Custom Role"}
                    </UserRole>
                  </FlexRow.StartCenter>

                  <HorizonalLine />

                  {menus.map((menu) => (
                    <Link
                      key={menu.name}
                      href={menu.slug}
                      style={{ width: "100%" }}
                    >
                      <MenuListItem>
                        <menu.icon
                          size={20}
                          stroke={1.5}
                          color={color.gray650}
                        />
                        <MenuName>{menu.name}</MenuName>
                      </MenuListItem>
                    </Link>
                  ))}
                </ProfileMenuContainer>
              </DropdownMenuContainer>
            </DropdownWrapper>
          </ClickAwayListener>
        )}
      </ProfileSectionWrapper>
    </>
  );
};

export default ProfileItem;

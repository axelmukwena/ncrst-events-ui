import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

import { FlexRow } from "@/components/Elements/DisplayFlex";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AUTH_MENU_ITEMS, MENU_ITEMS } from "@/utilities/constants";

import ProfileItem from "./ProfileItem";

const MenuItem = styled(Link)({
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
});

const MenuItems: FC = () => {
  const { currentUser, currentUserLoading } = useCurrentUser();

  return (
    <FlexRow.EndCenter gap={8} className="right-wrapper">
      {MENU_ITEMS.map((item) => (
        <MenuItem href={item.url} key={item.name}>
          {item.name}
        </MenuItem>
      ))}
      {!(currentUserLoading || currentUser) && (
        <>
          {AUTH_MENU_ITEMS.map((item) => (
            <MenuItem href={item.url} key={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </>
      )}
      {currentUser && <ProfileItem />}
    </FlexRow.EndCenter>
  );
};

export default MenuItems;

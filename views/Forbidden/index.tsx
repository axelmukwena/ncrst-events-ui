"use client";

import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

import { SecondaryButton } from "@/components/Elements/Buttons";
import { FlexColumn } from "@/components/Elements/DisplayFlex";
import VerticalLogo from "@/components/Logo/VerticalLogo";
import useCurrentUser from "@/hooks/useCurrentUser";
import { color } from "@/utilities/color";

const Container = styled(FlexColumn.CenterCenter)({
  minHeight: "calc(100vh - var(--header-height))",
  height: "100%",
});

const Text = styled.p({
  width: "300px",
  fontSize: "15px",
  fontWeight: 500,
  color: color.gray650,
  textAlign: "center",
});

const ForbiddenView: FC = () => {
  const { currentUser } = useCurrentUser();
  return (
    <Container gap={30}>
      <VerticalLogo />
      <Text>
        You don't have the necessary permissions to access. Please contact the
        system administrator for more information.
      </Text>

      {currentUser && (
        <FlexColumn.CenterCenter gap={10}>
          <Text style={{ color: color.gray800 }}>
            You are logged in as <strong>{currentUser.email}</strong>
          </Text>
          <Link href="/logout">
            <SecondaryButton style={{ width: "auto" }}>
              Sign out
            </SecondaryButton>
          </Link>
        </FlexColumn.CenterCenter>
      )}
    </Container>
  );
};

export default ForbiddenView;

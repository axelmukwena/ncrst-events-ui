"use client";

import "firebase/compat/auth";
import "firebase/compat/firestore";

import firebase from "firebase/compat/app";
import Link from "next/link";
import React, { FC, useCallback, useEffect } from "react";
import styled from "styled-components";

import { FlexColumn } from "@/components/Elements/DisplayFlex";
import VerticalLogo from "@/components/Logo/VerticalLogo";
import { color } from "@/utilities/color";
import { LocalUrl } from "@/utilities/constants";

const PageContainer = styled(FlexColumn.CenterCenter)({
  minHeight: "100vh",
  height: "100%",
  textAlign: "center",
});

const Text = styled.p({
  width: "300px",
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray650,
});

interface FirebaseViewProps {
  previousPath?: string;
}

const FirebaseView: FC<FirebaseViewProps> = ({ previousPath = "/" }) => {
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: previousPath,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  const loadFirebaseui = useCallback(async () => {
    const firebaseui = await import("firebaseui");
    const firebaseUi =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    firebaseUi.start("#firebaseui-auth-container", uiConfig);
  }, [firebase, uiConfig]);

  useEffect(() => {
    loadFirebaseui();
  }, []);

  return (
    <PageContainer gap={30}>
      <VerticalLogo />
      <FlexColumn.CenterCenter gap={10}>
        <Text>Please sign in to continue</Text>
        <FlexColumn.CenterCenter gap={5}>
          <div id="firebaseui-auth-container"></div>
          <Link href={LocalUrl.FORGOT_PASSWORD}>
            <Text>Forgot your password?</Text>
          </Link>
        </FlexColumn.CenterCenter>
      </FlexColumn.CenterCenter>
    </PageContainer>
  );
};

export default FirebaseView;

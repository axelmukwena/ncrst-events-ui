"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  FC,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";

import { initAuth } from "@/backend/service/firebase";
import ProfileNoAuthService from "@/backend/service/profile/profileNoAuth.service";
import {
  ButtonRoundIcon,
  PrimaryButton,
  SecondaryButton,
} from "@/components/Elements/Buttons";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import { FormErrorMessage } from "@/components/Elements/General";
import HorizontalLineWithSplit from "@/components/Elements/Lines/HorizontalLineWithSplit";
import TextField from "@/components/Elements/TextField";
import { GoogleIcon } from "@/components/Icons/GoogleIcon";
import CircularLoader from "@/components/Loaders/CircularLoader";
import LinearLoader from "@/components/Loaders/LinearLoader";
import VerticalLogo from "@/components/Logo/VerticalLogo";
import useCurrentUser from "@/hooks/useCurrentUser";
import { notificationState } from "@/store/notification";
import { color } from "@/utilities/color";
import { LocalUrl } from "@/utilities/constants";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";

const Container = styled(FlexColumn.CenterCenter)({
  minHeight: "calc(100vh - var(--header-height))",
  height: "100%",
  textAlign: "center",
});

const Text = styled.p({
  width: "300px",
  fontSize: "15px",
  fontWeight: 700,
  color: color.gray800,
});

const Caption = styled.p({
  width: "300px",
  fontSize: "13px",
  fontWeight: 500,
  color: color.gray650,
});

const FormContainer = styled.form({
  width: "300px",
});

const SubmitButton = styled(PrimaryButton)({
  height: "50px",
  width: "300px",
});

const GoogleButton = styled(SecondaryButton)({
  height: "50px",
  width: "300px",
  fontWeight: 500,
  backgroundColor: color.white,
  color: color.gray800,
  "&:hover": {
    backgroundColor: color.gray100,
  },
});

const TextFieldWrapper = styled(FlexColumn.StartStart)({
  position: "relative",
});

const ToggleShowPassword = styled(ButtonRoundIcon)({
  position: "absolute",
  right: "6px",
  top: "8px",
});

interface ControllerField {
  field: FieldValues;
}

export type ActivateAccountName = "email";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.!$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d@$!%*?&.!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      PASSWORD_REGEX,
      "Please enter a valid password. Minimum eight characters, at least one letter, one number and one special character"
    ),
});

const ActivateAccountView: FC = () => {
  const auth = initAuth();
  const { currentUser, currentUserLoading } = useCurrentUser();
  const [, setNotification] = useRecoilState(notificationState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    control,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (currentUser) {
      router.push(LocalUrl.HOME);
    }
  }, [currentUser]);

  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, []);

  const onSubmit = async (): Promise<void> => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    const token = searchParams.get("token") || "";
    if (!token) {
      setNotification({
        message:
          "Cannot reset password your account at the moment! Try again later or contact support.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    const { password } = getValues();
    const profileService = new ProfileNoAuthService();
    const res = await profileService.setNewPassword({ password, token });
    if (res.success) {
      setNotification({
        message: "Password reset successfully!",
        type: "success",
      });
      setIsSubmitting(false);
      setTimeout(() => {
        router.push(LocalUrl.SIGN_IN);
      }, 3000);
    } else {
      setNotification({ message: res.message, type: "error" });
    }
    setIsSubmitting(false);
  };

  const handleSignInWithGoogle = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!auth) return;

    setIsSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      setIsSubmitting(false);
      if (user) {
        router.push(LocalUrl.HOME);
      } else {
        setNotification({
          message: "Cannot sign in with Google at the moment!",
          type: "error",
        });
      }
    } catch (error) {
      const message = getErrorMessage(error);
      setNotification({ message, type: "error" });
    }
    setIsSubmitting(false);
  };

  if (currentUserLoading) {
    return <LinearLoader />;
  }

  if (currentUser) {
    return null;
  }

  return (
    <Container gap={30}>
      <VerticalLogo />
      <FlexColumn.CenterCenter gap={10}>
        <Text>Activate your account</Text>
        {email && (
          <Caption>
            Assign a password and activate your <strong>{email}</strong> account
          </Caption>
        )}
      </FlexColumn.CenterCenter>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FlexColumn.CenterCenter gap={20}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }: ControllerField): ReactElement => (
              <TextFieldWrapper>
                <TextField
                  type={showPassword ? "text" : "password"}
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label="New Password"
                  required
                  iconRight
                />
                <ToggleShowPassword
                  type="button"
                  onClick={(): void => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IconEye size={20} color={color.gray600} />
                  ) : (
                    <IconEyeOff size={20} color={color.gray600} />
                  )}
                </ToggleShowPassword>
                {errors.password?.message && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </TextFieldWrapper>
            )}
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {!isSubmitting && "Activate your account"}
            {isSubmitting && (
              <FlexRow.CenterCenter gap={10}>
                <div>Activating</div>
                <CircularLoader color={color.white} />
              </FlexRow.CenterCenter>
            )}
          </SubmitButton>
        </FlexColumn.CenterCenter>
      </FormContainer>
      <HorizontalLineWithSplit width="300px">
        <Caption style={{ width: "auto" }}>Or</Caption>
      </HorizontalLineWithSplit>
      <GoogleButton onClick={handleSignInWithGoogle}>
        <FlexRow.CenterCenter gap={15}>
          <GoogleIcon />
          Sign in with Google
        </FlexRow.CenterCenter>
      </GoogleButton>
    </Container>
  );
};

export default ActivateAccountView;

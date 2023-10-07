"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC, ReactElement, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";

import ProfileNoAuthService from "@/backend/service/profile/profileNoAuth.service";
import { ButtonRoundIcon, PrimaryButton } from "@/components/Elements/Buttons";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import { FormErrorMessage } from "@/components/Elements/General";
import TextField from "@/components/Elements/TextField";
import CircularLoader from "@/components/Loaders/CircularLoader";
import LinearLoader from "@/components/Loaders/LinearLoader";
import VerticalLogo from "@/components/Logo/VerticalLogo";
import useCurrentUser from "@/hooks/useCurrentUser";
import { notificationState } from "@/store/notification";
import { color } from "@/utilities/color";
import { LocalUrl } from "@/utilities/constants";

const Container = styled(FlexColumn.CenterCenter)({
  minHeight: "calc(100vh - var(--header-height))",
  height: "100%",
  textAlign: "center",
});

const Text = styled.p({
  width: "300px",
  fontSize: "15px",
  fontWeight: 600,
  color: color.gray650,
});

const Caption = styled.p({
  width: "300px",
  fontSize: "12px",
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

export type SetNewPasswordName = "email";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.!$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d@$!%*?&.!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      PASSWORD_REGEX,
      "Please enter a valid password. Minimum eight characters, at least one letter, one number and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

const SetNewPasswordView: FC = () => {
  const { firebaseUser, currentUserLoading } = useCurrentUser();
  const [, setNotification] = useRecoilState(notificationState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const onSubmit = async (): Promise<void> => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    let token = "";
    if (firebaseUser) {
      token = (await firebaseUser?.getIdToken()) || "";
      if (!token) {
        setNotification({
          message:
            "Cannot reset password your account at the moment! Try again later or contact support.",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }
    } else {
      token = searchParams.get("token") || "";
      if (!token) {
        setNotification({
          message:
            "Cannot reset password your account at the moment! Try again later or contact support.",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }
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
        router.push(LocalUrl.LOG_IN);
      }, 3000);
    } else {
      setNotification({ message: res.message, type: "error" });
    }
    setIsSubmitting(false);
  };

  if (currentUserLoading) {
    return <LinearLoader />;
  }

  return (
    <Container gap={30}>
      <VerticalLogo />
      <Text>Reset your password</Text>
      <Caption>Enter your new password and confirm it to reset.</Caption>
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
          <Controller
            name="confirmPassword"
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
                  label="Confirm Password"
                  required
                  iconRight
                />
                {errors.confirmPassword?.message && (
                  <FormErrorMessage>
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
              </TextFieldWrapper>
            )}
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {!isSubmitting && "Reset Password"}
            {isSubmitting && (
              <FlexRow.CenterCenter gap={10}>
                <div>Reseting your password</div>
                <CircularLoader color={color.white} />
              </FlexRow.CenterCenter>
            )}
          </SubmitButton>
        </FlexColumn.CenterCenter>
      </FormContainer>
    </Container>
  );
};

export default SetNewPasswordView;

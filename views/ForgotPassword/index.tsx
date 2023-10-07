"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { FC, ReactElement, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import isEmail from "validator/lib/isEmail";
import * as Yup from "yup";

import ProfileNoAuthService from "@/backend/service/profile/profileNoAuth.service";
import { PrimaryButton } from "@/components/Elements/Buttons";
import { FlexColumn } from "@/components/Elements/DisplayFlex";
import { FormErrorMessage } from "@/components/Elements/General";
import TextField from "@/components/Elements/TextField";
import CircularLoader from "@/components/Loaders/CircularLoader";
import VerticalLogo from "@/components/Logo/VerticalLogo";
import useCurrentUser from "@/hooks/useCurrentUser";
import { notificationState } from "@/store/notification";
import { color } from "@/utilities/color";

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

interface ControllerField {
  field: FieldValues;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .test("is-valid", "Email is invalid", (value) => isEmail(value)),
});

const ForgotPasswordView: FC = () => {
  const { currentUser, currentUserLoading } = useCurrentUser();
  const [, setNotification] = useRecoilState(notificationState);
  const [submited, setSubmited] = useState<boolean>(false);
  const router = useRouter();

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
    setSubmited(false);
    const { email } = getValues();
    const profileService = new ProfileNoAuthService();
    const res = await profileService.requestResetPassword({ email });
    if (res.success) {
      setSubmited(true);
    } else {
      setNotification({ message: res.message, type: "error" });
    }
  };

  if (currentUserLoading) {
    return <CircularLoader />;
  }

  if (currentUser) {
    router.push("/");
    return null;
  }

  return (
    <Container gap={30} className="forgot-password-view">
      <VerticalLogo />
      <FlexColumn.CenterCenter gap={6} className="forgot-password-view-text">
        <Text>Forgot your password?</Text>
        <Caption>
          Enter your email address below and we'll send you instructions on how
          to reset it.
        </Caption>
      </FlexColumn.CenterCenter>

      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        className="form-container"
      >
        <FlexColumn.CenterCenter gap={20}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }: ControllerField): ReactElement => (
              <FlexColumn.StartStart>
                <TextField
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label="Email"
                  required
                />
                {errors.email?.message && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FlexColumn.StartStart>
            )}
          />

          {!submited && (
            <SubmitButton type="submit">Reset Password</SubmitButton>
          )}
          {submited && (
            <div style={{ color: color.green700 }}>
              <IconCircleCheckFilled size={30} />
            </div>
          )}
        </FlexColumn.CenterCenter>
      </FormContainer>
    </Container>
  );
};

export default ForgotPasswordView;

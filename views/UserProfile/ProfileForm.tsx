import { yupResolver } from "@hookform/resolvers/yup";
import React, { ReactElement, useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { styled } from "styled-components";
import * as Yup from "yup";

import { ProfileService } from "@/backend/service/profile/profile.service";
import { UpdateProfileBody } from "@/backend/service/profile/types";
import { User } from "@/backend/service/user/types";
import Avatar from "@/components/Avatar";
import { PrimaryButton } from "@/components/Elements/Buttons";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import DropdownField from "@/components/Elements/DropdownField";
import {
  FormErrorMessage,
  FormSuccessMessage,
} from "@/components/Elements/General";
import TextField from "@/components/Elements/TextField";
import CircularLoader from "@/components/Loaders/CircularLoader";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Language } from "@/types/services";
import { color } from "@/utilities/color";
import { LANGUAGE_OPTIONS } from "@/utilities/constants";
import { validatePhoneNumber } from "@/utilities/helpers/validations";
import { size } from "@/utilities/size";

import { ProfileSectionContainer, ProfileTitle } from ".";

const FormContainer = styled.form({
  width: "100%",
});

export const DialofTitle = styled.div({
  color: color.black,
  fontSize: size[19],
  fontWeight: 900,
  letterSpacing: "-0.1px",
  padding: "0 20px",
});

const FieldWrapper = styled(FlexColumn.StartStart)({});

interface ProfileFormProps {
  user: User | null;
}

interface ControllerField {
  field: FieldValues;
}

type UserProfileSchema = {
  phone_number?: string;
  photo_url?: string;
  first_name: string;
  last_name: string;
  language: string;
};

export type FormName =
  | "first_name"
  | "last_name"
  | "phone_number"
  | "photo_url"
  | "language";

const schema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string()
    .optional()
    .test("is-valid", "Phone number is invalid", (value) => {
      if (!value) return true;
      return validatePhoneNumber(value);
    }),
  photo_url: Yup.string().optional(),
  language: Yup.string().required("Language is required"),
});

const ProfileForm = ({ user }: ProfileFormProps): ReactElement => {
  const { firebaseUser, currentUser } = useCurrentUser();
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    getValues,
    setValue,
    setError,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<UserProfileSchema>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleUser = (): void => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("phone_number", user.phone_number || "");
      setValue("language", user.language);

      let photpUrl = user.photo_url || "";
      if (!photpUrl) {
        photpUrl =
          user.provider_data.find((provider) => provider.photo_url)
            ?.photo_url || "";
      }
      setValue("photo_url", photpUrl);
    }
  };

  useEffect(() => {
    handleUser();
  }, [user]);

  const onSubmit = async (): Promise<void> => {
    setSubmitSuccess("");
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    if (!currentUser || !firebaseUser) {
      return;
    }
    const token = await firebaseUser.getIdToken();
    const profileService = new ProfileService(token);
    const data: UpdateProfileBody = {
      uid: currentUser.uid,
      first_name: getValues("first_name"),
      last_name: getValues("last_name"),
      phone_number: getValues("phone_number") || null,
      photo_url: getValues("photo_url") || null,
      language: getValues("language") as Language,
    };
    const res = await profileService.update(data);
    if (res.success) {
      setSubmitSuccess("Profile updated successfully");
    } else {
      setSubmitError(res.message);
    }
    setIsSubmitting(false);
  };

  return (
    <ProfileSectionContainer
      gap={35}
      style={{ width: "65%", backgroundColor: color.gray20 }}
      className="form-section"
    >
      <ProfileTitle>My Profile</ProfileTitle>
      <FormContainer
        onSubmit={(e): void => {
          e.preventDefault();
          setSubmitSuccess("");
          setSubmitError("");
          handleSubmit(onSubmit)();
        }}
        className="profile-form"
      >
        <FlexColumn.StartStart gap={20}>
          <Controller
            name="first_name"
            control={control}
            defaultValue=""
            render={({ field }: ControllerField): ReactElement => (
              <FieldWrapper>
                <TextField
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label="First Name"
                  required
                />
                {errors.first_name?.message && (
                  <FormErrorMessage>
                    {errors.first_name.message}
                  </FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />

          <Controller
            name="last_name"
            control={control}
            defaultValue=""
            render={({ field }: ControllerField): ReactElement => (
              <FieldWrapper>
                <TextField
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label="Last Name"
                  required
                />
                {errors.last_name?.message && (
                  <FormErrorMessage>
                    {errors.last_name.message}
                  </FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />

          <Controller
            name="language"
            control={control}
            defaultValue=""
            render={({ field }: ControllerField): ReactElement => (
              <FieldWrapper>
                <DropdownField
                  label="User Language"
                  optionsValues={LANGUAGE_OPTIONS}
                  defaultOptionValue={LANGUAGE_OPTIONS.find(
                    (option) => option.value === field.value
                  )}
                  name="language"
                  required
                  setValue={setValue}
                  setError={setError}
                />
                {errors.language?.message && (
                  <FormErrorMessage>{errors.language.message}</FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />

          <Controller
            name="phone_number"
            control={control}
            defaultValue=""
            render={({ field }: ControllerField): ReactElement => (
              <FieldWrapper>
                <TextField
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label="Full Phone Number"
                />
                {errors.phone_number?.message && (
                  <FormErrorMessage>
                    {errors.phone_number.message}
                  </FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />

          <Controller
            name="photo_url"
            control={control}
            defaultValue=""
            render={({ field }: ControllerField): ReactElement => (
              <FieldWrapper>
                <FlexRow.StartCenter gap={20}>
                  <TextField
                    name={field.name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    label="Photo Url"
                  />
                  {field.value && <Avatar size="md" src={field.value} />}
                </FlexRow.StartCenter>
                {errors.photo_url?.message && (
                  <FormErrorMessage>
                    {errors.photo_url.message}
                  </FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />
        </FlexColumn.StartStart>

        <FlexRow.EndCenter gap={20} style={{ marginTop: "20px" }}>
          <PrimaryButton type="submit" style={{ height: "50px" }}>
            {!isSubmitting && "Update"}
            {isSubmitting && (
              <FlexRow.CenterCenter gap={10}>
                <div>Updating</div>
                <CircularLoader color={color.white} />
              </FlexRow.CenterCenter>
            )}
          </PrimaryButton>
        </FlexRow.EndCenter>

        {(submitError || submitSuccess) && (
          <FlexColumn.CenterEnd style={{ marginTop: "10px" }}>
            {submitError && <FormErrorMessage>{submitError}</FormErrorMessage>}
            {submitSuccess && (
              <FormSuccessMessage style={{ color: color.gray650 }}>
                {submitSuccess}
              </FormSuccessMessage>
            )}
          </FlexColumn.CenterEnd>
        )}
      </FormContainer>
    </ProfileSectionContainer>
  );
};

export default ProfileForm;

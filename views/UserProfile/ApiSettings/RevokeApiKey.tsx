import { FC, useState } from "react";
import styled from "styled-components";

import { ProfileService } from "@/backend/service/profile/profile.service";
import DialogCenter from "@/components/Dialogs/DialogCenter";
import { RedButton, SecondaryButton } from "@/components/Elements/Buttons";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import { FormErrorMessage } from "@/components/Elements/General";
import CircularLoader from "@/components/Loaders/CircularLoader";
import useCurrentUser from "@/hooks/useCurrentUser";
import { color } from "@/utilities/color";
import { downloadApiKey } from "@/utilities/helpers/downloadApiKey";

const TitleText = styled.p({
  fontSize: "15px",
  fontWeight: 700,
  color: color.gray800,
  textAlign: "center",
});

const MessageText = styled.p({
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray650,
  textAlign: "center",
});

const RevokeButton = styled(SecondaryButton)({
  height: "50px",
  "&:hover": {
    backgroundColor: color.red500,
    color: color.white,
  },
});

const defaultMessage =
  "Are you sure you wish to revoke the current API key and generate a new one? This action will invalidate all existing tokens associated with the current key.";
const successMessage =
  "A new API key has been created and downloaded. Please save it and store it securely as we don't store any keys.";

const RevokeApiKey: FC = () => {
  const { firebaseUser, currentUser } = useCurrentUser();
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>(defaultMessage);

  const handleClose = (): void => {
    setError("");
    setMessage(defaultMessage);
    setIsSubmitting(false);
    setOpen(!open);
  };

  const onSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    setError("");
    if (!currentUser || !firebaseUser) {
      return;
    }
    const token = await firebaseUser?.getIdToken();
    const profileService = new ProfileService(token);
    const res = await profileService.revokeApiKey({ uid: currentUser.uid });
    if (res.api_key) {
      downloadApiKey(res.api_key);
      setMessage(successMessage);
    } else {
      setError(res.message);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <RevokeButton onClick={handleClose} style={{ height: "50px" }}>
        Revoke API Key
      </RevokeButton>
      <DialogCenter
        open={open}
        handleClose={handleClose}
        contentClassName="delete-user-dialog-content"
      >
        <FlexColumn.CenterCenter gap={20}>
          <TitleText>Revoke API Key</TitleText>
          <MessageText>{message}</MessageText>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
          <FlexRow.CenterCenter gap={20} style={{ marginTop: "10px" }}>
            <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
            <RedButton type="submit" onClick={onSubmit}>
              {!isSubmitting && "Revoke"}
              {isSubmitting && (
                <FlexColumn.CenterCenter>
                  <CircularLoader />
                </FlexColumn.CenterCenter>
              )}
            </RedButton>
          </FlexRow.CenterCenter>
        </FlexColumn.CenterCenter>
      </DialogCenter>
    </>
  );
};

export default RevokeApiKey;

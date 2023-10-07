import { FC, useState } from "react";

import { PrimaryButton } from "@/components/Elements/Buttons";
import { FlexColumn } from "@/components/Elements/DisplayFlex";
import { FormErrorMessage } from "@/components/Elements/General";
import useCurrentUser from "@/hooks/useCurrentUser";
import { copyTextToClipboard } from "@/utilities/helpers/copyTextToClipboard";

const CopyToken: FC = () => {
  const { firebaseUser } = useCurrentUser();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCopyApiToken = async (): Promise<void> => {
    if (!firebaseUser) {
      return;
    }

    const token = await firebaseUser.getIdToken();
    if (!token) {
      setError("Token not found, please try again!");
      return;
    }
    await copyTextToClipboard(token);

    setSuccess("Copied!");
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return (
    <FlexColumn.StartStart>
      <PrimaryButton onClick={handleCopyApiToken} style={{ height: "50px" }}>
        {!success && "Copy ID token"}
        {success && "Copied!"}
      </PrimaryButton>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FlexColumn.StartStart>
  );
};

export default CopyToken;

import { FC, useEffect, useState } from "react";

import { User } from "@/backend/service/user/types";

import Avatar, { AvatarSizes } from "./Avatar";

interface UserAvatarProps {
  user: User;
  size: AvatarSizes;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, size }) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [initials, setInitials] = useState<string>("");
  const [alt, setAlt] = useState<string>("");

  const setAvatarContent = (): void => {
    if (!user) {
      return;
    }

    if (user.photo_url) {
      setImageSrc(user.photo_url);
    } else {
      const providerDataPhotoUrl = user.provider_data?.find(
        (provider) => provider.photo_url
      )?.photo_url;
      setImageSrc(providerDataPhotoUrl || "");
    }

    const { first_name: firstName, last_name: lastName } = user;
    const firstInitial = firstName?.charAt(0).toUpperCase();
    const lastInitial = lastName?.charAt(0).toUpperCase();
    setInitials(`${firstInitial}${lastInitial}`);

    setAlt(`${firstName} ${lastName}`);
  };

  useEffect(() => {
    setAvatarContent();
  }, [user]);

  return <Avatar size={size} src={imageSrc} initials={initials} alt={alt} />;
};

export default UserAvatar;

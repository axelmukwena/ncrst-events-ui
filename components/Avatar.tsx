import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";

import { color } from "@/utilities/color";

import { FlexRow } from "./Elements/DisplayFlex";

export type AvatarSizes = "xs" | "sm" | "md" | "lg";

const avatarSize: Record<
  AvatarSizes,
  { width: number; height: number; fontSize: string; borderSize?: string }
> = {
  xs: { width: 32, height: 32, fontSize: "12px" },
  sm: { width: 40, height: 40, fontSize: "12px" },
  md: { width: 48, height: 48, fontSize: "14px" },
  lg: { width: 60, height: 60, fontSize: "14px", borderSize: "1.5px" },
};

const AvatarContainer = styled(FlexRow.CenterCenter)<{ size: AvatarSizes }>(
  ({ size }) => ({
    borderRadius: "100%",
    border: "0 solid",
    width: `${avatarSize[size].width}px`,
    height: `${avatarSize[size].height}px`,
    backgroundColor: color.gray300,
    color: color.gray800,
    fontSize: avatarSize[size].fontSize,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: color.gray400,
      cursor: "pointer",
    },
  })
);

const AvatarImage = styled(Image)<{ size: AvatarSizes }>(({ size }) => ({
  height: avatarSize[size].height,
  width: avatarSize[size].width,
  borderRadius: "100%",
  objectFit: "cover",
}));

export const Initials = styled.div<{ size: AvatarSizes }>(({ size }) => ({
  width: `${avatarSize[size].width}px`,
  textAlign: "center",
}));

interface AvatarProps {
  size: AvatarSizes;
  src?: string;
  alt?: string;
  initials?: string;
}

const Avatar: FC<AvatarProps> = ({ size, src: srcRaw, alt, initials }) => {
  let src = "";
  try {
    if (srcRaw) {
      src = new URL(srcRaw).pathname;
      src = srcRaw;
    }
  } catch (error) {
    // do nothing
  }

  return (
    <AvatarContainer size={size} className="avatar">
      {src && (
        <AvatarImage
          size={size}
          src={src}
          alt={alt || "avatar"}
          width={avatarSize[size]?.width || avatarSize.sm.width}
          height={avatarSize[size]?.height || avatarSize.sm.height}
          className="avatar-image"
        />
      )}
      {initials && !src && (
        <Initials size={size} className="avatar-initials">
          {initials}
        </Initials>
      )}
      {!initials && !src && (
        <Initials
          size={size}
          className="avatar-initials"
          style={{ color: color.red500, fontWeight: 900 }}
        >
          ??
        </Initials>
      )}
    </AvatarContainer>
  );
};

export default Avatar;

import { FC } from "react";

interface AvatarProps {
  url: string;
  alt: string;
}

export const Avatar: FC<AvatarProps> = ({ url, alt }) => {
  return (
    <img src={url} alt={alt} title={alt} className="h-12 w-12 rounded-full" />
  );
};

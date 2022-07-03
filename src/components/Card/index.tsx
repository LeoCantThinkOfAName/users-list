import { FC, HTMLProps, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {}

export const Card: FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={`bg-white border my-2 mx-2 p-4 rounded-md shadow-md hover:shadow-none w-full ${className}`}
    >
      {children}
    </div>
  );
};

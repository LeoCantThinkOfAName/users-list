import { FC, PropsWithChildren } from "react";

interface BadgeProps extends PropsWithChildren {
  title?: string;
  color?: string;
  show?: boolean;
}

export const Badge: FC<BadgeProps> = ({ children, title, color, show }) => {
  return (
    <div className="relative inline-block">
      {children}
      {show && (
        <span
          className="absolute h-4 w-4 block bottom-0 right-0 rounded-full border-white border-2"
          title={title}
          style={{
            backgroundColor: color,
          }}
        />
      )}
    </div>
  );
};

Badge.defaultProps = {
  color: "#1e89e1",
  title: "",
  show: true,
};

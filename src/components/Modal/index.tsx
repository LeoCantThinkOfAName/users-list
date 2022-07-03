import { FC } from "react";
import { createPortal } from "react-dom";
import { useUserQuery } from "../../api";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import { Card } from "../Card";

interface ModalProp {
  open: boolean;
  userName?: string;
  onClose: () => unknown;
}

export const Modal: FC<ModalProp> = ({ open, userName, onClose }) => {
  const { data, isFetching, isError } = useUserQuery(userName);
  const modal = (
    <div
      className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card className="relative">
        {isError && <div className="flex jus">Something wend wrong..."</div>}
        {isFetching && <div className="flex jus">Loading...</div>}
        {data && (
          <>
            <div className="flex items-center">
              <Badge show={data.site_admin} title="Site Admin">
                <Avatar url={data.avatar_url} alt={data.name} />
              </Badge>
              <div className="ml-4 leading-5">
                <p>
                  {data.name}{" "}
                  <span className="text-gray-400">({data.login})</span>
                </p>
                <small className="text-gray-500">@{data.location}</small>
                <br />
                <a
                  className="text-blue-500 text-xs"
                  href={data.blog}
                  rel="noreferrer noopener"
                >
                  {data.blog}
                </a>
              </div>
            </div>
            <hr className="my-2" />
            <div>
              <h3 className="text-lg">Bio</h3>
              {data.bio ? (
                <p>{data.bio}</p>
              ) : (
                <p className="text-gray-400">This user doesn't have bio</p>
              )}
            </div>
            <button
              title="close"
              className="absolute top-2 right-2 text-xs text-gray-400"
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}
      </Card>
    </div>
  );
  return open ? createPortal(modal, document.body) : null;
};

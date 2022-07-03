import { useState } from "react";
import { useUsersQuery } from "./api";
import { Avatar } from "./components/Avatar";
import { Badge } from "./components/Badge";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal";

const App = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const {
    data: usersData,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useUsersQuery();

  return (
    <div>
      <div className="flex flex-col items-center max-w-sm mx-auto py-4">
        {isFetching && "Loading..."}
        {usersData?.pages.flat().map((page) => {
          return page.users.map((user) => (
            <Card
              key={user.id}
              onClick={() => {
                setUserName(user.login);
                setOpen(true);
              }}
            >
              <div className="flex items-center">
                <Badge show={user.site_admin} title="Site Admin">
                  <Avatar alt={user.login} url={user.avatar_url} />
                </Badge>
                <p className="ml-4">{user.login}</p>
              </div>
            </Card>
          ));
        })}
        <button
          className="my-2 p-2 w-full bg-blue-600 text-white rounded-sm"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      </div>
      <Modal open={open} userName={userName} onClose={() => setOpen(false)} />
    </div>
  );
};

export default App;

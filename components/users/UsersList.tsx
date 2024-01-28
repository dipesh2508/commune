"use client";

import { User } from "@prisma/client";
import UserBox from '@/components/users/UserBox'

interface UsersListProps {
  items: User[];
}
const UsersList: React.FC<UsersListProps> = ({
  items
}) => {
  return (
    <aside
      className="
        fixed
        inset-y-0
        left-0
        block
        w-full
        overflow-y-auto
        border-gray-200
        pb-20
        lg:left-20
        lg:block
        lg:w-80
        lg:pb-0
    "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
                  py-4
                  text-2xl
                  font-bold
                  text-neutral-800
                "
          >
            Users
          </div>
        </div>

        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UsersList;

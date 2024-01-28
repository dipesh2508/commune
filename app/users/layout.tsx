import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/shared/Sidebar";
import UsersList from "@/components/users/UsersList";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UsersList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}

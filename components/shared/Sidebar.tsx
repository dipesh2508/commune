import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "@/components/shared/DesktopSidebar";
import MobileFooter from "@/components/shared/MobileFooter";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {

  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;

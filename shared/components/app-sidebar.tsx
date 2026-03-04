import { SideBarContentArea } from "@/shared/components/SideBarContent";
import { Sidebar, SidebarRail } from "@/shared/components/ui/sidebar";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SideBarContentArea />
      <SidebarRail />
    </Sidebar>
  );
}

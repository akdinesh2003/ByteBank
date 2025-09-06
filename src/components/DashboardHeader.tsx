import { SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileSwitcher } from "@/components/ProfileSwitcher";

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 lg:justify-end">
      <div className="lg:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-4">
        <ProfileSwitcher />
      </div>
    </header>
  );
}

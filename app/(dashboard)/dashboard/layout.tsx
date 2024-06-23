import { MainNav } from "@/components/main-nav";
import { CookiesProvider } from "next-client-cookies/server";
import { UserAccountNav } from "@/components/user-account-nav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashBoardLayout({ children }: DashboardLayoutProps) {
  return (
    <CookiesProvider>
      <div className="flex min-h-screen flex-col space-y-6">
        <header className="sticky top-0 z-40 border-b bg-black">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
            <UserAccountNav />
          </div>
        </header>
        <div className="container">{children}</div>
      </div>
    </CookiesProvider>
  );
}

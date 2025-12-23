import { AdminNav } from "@/components/admin/AdminNav";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Console | localhost:party",
  description: "Admin console for managing games, prompts, and assets",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--noir-black)] text-white">
      {/* Grid background pattern */}
      <div className="grid-pattern fixed inset-0 opacity-30 pointer-events-none" />

      {/* Main layout with sidebar */}
      <div className="relative flex min-h-screen">
        {/* Sidebar Navigation */}
        <AdminNav />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <AdminHeader />

          {/* Page content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

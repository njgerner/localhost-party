"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/prompts": "Prompt Library",
  "/admin/config": "Game Configuration",
  "/admin/assets": "Asset Manager",
  "/admin/analytics": "Analytics",
};

export function AdminHeader() {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Admin";

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <header className="bg-[var(--noir-darker)] border-b border-[var(--noir-medium)] px-8 py-4">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-2">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.href}>
            {index > 0 && <span className="mx-2">/</span>}
            <span
              className={
                index === breadcrumbs.length - 1
                  ? "text-[var(--neon-cyan)]"
                  : "hover:text-white"
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* Page Title */}
      <h2
        className="text-3xl font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {pageTitle}
      </h2>
    </header>
  );
}

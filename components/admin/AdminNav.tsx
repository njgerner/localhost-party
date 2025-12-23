"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  available: boolean;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "🎮", available: true },
  { href: "/admin/prompts", label: "Prompts", icon: "📝", available: false },
  {
    href: "/admin/config",
    label: "Configuration",
    icon: "⚙️",
    available: false,
  },
  { href: "/admin/assets", label: "Assets", icon: "🎨", available: false },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: "📊",
    available: false,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-[var(--noir-darker)] border-r border-[var(--noir-medium)] flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-[var(--noir-medium)]">
        <Link href="/admin" className="block">
          <h1
            className="text-2xl font-bold neon-text-cyan"
            style={{ fontFamily: "var(--font-display)" }}
          >
            localhost:party
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
            Admin Console
          </p>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                {item.available ? (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[var(--noir-medium)] border-l-4 border-[var(--neon-cyan)] neon-text-cyan"
                          : "hover:bg-[var(--noir-dark)] text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ) : (
                  <div
                    className="
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      text-gray-600 cursor-not-allowed
                    "
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    <span className="ml-auto text-xs px-2 py-1 bg-[var(--noir-medium)] rounded">
                      SOON
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--noir-medium)]">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>
    </nav>
  );
}

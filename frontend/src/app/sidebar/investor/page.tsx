"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  HomeIcon,
  RocketIcon,
  GearIcon,
  ExitIcon,
  IdCardIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface NavItem {
  path: string;
  icon: React.ReactNode;
  text: string;
}

export default function InvestorSidebarPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    "investor-sidebar-collapsed",
    false
  );

  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleMobileSidebar = useCallback(
    () => setIsMobileOpen((p) => !p),
    []
  );

  const toggleCollapse = useCallback(
    () => setIsCollapsed((p: boolean) => !p),
    [setIsCollapsed]
  );

  const handleLogout = () => {
    if (!confirm("Are you sure you want to log out?")) return;
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Logged out");
    router.push("/auth/signin");
  };

  const linkClass = (path: string) =>
    `flex items-center p-3 rounded-lg transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    } ${isCollapsed ? "justify-center" : "justify-start"}`;

  const navItems: NavItem[] = [
    { path: "/investor/home", icon: <HomeIcon />, text: "Home" },
    { path: "/investor/startups", icon: <RocketIcon />, text: "Startups" },
    { path: "/investor/profile", icon: <IdCardIcon />, text: "Profile" },
    { path: "/investor/settings", icon: <GearIcon />, text: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r shadow transition-all ${
          isCollapsed ? "w-20" : "w-72"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link href="/investor/home" className="flex items-center gap-3">
            <Image src="/logo3.jpg" alt="" width={36} height={36} />
            {!isCollapsed && <span className="font-bold">InnovativeSphere</span>}
          </Link>

          <button onClick={toggleCollapse} className="hidden lg:block">
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>

          <button onClick={toggleMobileSidebar} className="lg:hidden">
            <Cross1Icon />
          </button>
        </div>

        <nav className="p-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={linkClass(item.path)}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.text}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded hover:bg-red-600"
          >
            <ExitIcon />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      </aside>

      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 p-3 bg-white shadow rounded lg:hidden"
      >
        <HamburgerMenuIcon />
      </button>

      <main
        className={`flex-1 p-8 transition-all ${
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        <h1 className="text-2xl font-bold">Investor Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Use the sidebar to navigate.
        </p>
      </main>
    </div>
  );
}

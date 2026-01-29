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

/**
 * Navigation item structure
 */
interface NavItem {
  path: string;
  icon: React.ReactNode;
  text: string;
  ariaLabel?: string;
}

export default function InvestorSidebarPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    "investor-sidebar-collapsed",
    false
  );

  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isMobileOpen) setIsMobileOpen(false);
  }, [pathname, isMobileOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isMobileOpen]);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, [setIsCollapsed]);

  const handleLogout = useCallback(() => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      toast.success("Logged out successfully");
      router.push("/auth/signin");
    }
  }, [router]);

  if (!isMounted) return null;

  const linkClass = (path: string) => `
    flex items-center p-3 rounded-lg transition-all duration-200
    ${
      pathname === path
        ? "bg-blue-600 text-white font-medium"
        : "hover:bg-gray-100 text-gray-700"
    }
    ${isCollapsed ? "justify-center" : "justify-start"}
  `;

  const navItems: NavItem[] = [
    {
      path: "/investor/home",
      icon: <HomeIcon className="w-5 h-5" />,
      text: "Home",
    },
    {
      path: "/investor/startups",
      icon: <RocketIcon className="w-5 h-5" />,
      text: "Startups",
    },
    {
      path: "/investor/profile",
      icon: <IdCardIcon className="w-5 h-5" />,
      text: "Profile",
    },
    {
      path: "/investor/settings",
      icon: <GearIcon className="w-5 h-5" />,
      text: "Settings",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full flex flex-col ${
          isCollapsed ? "w-20" : "w-72"
        } bg-white border-r shadow-lg transition-all duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50`}
      >
        <div className="h-16 border-b flex items-center justify-between px-4">
          <Link href="/investor/home" className="flex items-center gap-3">
            <Image src="/logo3.jpg" alt="" width={36} height={36} />
            {!isCollapsed && (
              <span className="font-bold text-lg">InnovativeSphere</span>
            )}
          </Link>

          <button
            onClick={toggleCollapse}
            className="hidden lg:block"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>

          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <Cross1Icon />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2">
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

        <div className="p-3 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
          >
            <ExitIcon />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      </aside>

      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 p-3 bg-white rounded-lg shadow lg:hidden z-50"
      >
        <HamburgerMenuIcon />
      </button>

      {/* STATIC PAGE CONTENT (required for page.tsx) */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Investor Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Use the sidebar to explore startups and manage investments.
        </p>
      </main>
    </div>
  );
}

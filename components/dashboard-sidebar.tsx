"use client";

import type React from "react";

import Link from "next/link";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Ticket,
  Settings,
  LogOut,
  NotebookPen,
  BookType,
  Crown,
  BadgeAlert,
  Siren,
  ShoppingCart,
  BookCheck,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import LogoutModal from "./logout-modal";
import { useState } from "react";

export default function DashboardSidebar() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Perform logout actions here (clear tokens, etc.)
    console.log("User logged out");
    // Redirect to login page
    router.push("/login");
  };

  if (
    pathname === "/signin" ||
    pathname === "/create-account" ||
    pathname === "/forget-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password"
  ) {
    return null;
  }

  return (
    <>
      <div className='!bg-[#333333] md:!bg-[#333333]'>
        <Sidebar className='border-r-0 border-transparent fixed left-0 h-full z-30 !bg-white md:!bg-transparent'>
          <SidebarContent>
            <div className='flex items-center justify-center gap-2 px-4 py-6'>
              <Image
                src='/logo.png'
                alt='logo'
                width={140}
                height={140}
                className=''
              />
            </div>

            <SidebarMenu className='px-6 space-y-8'>
              <NavItem
                href='/'
                icon={LayoutDashboard}
                label='Dashboard'
                active={pathname === "/"}
              />
              <NavItem
                href='/users'
                icon={Users}
                label='Users'
                active={pathname === "/users" || pathname.startsWith("/users")}
              />
              <NavItem
                href='/issues'
                icon={ShieldAlert}
                label='Issues Frequent'
                active={
                  pathname === "/issues" || pathname.startsWith("/issues")
                }
              />
              <NavItem
                href='/maintenance'
                icon={BookCheck}
                label='Maintenance'
                active={
                  pathname === "/maintenance" ||
                  pathname.startsWith("/maintenance")
                }
              />
              <NavItem
                href='/buy-products'
                icon={ShoppingCart}
                label='Buy Products'
                active={
                  pathname === "/buy-products" ||
                  pathname.startsWith("/buy-products")
                }
              />
              <NavItem
                href='/tricks-secrets'
                icon={Siren}
                label='Tricks & Secrets'
                active={
                  pathname === "/tricks-secrets" ||
                  pathname.startsWith("/tricks-secrets")
                }
              />
              <NavItem
                href='/pool-problem'
                icon={BadgeAlert}
                label='Pool Problem'
                active={
                  pathname === "/pool-problem" ||
                  pathname.startsWith("/pool-problem")
                }
              />
              <NavItem
                href='/subscription'
                icon={Crown}
                label='Subscription'
                active={
                  pathname === "/subscription" ||
                  pathname.startsWith("/subscription")
                }
              />
              <NavItem
                href='/setting'
                icon={Settings}
                label='Setting'
                active={
                  pathname === "/setting" || pathname.startsWith("/setting/")
                }
              />
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className='p-6'>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className='flex w-full items-center gap-3 bg-[#760C2A] px-4 py-3 text-white hover:bg-[#760c2ae0]'
            >
              <svg
                width='25'
                height='24'
                viewBox='0 0 25 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17.5 16L21.5 12M21.5 12L17.5 8M21.5 12L7.5 12M13.5 16V17C13.5 18.6569 12.1569 20 10.5 20H6.5C4.84315 20 3.5 18.6569 3.5 17V7C3.5 5.34315 4.84315 4 6.5 4H10.5C12.1569 4 13.5 5.34315 13.5 7V8'
                  stroke='#FAFAFA'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <span>Log out</span>
            </button>
          </SidebarFooter>
        </Sidebar>
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
      </div>
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

function NavItem({ href, icon: Icon, label, active }: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            "flex items-center gap-3 px-4 !py-4 transition-colors rounded-full",
            active
              ? "bg-[#5CE1E6] text-[#333]"
              : "text-[#B0B0B0] hover:bg-gray-100"
          )}
        >
          <Icon size={18} />
          <span
            className={`text-lg text-[#B0B0B0] ${
              active ? "text-[#275F61]" : ""
            }`}
          >
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

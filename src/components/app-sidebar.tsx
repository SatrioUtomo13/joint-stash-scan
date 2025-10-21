import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
// import { PlusCircle, Scan, Wallet, Settings } from "lucide-react";
import {
  PlusCircle,
  Scan,
  Wallet,
  Settings,
  LogOut,
  User,
  Coins,
  ChevronLeft,
  Home,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Manage",
    url: "/manage",
    icon: Settings,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Add savings",
    url: "#",
    icon: PlusCircle,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Add expense",
    url: "#",
    icon: Wallet,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Scan receipt",
    url: "#",
    icon: Scan,
    gradient: "from-purple-500 to-pink-500",
  },
];
export function AppSidebar() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast({
      title: "Logout successful!",
      description: "You have been logged out.",
    });

    navigate("/login");
  };
  return (
    <Sidebar collapsible="icon" className="border-r border-border/40">
      {/* Header dengan Logo & Branding */}
      <SidebarHeader className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dompet Kita
            </h2>
            <p className="text-xs text-muted-foreground">
              Kelola keuangan bersama
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-12 rounded-xl hover:bg-transparent group-data-[collapsible=icon]:hover:scale-100 hover:scale-[1.02] transition-all duration-200 group/item group-data-[collapsible=icon]:justify-center"
                  >
                    <a
                      href={item.url}
                      className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md group-hover/item:shadow-lg transition-shadow shrink-0`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-14 rounded-xl hover:bg-accent/50 transition-colors group-data-[collapsible=icon]:justify-center">
                  <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:w-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                      <p className="font-medium text-sm">Account</p>
                      <p className="text-xs text-muted-foreground">
                        Manage profile
                      </p>
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-56 rounded-xl"
              >
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer rounded-lg gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

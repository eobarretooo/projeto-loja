
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Smartphone, 
  CreditCard, 
  LogOut, 
  Settings, 
  PlusSquare,
  Wrench,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

import { Menu, X } from "lucide-react";
import React from "react";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Estado para abrir/fechar drawer mobile
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Menu items configuration
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home
    },
    {
      title: "Clientes",
      path: "/clients",
      icon: Users
    },
    {
      title: "Consertos",
      path: "/repairs",
      icon: Smartphone
    },
    {
      title: "Novo Conserto",
      path: "/repairs/new",
      icon: PlusSquare
    },
    {
      title: "Cobranças",
      path: "/payments",
      icon: CreditCard
    },
  ];

  return (
    <>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-64 max-w-[80vw] bg-white h-full shadow-lg flex flex-col">
            <div className="flex items-center gap-2 p-4 border-b">
              <Wrench className="w-6 h-6 text-repair-600" />
              <h1 className="text-xl font-bold text-gray-900">CelularFix</h1>
              <button
                className="block md:hidden ml-auto bg-white/90 p-2 rounded shadow text-gray-800"
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu lateral"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-0">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded transition-colors duration-150 text-gray-800 hover:bg-gray-100 ${isActive(item.path) ? 'bg-gray-200 font-semibold' : ''}`}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      aria-label={item.title}
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
                <li className="mt-2 border-t border-gray-200">
                  <Link
                    to="/settings"
                    className={`flex items-center gap-3 px-4 py-3 rounded transition-colors duration-150 text-gray-800 hover:bg-gray-100`}
                    aria-label="Configurações"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Configurações</span>
                  </Link>
                </li>
                <li className="mt-2 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded transition-colors duration-150 text-red-500 hover:bg-red-50"
                    aria-label="Sair da conta"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Sidebar desktop */}
      <ShadcnSidebar>
        <SidebarHeader className="flex items-center gap-2 p-6 border-b">
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-repair-600" />
            <h1 className="text-xl font-bold text-gray-900">CelularFix</h1>
          </div>
        </SidebarHeader>
      
      <SidebarContent className="py-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                asChild
                isActive={isActive(item.path)}
                tooltip={item.title}
              >
                <Link to={item.path} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              isActive={isActive("/settings")}
              tooltip="Configurações"
            >
              <Link to="/settings" className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t">
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 gap-3 mt-2" asChild>
          <Link to="/login">
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </Link>
        </Button>
      </SidebarFooter>
    </ShadcnSidebar>
    </> // Fechado corretamente
  );
};

export default Sidebar;

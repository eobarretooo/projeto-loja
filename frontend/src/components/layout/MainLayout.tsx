
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  SidebarProvider,
  Sidebar as ShadcnSidebar,
  SidebarContent,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isPublicPage = ["/", "/login", "/register", "/about"].includes(location.pathname);

  if (isPublicPage) {
    return (
      <main className="min-h-screen bg-background" role="main">
        {children}
      </main>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col h-screen w-full bg-background">
        <header className="w-full py-3 px-6 border-b border-muted bg-background/80 backdrop-blur-md" role="banner">
          <h1 className="text-lg font-bold tracking-tight text-primary">Celular Fix Manager</h1>
        </header>
        <div className="flex flex-1 min-h-0">
          <nav aria-label="Menu principal" className="h-full">
            <Sidebar />
          </nav>
          <main className="flex-1 overflow-auto p-4 md:p-6 transition-all" role="main" tabIndex={-1}>
            {children}
          </main>
        </div>
        <footer className="w-full py-2 px-6 border-t border-muted text-xs text-muted-foreground text-center bg-background/80" role="contentinfo">
          © {new Date().getFullYear()} Renan • Projeto de Portfólio
        </footer>
      </div>
    </SidebarProvider>
  );
}


export default MainLayout;

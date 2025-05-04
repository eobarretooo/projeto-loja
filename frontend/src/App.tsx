
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import React, { Suspense, lazy } from "react";

const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Clients = lazy(() => import("./pages/Clients"));
const Repairs = lazy(() => import("./pages/Repairs"));
const RepairsDetails = lazy(() => import("./pages/RepairsDetails"));
const EditRepairs = lazy(() => import("./pages/EditRepairs"));
const NewRepair = lazy(() => import("./pages/NewRepair"));
const Payments = lazy(() => import("./pages/Payments"));
const NewPayment = lazy(() => import("./pages/NewPayment"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Settings = lazy(() => import("./pages/Settings"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div
    role="status"
    aria-live="polite"
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: 12 }}
  >
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="#6366f1" strokeWidth="4" opacity="0.2" />
      <path d="M44 24c0-11.046-8.954-20-20-20" stroke="#6366f1" strokeWidth="4" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="1s" repeatCount="indefinite" />
      </path>
    </svg>
    <span style={{ color: '#6366f1', fontWeight: 500, fontSize: 18 }}>Carregando conteúdo...</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/repairs" element={<Repairs />} />
              <Route path="/repairs/:id" element={<RepairsDetails />} />
              <Route path="/repairs/:id/edit" element={<EditRepairs />} />
              <Route path="/repairs/new" element={<NewRepair />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/payments/new" element={<NewPayment />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<React.Suspense fallback={<div>Carregando...</div>}>
                {React.createElement(React.lazy(() => import("./pages/About")))}
              </React.Suspense>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Settings2 } from "lucide-react";
import ProfileSettings from "@/components/settings/ProfileSettings";
import StoreSettings from "@/components/settings/StoreSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";

const Settings = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Configurações"
        description="Gerencie as configurações da sua conta e preferências do sistema"
        icon={<Settings2 className="h-6 w-6 text-repair-600" />}
      />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 grid grid-cols-4 md:w-fit">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
        <ProfileSettings />
          <StoreSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
        <NotificationSettings />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <AppearanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
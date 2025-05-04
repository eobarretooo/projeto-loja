import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Bell } from "lucide-react";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-repair-600" />
          Preferências de Notificações
        </CardTitle>
        <CardDescription>
          Escolha como e quando deseja receber notificações
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Notificações por Email</h4>
            <p className="text-sm text-muted-foreground">
              Receba atualizações sobre consertos e pagamentos por email
            </p>
          </div>
          <Switch 
            checked={emailNotifications}
            onCheckedChange={(checked) => {
              setEmailNotifications(checked);
              toast.success(checked ? "Notificações por email ativadas" : "Notificações por email desativadas");
            }}
          />
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Notificações Push</h4>
            <p className="text-sm text-muted-foreground">
              Receba alertas no navegador quando algo importante acontecer
            </p>
          </div>
          <Switch 
            checked={pushNotifications}
            onCheckedChange={(checked) => {
              setPushNotifications(checked);
              toast.success(checked ? "Notificações push ativadas" : "Notificações push desativadas");
            }}
          />
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Notificações SMS</h4>
            <p className="text-sm text-muted-foreground">
              Receba lembretes e alertas importantes por SMS
            </p>
          </div>
          <Switch 
            checked={smsNotifications}
            onCheckedChange={(checked) => {
              setSmsNotifications(checked);
              toast.success(checked ? "Notificações SMS ativadas" : "Notificações SMS desativadas");
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
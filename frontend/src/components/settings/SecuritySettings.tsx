import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Shield } from "lucide-react";

interface PasswordFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [passwordFields, setPasswordFields] = useState<PasswordFields>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id.replace('-password', '') as keyof PasswordFields;
    setPasswordFields(prev => ({ ...prev, [key]: value }));
  };

  const updatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!passwordFields.currentPassword || !passwordFields.newPassword || !passwordFields.confirmPassword) {
      toast.error("Por favor, preencha todos os campos de senha");
      return;
    }
    
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    if (passwordFields.newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    toast.success("Senha atualizada com sucesso!");
    setPasswordFields({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-repair-600" />
          Segurança da Conta
        </CardTitle>
        <CardDescription>
          Proteja sua conta e seus dados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Autenticação de Dois Fatores</h4>
              <p className="text-sm text-muted-foreground">
                Adicione uma camada extra de segurança à sua conta
              </p>
            </div>
            <Switch 
              checked={twoFactorAuth}
              onCheckedChange={(checked) => {
                setTwoFactorAuth(checked);
                toast.success(checked 
                  ? "Autenticação de dois fatores ativada" 
                  : "Autenticação de dois fatores desativada");
              }}
            />
          </div>
          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Alterar Senha</h4>
            <form onSubmit={updatePassword} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    value={passwordFields.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    value={passwordFields.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={passwordFields.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <Button type="submit">Atualizar Senha</Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
}

const ProfileSettings = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Administrador",
    email: "admin@celularfix.com",
    phone: "(11) 99999-9999",
    role: "Proprietário"
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserProfile(prev => ({ ...prev, [id]: value }));
  };

  const saveProfileSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Informações do perfil salvas com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-repair-600" />
          Informações do Perfil
        </CardTitle>
        <CardDescription>
          Atualize suas informações pessoais e de contato
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={saveProfileSettings} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                value={userProfile.name} 
                onChange={handleProfileChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={userProfile.email} 
                onChange={handleProfileChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone" 
                value={userProfile.phone} 
                onChange={handleProfileChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Input 
                id="role" 
                value={userProfile.role} 
                onChange={handleProfileChange} 
              />
            </div>
          </div>
          <Button type="submit">Salvar Alterações</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface StoreSettings {
  storeName: string;
  storeAddress: string;
  storeCity: string;
  storeState: string;
}

const StoreSettings = () => {
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: "CelularFix",
    storeAddress: "Rua das Flores, 123",
    storeCity: "São Paulo",
    storeState: "SP"
  });

  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id.replace('store-', '');
    setStoreSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configurações da loja salvas com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações da Loja</CardTitle>
        <CardDescription>
          Personalize as informações da sua assistência técnica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={saveStoreSettings} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="store-name">Nome da Loja</Label>
              <Input 
                id="store-name" 
                value={storeSettings.storeName} 
                onChange={handleStoreChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-address">Endereço</Label>
              <Input 
                id="store-address" 
                value={storeSettings.storeAddress} 
                onChange={handleStoreChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-city">Cidade</Label>
              <Input 
                id="store-city" 
                value={storeSettings.storeCity} 
                onChange={handleStoreChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-state">Estado</Label>
              <Input 
                id="store-state" 
                value={storeSettings.storeState} 
                onChange={handleStoreChange} 
              />
            </div>
          </div>
          <Button type="submit">Salvar Alterações</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StoreSettings;
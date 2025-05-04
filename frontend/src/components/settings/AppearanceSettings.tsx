import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { PaintBucket } from "lucide-react";

const AppearanceSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState("blue");

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    
    // In a real app, this would update the theme
    if (checked) {
      document.documentElement.classList.add('dark');
      toast.success("Modo escuro ativado");
    } else {
      document.documentElement.classList.remove('dark');
      toast.success("Modo claro ativado");
    }
  };

  const handleThemeChange = (value: string) => {
    setThemeColor(value);
    toast.success(`Tema ${value} aplicado`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PaintBucket className="h-5 w-5 text-repair-600" />
          Aparência
        </CardTitle>
        <CardDescription>
          Personalize a aparência do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Modo Escuro</h4>
            <p className="text-sm text-muted-foreground">
              Usar tema escuro para reduzir o cansaço visual
            </p>
          </div>
          <Switch 
            checked={darkMode}
            onCheckedChange={handleDarkModeToggle}
          />
        </div>
        
        <Separator />

        <div className="space-y-2">
          <h4 className="font-medium">Cor do Tema</h4>
          <RadioGroup 
            value={themeColor}
            onValueChange={handleThemeChange}
            className="grid grid-cols-3 gap-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blue" id="blue" />
              <Label htmlFor="blue" className="cursor-pointer">Azul</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="green" id="green" />
              <Label htmlFor="green" className="cursor-pointer">Verde</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="purple" id="purple" />
              <Label htmlFor="purple" className="cursor-pointer">Roxo</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
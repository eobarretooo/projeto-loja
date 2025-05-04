import { useNavigate } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  
  // Importe a função register do serviço de API
  // import { register } from "@/services/api";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleRegister = async (data: any) => {
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      if (!res.ok) {
        let msg = "Erro ao registrar usuário";
        try {
          const errData = await res.json();
          if (errData.errors && Array.isArray(errData.errors)) {
            msg = errData.errors.map((e: any) => e.msg).join("\n");
          } else if (errData.message) {
            msg = errData.message;
          }
        } catch {}
        throw new Error(msg);
      }
      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (e: any) {
      toast.error(e.message || "Erro ao registrar usuário");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Wrench className="h-6 w-6 text-repair-600" />
            <CardTitle className="text-2xl font-bold">CelularFix</CardTitle>
          </div>
          <CardDescription>
            Crie sua conta para começar a usar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={handleRegister} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

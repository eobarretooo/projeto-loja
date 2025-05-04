
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

import { login, setToken } from "@/services/api";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string, password: string }) => {
    try {
      const { token } = await login(data.email, data.password);
      setToken(token);
      navigate("/dashboard");
    } catch (e) {
      toast.error("E-mail ou senha inválidos");
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
            Faça login para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

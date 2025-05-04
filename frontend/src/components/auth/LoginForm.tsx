
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { login, setToken } from "../../services/api";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      // Chama login da API
      const res = await login(data.email, data.password);
      setToken(res.token);
      toast.success("Login realizado com sucesso!");
      await onSubmit(data); // Se precisar, pode passar dados do usuário
    } catch (error: any) {
      toast.error(error.message || "Falha no login. Verifique suas credenciais.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
          aria-busy={isLoading ? "true" : undefined}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
        <div className="text-center text-sm">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-repair-600 hover:underline">
            Cadastre-se
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;

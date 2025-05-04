
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import PaymentForm from "@/components/forms/PaymentForm";

import { useEffect, useState } from "react";
import { getRepairs, createPayment } from "@/services/api";
import { toast } from "sonner";

const NewPayment = () => {
  const navigate = useNavigate();
  const [repairs, setRepairs] = useState<{ _id: string; description: string; client: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRepairs().then(setRepairs);
  }, []);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Mapeamento para o formato esperado pelo backend
      const paymentMethodMap: Record<string, string> = {
        pix: "Pix",
        dinheiro: "Dinheiro",
        cartao: "Cartão",
        cartão: "Cartão",
        outro: "Outro"
      };
      await createPayment({
        repair: data.repair,
        amount: data.amount,
        method: paymentMethodMap[(data.paymentMethod || '').toLowerCase()] || "Outro"
        // Se quiser enviar campos extras, adicione aqui se o backend aceitar
      });
      toast.success("Cobrança registrada com sucesso!");
      navigate("/payments");
    } catch (e) {
      toast.error("Erro ao registrar cobrança");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Nova Cobrança"
        description="Gere uma nova cobrança para um conserto"
      />

      <Card>
        <CardContent className="pt-6">
          <PaymentForm
            repairs={repairs}
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPayment;

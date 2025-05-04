
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import RepairForm from "@/components/forms/RepairForm";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { getClients, createRepair } from "@/services/api";

const NewRepair = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Mapeia os campos do formulário para o que o backend espera
      const payload = {
        client: data.clientId, // ou data.client, conforme o campo do seu form
        device: data.model, // ou data.device/modelo do aparelho
        description: data.issueDescription,
        price: Number(data.estimatedCost), // garante que é número
        status: data.status // Ex: "Aguardando", "Em Andamento", "Concluído"
      };
      await createRepair(payload);
      toast.success("Conserto registrado com sucesso!");
      navigate("/repairs");
    } catch (e) {
      toast.error("Erro ao registrar conserto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Novo Conserto"
        description="Registre um novo serviço de conserto"
      />

      <Card>
        <CardContent className="pt-6">
          <RepairForm
            clients={clients}
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewRepair;

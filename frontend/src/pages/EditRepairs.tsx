
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import RepairForm from "@/components/forms/RepairForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { getRepairById, updateRepair, getClients } from "@/services/api";



interface Repair {
  id: string;
  clientId: string;
  deviceType: string;
  brand: string;
  model: string;
  issueDescription: string;
  estimatedCost: string;
  status: string;
}

interface Client {
  id: string;
  name: string;
}

const EditRepair = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repair, setRepair] = useState<Repair | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getRepairById(id), getClients()])
      .then(([repairData, clientsData]) => {
        setRepair(repairData);
        setClients(clientsData);
      })
      .catch(() => {
        setRepair(null);
        setClients([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = (data: Repair) => {
    console.log("Repair update data:", data);
    toast.success("Conserto atualizado com sucesso!");
    navigate(`/repairs/${id}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Editar Conserto"
          description="Carregando informações..."
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-repair-600"></div>
        </div>
      </div>
    );
  }

  if (!repair) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Conserto não encontrado"
          description="O conserto que você está tentando editar não existe"
        />
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Não foi possível encontrar as informações do conserto solicitado.
              </p>
              <Button asChild>
                <Link to="/repairs">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para Consertos
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Editar Conserto"
        description={`Editar informações do conserto #${repair.id}`}
      />

      <div className="flex mb-6">
        <Button variant="outline" asChild>
          <Link to={`/repairs/${repair.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Detalhes
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <RepairForm
            clients={clients.map(c => ({ _id: c.id, name: c.name }))}
            defaultValues={repair}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditRepair;
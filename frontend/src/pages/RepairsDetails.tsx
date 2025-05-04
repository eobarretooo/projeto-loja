
import { useParams, Link } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, CreditCard, Edit, Smartphone, Tag, User } from "lucide-react";
import { useState, useEffect } from "react";
import { getRepairById } from "@/services/api";




const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Aguardando</Badge>;
    case "in_progress":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Em Andamento</Badge>;
    case "waiting_parts":
      return <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Aguardando Peças</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Concluído</Badge>;
    case "delivered":
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Entregue</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const RepairDetails = () => {
  const { id } = useParams();
  interface Repair {
  id: string;
  clientId?: string;
  client?: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
  };
  deviceType?: string;
  device?: string;
  brand?: string;
  model?: string;
  issue?: string;
  issueDescription?: string;
  status: string;
  startDate?: string;
  estimatedCost?: string;
  notes?: string;
  technician?: string;
}

const [repair, setRepair] = useState<Repair | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRepairById(id)
      .then(setRepair)
      .catch(() => setRepair(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Detalhes do Conserto"
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
          description="O conserto que você está procurando não existe"
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
        title={`Conserto #${repair.id}`}
        description="Detalhes completos do serviço"
        actionLabel="Editar Conserto"
        actionHref={`/repairs/${repair.id}/edit`}
      />

      <div className="flex items-center space-x-2 mb-6">
        <Button variant="outline" asChild>
          <Link to="/repairs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Consertos
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/repairs/${repair.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Conserto
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações do Conserto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <div className="mt-1">{getStatusBadge(repair.status)}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Data de Entrada</h3>
                <div className="mt-1 flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  {repair.startDate}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Dispositivo</h3>
              <div className="mt-1 flex items-center">
                <Smartphone className="h-4 w-4 text-muted-foreground mr-2" />
                {repair.brand} {repair.device}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Problema</h3>
              <div className="mt-1">{repair.issue}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Descrição Detalhada</h3>
              <div className="mt-1">{repair.issueDescription}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Observações Técnicas</h3>
              <div className="mt-1">{repair.notes}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Técnico Responsável</h3>
              <div className="mt-1">{repair.technician}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Valor Estimado</h3>
              <div className="mt-1 flex items-center">
                <Tag className="h-4 w-4 text-muted-foreground mr-2" />
                {repair.estimatedCost}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
              <div className="mt-1 flex items-center">
                <User className="h-4 w-4 text-muted-foreground mr-2" />
                <Link to={`/clients/${repair.client.id}`} className="text-repair-600 hover:underline">
                  {repair.client.name}
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Telefone</h3>
              <div className="mt-1">{repair.client.phone}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <div className="mt-1">{repair.client.email}</div>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/payments/new?repairId=${repair.id}`}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Gerar Cobrança
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RepairDetails;
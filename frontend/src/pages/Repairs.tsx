
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  PlusCircle,
  Smartphone,
  Calendar,
  CreditCard,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { getRepairs } from "@/services/api";

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

const Repairs = () => {
  const [repairs, setRepairs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getRepairs().then(setRepairs).catch(() => {/* erro já tratado */});
  }, []);

  const filteredRepairs = repairs.filter(
    (repair) =>
      repair.client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.device?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.issue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Consertos"
        description="Gerencie todos os consertos"
        
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar consertos..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Dispositivo</TableHead>
              <TableHead>Problema</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor Est.</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRepairs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground"
                >
                  Nenhum conserto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredRepairs.map((repair) => (
                <TableRow key={repair._id}>
                  <TableCell className="font-medium">
                    <Link
                      to={`/clients/${repair.client?._id || repair.client?.id || ''}`}
                      className="text-repair-600 hover:underline"
                    >
                      {repair.client?.name || 'Sem cliente'}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {repair.brand} {repair.device}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{repair.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{repair.createdAt ? new Date(repair.createdAt).toLocaleDateString() : "-"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      <span>{typeof repair.price === "number" ? repair.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "-"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(repair.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={`/repairs/${repair._id}`}>
                            Ver detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/repairs/${repair._id}/edit`}>
                            Editar conserto
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/payments/new" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Gerar cobrança
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Repairs;

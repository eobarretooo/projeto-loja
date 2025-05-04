
import { useState, useEffect } from "react";
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
import { Search, MoreVertical, QrCode, Receipt, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

import { getPayments } from "@/services/api";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
    case "paid":
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Pago</Badge>;
    case "overdue":
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Vencido</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case "pix":
      return <QrCode className="h-4 w-4 text-repair-600" />;
    case "boleto":
      return <Receipt className="h-4 w-4 text-gray-600" />;
    case "credit_card":
      return <CreditCard className="h-4 w-4 text-blue-600" />;
    default:
      return null;
  }
};

const getPaymentMethodName = (method: string) => {
  switch (method) {
    case "pix":
      return "PIX";
    case "boleto":
      return "Boleto";
    case "credit_card":
      return "Cartão de Crédito";
    default:
      return method;
  }
};

const Payments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getPayments().then(setPayments).catch(() => {/* erro já tratado */});
  }, []);

  const filteredPayments = payments.filter(
    (payment) => {
      const clientName = typeof payment.client === 'string' ? payment.client : payment.client?.name;
      const repairDesc = typeof payment.repair === 'string'
        ? payment.repair
        : payment.repair?.description || payment.repair?._id || '';
      return (
        (clientName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (repairDesc?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }
  );

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Cobranças"
        description="Gerencie todas as cobranças"
        
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar cobranças..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button asChild>
          <Link to="/payments/new">
            Nova Cobrança
          </Link>
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Conserto</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Nenhuma cobrança encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell className="font-medium">{typeof payment.client === 'string' ? payment.client : payment.client?.name || '-'}</TableCell>
                  <TableCell>{typeof payment.repair === 'string' ? payment.repair : payment.repair?.description || payment.repair?._id || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(payment.method)}
                      <span>{getPaymentMethodName(payment.method)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Enviar novamente</DropdownMenuItem>
                        <DropdownMenuItem>Marcar como pago</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
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

export default Payments;

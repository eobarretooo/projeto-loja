
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClientForm from "@/components/forms/ClientForm";
import { Search, UserPlus, Edit, Trash2, Phone } from "lucide-react";
import { toast } from "sonner";

import { getClients, createClient, updateClient, deleteClient } from "@/services/api";

const Clients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingClient, setEditingClient] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleAddClient = async (data: any) => {
    try {
      const newClient = await createClient(data);
      setClients((prev) => [...prev, newClient]);
      setIsDialogOpen(false);
      toast.success("Cliente adicionado com sucesso!");
    } catch (e) {
      toast.error("Erro ao adicionar cliente");
    }
  };

  const handleEditClient = async (data: any) => {
    try {
      const updated = await updateClient(editingClient._id, data);
      setClients((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
      setEditingClient(null);
      setIsDialogOpen(false);
      toast.success("Cliente atualizado com sucesso!");
    } catch (e) {
      toast.error("Erro ao atualizar cliente");
    }
  };

  const handleDeleteClient = async (_id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await deleteClient(_id);
        setClients((prev) => prev.filter((client) => client._id !== _id));
        toast.success("Cliente excluído com sucesso!");
      } catch (e) {
        toast.error("Erro ao excluir cliente");
      }
    }
  };

  useEffect(() => {
    getClients().then(setClients).catch(() => toast.error("Erro ao buscar clientes"));
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Clientes"
        description="Gerencie todos os seus clientes"
        
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar clientes..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingClient ? "Editar Cliente" : "Adicionar Cliente"}
              </DialogTitle>
            </DialogHeader>
            <ClientForm
              defaultValues={editingClient}
              onSubmit={editingClient ? handleEditClient : handleAddClient}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client._id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <a
                      href={`tel:${client.phone}`}
                      className="flex items-center gap-1 text-repair-600 hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </a>
                  </TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingClient(client);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => handleDeleteClient(client._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
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

export default Clients;

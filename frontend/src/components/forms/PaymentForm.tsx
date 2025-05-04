
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, QrCode, Receipt } from "lucide-react";

const paymentFormSchema = z.object({
  repairId: z.string(),
  amount: z.string().min(1, { message: "Informe o valor" }),
  paymentMethod: z.string().min(1, { message: "Selecione o método de pagamento" }),
  installments: z.string().optional(),
  dueDate: z.string().optional(),
  note: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  repairs: { _id: string; description: string; client: string }[];
  defaultValues?: Partial<PaymentFormValues>;
  onSubmit: (data: PaymentFormValues) => void;
  isLoading?: boolean;
}

const PaymentForm = ({ repairs, defaultValues, onSubmit, isLoading }: PaymentFormProps) => {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: defaultValues || {
      repairId: "",
      amount: "",
      paymentMethod: "",
      installments: "1",
      dueDate: new Date().toISOString().split('T')[0],
      note: "",
    },
  });

  const watchPaymentMethod = form.watch("paymentMethod");

  const handleSubmit = (data: PaymentFormValues) => {
    // Mapeia os campos para o formato esperado pelo backend
    const payload = {
      repair: data.repairId,
      amount: Number(data.amount),
      paymentMethod: data.paymentMethod,
      installments: data.installments ? Number(data.installments) : undefined,
      dueDate: data.dueDate,
      note: data.note
    };
    onSubmit(payload as any);
    toast.success("Cobrança gerada com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="repairId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conserto</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um conserto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {repairs.map((repair) => (
                      <SelectItem key={repair._id} value={repair._id}>
                        {(repair.client && typeof repair.client === "object"
                          ? (repair.client as { name?: string }).name
                          : repair.client
                            ? String(repair.client)
                            : "Cliente desconhecido")} - {repair.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Método de Pagamento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método de pagamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchPaymentMethod === "credit_card" && (
            <FormField
              control={form.control}
              name="installments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcelas</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o número de parcelas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i}x {i === 1 ? "à vista" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watchPaymentMethod === "boleto" && (
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Vencimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observação</FormLabel>
                <FormControl>
                  <Input placeholder="Observação opcional sobre o pagamento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Gerando Cobrança..." : "Gerar Cobrança"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;


import { BarChart3, CreditCard, DollarSign, Users, Smartphone, Clock, ArrowUp, ArrowDown } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  // Dados fictícios para demonstração
  const revenueData = [
    { name: "Jan", total: 1200 },
    { name: "Fev", total: 850 },
    { name: "Mar", total: 1600 },
    { name: "Abr", total: 1800 },
    { name: "Mai", total: 2400 },
    { name: "Jun", total: 1500 },
  ];

  const repairsData = [
    { id: "1", customer: "João Silva", device: "iPhone 11", status: "Em Andamento", date: "10/06/2023" },
    { id: "2", customer: "Maria Santos", device: "Samsung S21", status: "Concluído", date: "08/06/2023" },
    { id: "3", customer: "Pedro Oliveira", device: "Xiaomi Redmi", status: "Aguardando Peças", date: "05/06/2023" },
    { id: "4", customer: "Ana Costa", device: "Motorola Edge", status: "Aguardando", date: "01/06/2023" },
  ];

  const repairsMonthData = [
    { name: "Jan", total: 12 },
    { name: "Fev", total: 9 },
    { name: "Mar", total: 16 },
    { name: "Abr", total: 18 },
    { name: "Mai", total: 24 },
    { name: "Jun", total: 15 },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Em Andamento":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Em Andamento</Badge>;
      case "Concluído":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Concluído</Badge>;
      case "Aguardando Peças":
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Aguardando Peças</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <DashboardHeader 
        title="Dashboard" 
        description="Visão geral da sua assistência técnica" 
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Faturamento Total" 
          value="R$ 9.350,00" 
          icon={DollarSign} 
          trend={{ value: 12, positive: true }} 
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <StatsCard 
          title="Consertos Ativos" 
          value="12" 
          icon={Smartphone}
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <StatsCard 
          title="Clientes" 
          value="48" 
          icon={Users} 
          trend={{ value: 8, positive: true }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
        <StatsCard 
          title="Cobranças Pendentes" 
          value="5" 
          icon={CreditCard}
          className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
        />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Faturamento</CardTitle>
                  <CardDescription>Faturamento mensal</CardDescription>
                </div>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `R$${value}`}
                    />
                    <RechartsTooltip
                      formatter={(value) => [`R$ ${value}`, 'Faturamento']}
                      labelFormatter={(label) => `Mês: ${label}`}
                    />
                    <Bar
                      dataKey="total"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Consertos Recentes</CardTitle>
                <CardDescription>
                  Consertos dos últimos 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {repairsData.map((repair) => (
                    <div key={repair.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{repair.customer}</h4>
                        <span className="text-sm text-muted-foreground">{repair.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{repair.device}</span>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(repair.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/repairs">Ver Todos os Consertos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Volume de Consertos</CardTitle>
                <CardDescription>Quantidade mensal</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={repairsMonthData}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    formatter={(value) => [value, 'Consertos']}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

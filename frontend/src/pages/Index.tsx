
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, Shield, Settings, Users, CreditCard, Smartphone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-repair-600" />
            <h1 className="text-2xl font-bold text-gray-900">CelularFix</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-gray-600 hover:text-repair-600">
              Sobre
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-repair-600">
              Login
            </Link>
            <Button asChild>
              <Link to="/register">Cadastre-se</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-repair-700 to-repair-500 text-white py-24">
          <div className="container mx-auto px-4 md:flex items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Gerencie sua assistência técnica com eficiência
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Controle consertos, clientes e pagamentos em um só lugar, com uma interface intuitiva e moderna.
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="outline" className="bg-white text-repair-700 hover:bg-gray-100" asChild>
                  <Link to="/register">Começar agora</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-repair-700 hover:bg-gray-100" asChild>
                  <Link to="/login">Já tenho conta</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <picture>
                  <source srcSet="/dashboard-preview.webp" type="image/webp" />
                  <img 
                    src="/dashboard-preview.png" 
                    width="600" 
                    height="400" 
                    alt="Visualização do painel CelularFix, mostrando gráficos e lista de consertos de celulares." 
                    className="rounded-md shadow-md"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tudo o que você precisa para gerenciar sua loja</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-repair-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-repair-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão de Consertos</h3>
                <p className="text-gray-600">
                  Cadastre e acompanhe todos os consertos em andamento, com detalhes sobre o status, peças e valores.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-repair-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-repair-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cadastro de Clientes</h3>
                <p className="text-gray-600">
                  Mantenha um registro completo dos seus clientes e histórico de atendimentos em um só lugar.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-repair-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-repair-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sistema de Cobranças</h3>
                <p className="text-gray-600">
                  Gere cobranças via PIX, boleto ou cartão de crédito, com controle de pagamentos recebidos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-repair-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para organizar sua assistência técnica?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Comece a usar o CelularFix hoje mesmo e transforme a gestão do seu negócio.
            </p>
            <Button size="lg" variant="outline" className="bg-white text-repair-700 hover:bg-gray-100" asChild>
              <Link to="/register">Experimente grátis</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="h-6 w-6 text-repair-300" />
                <h3 className="text-xl font-bold">CelularFix</h3>
              </div>
              <p className="text-gray-400">
                Sistema completo para gestão de assistências técnicas de celulares e dispositivos eletrônicos.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Cadastro</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <p className="text-gray-400">
                contato@celularfix.com<br />
                (00) 0000-0000
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            &copy; 2023 CelularFix. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-repair-600 mb-6">404</h1>
        <p className="text-2xl font-medium text-gray-800 mb-4">Página não encontrada</p>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

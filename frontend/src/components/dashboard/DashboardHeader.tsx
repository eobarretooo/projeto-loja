
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

const DashboardHeader = ({ 
  title, 
  description, 
  actionLabel, 
  actionHref, 
  icon
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex items-center gap-2">
        {icon && <span className="mr-1">{icon}</span>}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
      {actionLabel && actionHref && (
        <Button asChild>
          <Link to={actionHref} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            {actionLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default DashboardHeader;

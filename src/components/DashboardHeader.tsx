import { Button } from "@/components/ui/button";
import { PlusCircle, Scan, Wallet, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onAddSavings: () => void;
  onAddExpense: () => void;
  onOCRUpload: () => void;
}

export const DashboardHeader = ({ onAddSavings, onAddExpense, onOCRUpload }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dompet Kita
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your group's financial goals together
        </p>
      </div>

      <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <Button
          onClick={() => navigate("/manage")}
          variant="outline"
          className="border-primary/20 hover:bg-primary/5 hover:text-primary hover-scale"
          size="sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Manage
        </Button>

        <Button
          onClick={onAddSavings}
          className="bg-gradient-accent hover:shadow-glow transition-all hover-scale"
          size="sm"
        >
          <PlusCircle className="w-4 h-4 mr-2 animate-bounce-gentle" />
          Add Savings
        </Button>

        <Button
          onClick={onAddExpense}
          variant="outline"
          className="border-primary/20 hover:bg-primary/5 hover:text-primary hover-scale"
          size="sm"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Add Expense
        </Button>

        <Button
          onClick={onOCRUpload}
          variant="secondary"
          className="bg-secondary hover:bg-secondary/80 hover-scale hover-glow"
          size="sm"
        >
          <Scan className="w-4 h-4 mr-2" />
          Scan Receipt
        </Button>
      </div>
    </div>
  );
};
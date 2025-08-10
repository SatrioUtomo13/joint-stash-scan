import { Button } from "@/components/ui/button";
import { PlusCircle, Scan, Wallet } from "lucide-react";

interface DashboardHeaderProps {
  onAddSavings: () => void;
  onAddExpense: () => void;
  onOCRUpload: () => void;
}

export const DashboardHeader = ({ onAddSavings, onAddExpense, onOCRUpload }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Joint Savings
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your group's financial goals together
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={onAddSavings}
          className="bg-gradient-accent hover:shadow-glow transition-all"
          size="sm"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Savings
        </Button>
        
        <Button 
          onClick={onAddExpense}
          variant="outline"
          className="border-primary/20 hover:bg-primary/5"
          size="sm"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
        
        <Button 
          onClick={onOCRUpload}
          variant="secondary"
          className="bg-secondary hover:bg-secondary/80"
          size="sm"
        >
          <Scan className="w-4 h-4 mr-2" />
          Scan Receipt
        </Button>
      </div>
    </div>
  );
};
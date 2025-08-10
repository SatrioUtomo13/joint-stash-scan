import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Calendar, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetCardProps {
  totalBudget: number;
  spent: number;
  remaining: number;
  period: string;
}

export const BudgetCard = ({ totalBudget, spent, remaining, period }: BudgetCardProps) => {
  const spentPercentage = (spent / totalBudget) * 100;
  const isOverBudget = spentPercentage > 100;
  const isNearLimit = spentPercentage > 80;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className={cn(
      "shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 animate-card group",
      isOverBudget ? "border-l-destructive" : isNearLimit ? "border-l-warning" : "border-l-primary"
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">Monthly Budget</span>
          {isNearLimit && (
            <AlertTriangle className={cn(
              "w-5 h-5",
              isOverBudget ? "text-destructive" : "text-warning"
            )} />
          )}
          {!isNearLimit && <Wallet className="w-5 h-5 text-primary" />}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className={cn(
              "font-medium",
              isOverBudget ? "text-destructive" : isNearLimit ? "text-warning" : "text-foreground"
            )}>
              {spentPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={Math.min(spentPercentage, 100)} 
            className={cn(
              "h-3",
              isOverBudget ? "bg-destructive/10" : isNearLimit ? "bg-warning/10" : "bg-primary/10"
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Spent</p>
            <p className={cn(
              "text-lg font-bold",
              isOverBudget ? "text-destructive" : "text-foreground"
            )}>
              {formatCurrency(spent)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className={cn(
              "text-lg font-semibold",
              remaining < 0 ? "text-destructive" : "text-accent"
            )}>
              {formatCurrency(remaining)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2 border-t">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {period}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
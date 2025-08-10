import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users } from "lucide-react";

interface SavingsCardProps {
  currentAmount: number;
  targetAmount: number;
  goalTitle: string;
  contributors: number;
}

export const SavingsCard = ({ currentAmount, targetAmount, goalTitle, contributors }: SavingsCardProps) => {
  const progressPercentage = (currentAmount / targetAmount) * 100;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-accent">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">{goalTitle}</span>
          <TrendingUp className="w-5 h-5 text-accent" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-accent/10"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-lg font-bold text-accent">
              {formatCurrency(currentAmount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Target</p>
            <p className="text-lg font-semibold">
              {formatCurrency(targetAmount)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2 border-t">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {contributors} contributors
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
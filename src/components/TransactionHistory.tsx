import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "savings" | "expense";
  amount: number;
  description: string;
  date: string;
  user: string;
  category?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "savings",
    amount: 2500000,
    description: "Monthly savings contribution",
    date: "2024-01-15",
    user: "John Doe",
    category: "Savings"
  },
  {
    id: "2",
    type: "expense",
    amount: 450000,
    description: "Groceries at Supermarket",
    date: "2024-01-14",
    user: "Jane Smith",
    category: "Food"
  },
  {
    id: "3",
    type: "expense",
    amount: 200000,
    description: "Gas station fill-up",
    date: "2024-01-13",
    user: "Mike Johnson",
    category: "Transportation"
  },
  {
    id: "4",
    type: "savings",
    amount: 1000000,
    description: "Bonus allocation to house fund",
    date: "2024-01-12",
    user: "Sarah Wilson",
    category: "Savings"
  },
  {
    id: "5",
    type: "expense",
    amount: 150000,
    description: "Restaurant dinner",
    date: "2024-01-11",
    user: "John Doe",
    category: "Food"
  }
];

export const TransactionHistory = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    transaction.type === "savings" 
                      ? "bg-accent/10 text-accent" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {transaction.type === "savings" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        by {transaction.user}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={cn(
                    "font-semibold",
                    transaction.type === "savings" ? "text-accent" : "text-primary"
                  )}>
                    {transaction.type === "savings" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </p>
                  {transaction.category && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      {transaction.category}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
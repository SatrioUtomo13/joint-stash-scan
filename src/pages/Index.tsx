import { useState, useEffect } from "react";
import Layout from "@/pages/Layout";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SavingsCard } from "@/components/SavingsCard";
import { BudgetCard } from "@/components/BudgetCard";
import { TransactionHistory } from "@/components/TransactionHistory";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { OCRUploadModal } from "@/components/OCRUploadModal";
import { GroupMembers } from "@/components/GroupMembers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import {
  createSavingsGoal,
  getSavingsGoals,
  getGoalMembers,
} from "@/services/goal";

const Index = () => {
  const { toast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOCRModalOpen, setIsOCRModalOpen] = useState(false);
  const [savingsData, setSavingsData] = useState([]);
  const [transactionType, setTransactionType] = useState<"savings" | "expense">(
    "savings"
  );
  const [selectedGoalMembers, setSelectedGoalMembers] = useState<string | null>(
    null
  );
  const [selectedBudgetMembers, setSelectedBudgetMembers] = useState<
    string | null
  >(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedGoalMembers) return;

      setLoadingMembers(true);
      try {
        const res = await getGoalMembers(selectedGoalMembers);
        setMembers(res);
      } catch (error) {
        toast({ title: "Failed to load members", variant: "destructive" });
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, [selectedGoalMembers]);

  // Mock data - in real app this would come from backend
  const savingsGoals = [
    {
      id: "1",
      currentAmount: 45000000,
      targetAmount: 100000000,
      goalTitle: "Dream House Fund",
      contributors: 4,
    },
    {
      id: "2",
      currentAmount: 15000000,
      targetAmount: 50000000,
      goalTitle: "Wedding Dream",
      contributors: 2,
    },
    {
      id: "3",
      currentAmount: 8000000,
      targetAmount: 25000000,
      goalTitle: "Car Fund",
      contributors: 3,
    },
  ];

  const budgets = [
    {
      id: "1",
      totalBudget: 5000000,
      spent: 3250000,
      remaining: 1750000,
      period: "January 2024",
      title: "Monthly Expenses",
    },
    {
      id: "2",
      totalBudget: 2000000,
      spent: 800000,
      remaining: 1200000,
      period: "January 2024",
      title: "Entertainment",
    },
  ];

  const fetchSavingsGoals = async () => {
    try {
      const response = await getSavingsGoals();
      setSavingsData(response);
    } catch (error) {
      toast({ title: "Error fetching savings goals", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchSavingsGoals();
  }, []);

  const handleAddTransaction = (type: "savings" | "expense") => {
    setTransactionType(type);
    setIsAddModalOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-subtle animate-fade-in">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="animate-scale-in">
            <DashboardHeader
              onAddSavings={() => handleAddTransaction("savings")}
              onAddExpense={() => handleAddTransaction("expense")}
              onOCRUpload={() => setIsOCRModalOpen(true)}
            />
          </div>

          <div className="space-y-6">
            {/* Savings Goals Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Savings Goals</h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                {savingsData.map((goal, index) => (
                  <div
                    key={goal.id}
                    className="animate-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      onClick={() => setSelectedGoalMembers(goal.id)}
                      className="cursor-pointer"
                    >
                      <SavingsCard {...goal} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budgets Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Budgets</h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                {budgets.map((budget, index) => (
                  <div
                    key={budget.id}
                    className="animate-card"
                    style={{
                      animationDelay: `${(index + savingsGoals.length) * 0.1}s`,
                    }}
                  >
                    <div
                      onClick={() => setSelectedBudgetMembers(budget.id)}
                      className="cursor-pointer"
                    >
                      <BudgetCard {...budget} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <TransactionHistory />
            </div>
          </div>

          <AddTransactionModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            type={transactionType}
            refreshGoals={fetchSavingsGoals}
          />

          <OCRUploadModal
            isOpen={isOCRModalOpen}
            onClose={() => setIsOCRModalOpen(false)}
          />

          {/* Group Members Modal for Savings Goals */}
          <Dialog
            open={!!selectedGoalMembers}
            onOpenChange={() => setSelectedGoalMembers(null)}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {selectedGoalMembers &&
                    savingsData.find((g) => g.id === selectedGoalMembers)
                      ?.title}{" "}
                  - Members
                </DialogTitle>
              </DialogHeader>
              {loadingMembers ? (
                <p className="text-sm text-muted-foreground">
                  Loading members...
                </p>
              ) : (
                <GroupMembers members={members} />
              )}
            </DialogContent>
          </Dialog>

          {/* Group Members Modal for Budgets */}
          <Dialog
            open={!!selectedBudgetMembers}
            onOpenChange={() => setSelectedBudgetMembers(null)}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {selectedBudgetMembers &&
                    budgets.find((b) => b.id === selectedBudgetMembers)
                      ?.title}{" "}
                  - Members
                </DialogTitle>
              </DialogHeader>
              {/* <GroupMembers /> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

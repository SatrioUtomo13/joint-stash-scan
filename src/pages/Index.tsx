import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SavingsCard } from "@/components/SavingsCard";
import { BudgetCard } from "@/components/BudgetCard";
import { TransactionHistory } from "@/components/TransactionHistory";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { OCRUploadModal } from "@/components/OCRUploadModal";
import { GroupMembers } from "@/components/GroupMembers";

const Index = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOCRModalOpen, setIsOCRModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"savings" | "expense">("savings");

  // Mock data - in real app this would come from backend
  const savingsData = {
    currentAmount: 45000000,
    targetAmount: 100000000,
    goalTitle: "Dream House Fund",
    contributors: 4
  };

  const budgetData = {
    totalBudget: 5000000,
    spent: 3250000,
    remaining: 1750000,
    period: "January 2024"
  };

  const handleAddTransaction = (type: "savings" | "expense") => {
    setTransactionType(type);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle animate-fade-in">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="animate-scale-in">
          <DashboardHeader 
            onAddSavings={() => handleAddTransaction("savings")}
            onAddExpense={() => handleAddTransaction("expense")}
            onOCRUpload={() => setIsOCRModalOpen(true)}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" 
                 style={{ animationDelay: '0.1s' }}>
              <div className="animate-card">
                <SavingsCard {...savingsData} />
              </div>
              <div className="animate-card" style={{ animationDelay: '0.2s' }}>
                <BudgetCard {...budgetData} />
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <TransactionHistory />
            </div>
          </div>
          
          <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <GroupMembers />
          </div>
        </div>
        
        <AddTransactionModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          type={transactionType}
        />
        
        <OCRUploadModal 
          isOpen={isOCRModalOpen}
          onClose={() => setIsOCRModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Index;
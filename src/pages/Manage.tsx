import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  PlusCircle,
  Target,
  Wallet,
  Edit,
  Trash2,
  ArrowLeft,
  Scan,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { OCRUploadModal } from "@/components/OCRUploadModal";

import {
  createSavingsGoal,
  getSavingsGoals,
  deleteSavingGoal,
  getSavingGoalById,
  updateSavingGoal,
} from "@/services/goal";

interface SavingsGoal {
  id: string;
  title: string;
  currentAmount: number;
  target: number;
  contributors: number;
}

interface Budget {
  id: string;
  title: string;
  totalBudget: number;
  spent: number;
  period: string;
}

const Manage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: "1",
      title: "Monthly Expenses",
      totalBudget: 5000000,
      spent: 3250000,
      period: "January 2024",
    },
    {
      id: "2",
      title: "Entertainment Budget",
      totalBudget: 2000000,
      spent: 800000,
      period: "January 2024",
    },
  ]);

  const [newSavings, setNewSavings] = useState({
    title: "",
    target: "",
    description: "",
    deadline: "",
    members: [] as string[],
  });
  const [savingsData, setSavingsData] = useState([]);
  const [editingGoal, setEditingGoal] = useState<any | null>(null);

  const [memberInput, setMemberInput] = useState("");
  const [newBudget, setNewBudget] = useState({
    title: "",
    totalBudget: "",
    period: "",
  });

  const [savingsDialogOpen, setSavingsDialogOpen] = useState(false);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  const [addSavingsModalOpen, setAddSavingsModalOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const [ocrModalOpen, setOcrModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const fetchSavingsGoals = async () => {
    try {
      const response = await getSavingsGoals();
      console.log("ini response", response);

      setSavingsData(response);
    } catch (error) {
      toast({ title: "Error fetching savings goals", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchSavingsGoals();
  }, []);

  const fetchSavingGoalById = async (id: string) => {
    try {
      const response = await getSavingGoalById(id);
      setEditingGoal(response);
      setNewSavings({
        title: response.title,
        target: response.target,
        description: response.description ?? "",
        deadline: response.deadline ? response.deadline.split("T")[0] : "",
        members: response.members.map((m: any) => m.email),
      });
      setSavingsDialogOpen(true);
    } catch (error) {
      toast({ title: "Failed to fetch goal detail", variant: "destructive" });
    }
  };

  const handleAddMember = () => {
    if (memberInput.trim() !== "") {
      setNewSavings({
        ...newSavings,
        members: [...newSavings.members, memberInput.trim()],
      });
      setMemberInput(""); // reset input
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      if (memberInput.trim() !== "") {
        setNewSavings({
          ...newSavings,
          members: [...newSavings.members, memberInput.trim()],
        });
        setMemberInput("");
      }
    }
  };

  const handleAddGoal = async () => {
    if (!newSavings.title) {
      toast({
        title: "Please enter a title for the savings goal.",
        variant: "destructive",
      });
      return;
    } else if (!newSavings.target) {
      toast({
        title: "Please enter a target amount for the savings goal.",
        variant: "destructive",
      });
      return;
    }

    if (!newSavings.title || !newSavings.target) return;
    const payload = {
      title: newSavings.title,
      target: parseInt(newSavings.target),
      description: newSavings.description,
      members: newSavings.members,
    };
    try {
      if (editingGoal) {
        const response = await updateSavingGoal(editingGoal.id, payload);
        if (response) {
          setNewSavings({
            title: "",
            target: "",
            description: "",
            deadline: "",
            members: [],
          });
        }
        toast({ title: "Savings goal updated successfully!" });
      } else {
        const response = await createSavingsGoal(payload);
        if (response) {
          setNewSavings({
            title: "",
            target: "",
            description: "",
            deadline: "",
            members: [],
          });
        }
        toast({ title: "Savings goal created successfully!" });
      }

      setSavingsDialogOpen(false);
      fetchSavingsGoals();
    } catch (error) {
      toast({
        title: error.response?.data?.detail || "Error creating savings goal",
        variant: "destructive",
      });
    }
  };

  const handleAddBudget = () => {
    if (!newBudget.title || !newBudget.totalBudget || !newBudget.period) return;

    const budget: Budget = {
      id: Date.now().toString(),
      title: newBudget.title,
      totalBudget: parseInt(newBudget.totalBudget),
      spent: 0,
      period: newBudget.period,
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ title: "", totalBudget: "", period: "" });
    setBudgetDialogOpen(false);
    toast({ title: "Budget created successfully!" });
  };

  const deleteSavings = async (id: string) => {
    try {
      await deleteSavingGoal(id);
      toast({ title: "Savings goal deleted" });
      await fetchSavingsGoals();
    } catch (error) {
      toast({ title: "Error deleting savings goal", variant: "destructive" });
    }
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
    toast({ title: "Budget deleted" });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle animate-fade-in">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover-scale"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Manage Goals & Budgets
          </h1>
        </div>

        {/* Quick Actions Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Button
            onClick={() => setAddSavingsModalOpen(true)}
            className="h-20 flex-col gap-2 bg-gradient-accent hover:shadow-glow hover-scale"
          >
            <Plus className="w-6 h-6" />
            Add Savings
          </Button>

          <Button
            onClick={() => setAddExpenseModalOpen(true)}
            variant="outline"
            className="h-20 flex-col gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary hover-scale"
          >
            <Wallet className="w-6 h-6" />
            Add Expense
          </Button>

          <Button
            onClick={() => setOcrModalOpen(true)}
            variant="secondary"
            className="h-20 flex-col gap-2 hover-scale hover-glow"
          >
            <Scan className="w-6 h-6" />
            Scan Receipt
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Savings Goals Section */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Target className="w-6 h-6 text-accent" />
                Savings Goals
              </h2>
              <Dialog
                open={savingsDialogOpen}
                onOpenChange={setSavingsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="hover-scale">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="animate-scale-in">
                  <DialogHeader>
                    <DialogTitle>
                      {editingGoal
                        ? "Edit Savings Goal"
                        : "Create New Savings Goal"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="goal-title">Goal Title</Label>
                      <Input
                        id="goal-title"
                        placeholder="e.g., Dream House Fund"
                        value={newSavings.title}
                        onChange={(e) =>
                          setNewSavings({
                            ...newSavings,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="target-amount">Target Amount (IDR)</Label>
                      <Input
                        id="target-amount"
                        type="number"
                        placeholder="100000000"
                        value={newSavings.target}
                        onChange={(e) =>
                          setNewSavings({
                            ...newSavings,
                            target: e.target.value,
                          })
                        }
                      />
                      {newSavings.target && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatCurrency(parseInt(newSavings.target))}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="description"
                        value={newSavings.description}
                        onChange={(e) =>
                          setNewSavings({
                            ...newSavings,
                            description: e.target.value,
                          })
                        }
                        placeholder={`Enter description`}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newSavings.deadline}
                        onChange={(e) =>
                          setNewSavings({
                            ...newSavings,
                            deadline: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="members">Add Members</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="members"
                          type="email"
                          placeholder="Enter member email"
                          value={memberInput}
                          onChange={(e) => setMemberInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <Button onClick={handleAddMember}>Add</Button>
                      </div>
                    </div>

                    {/* tampilkan email yang sudah ditambahkan */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newSavings.members.map((email, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full text-sm"
                        >
                          {email}
                          <button
                            type="button"
                            className="flex justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                            onClick={() => {
                              setNewSavings({
                                ...newSavings,
                                members: newSavings.members.filter(
                                  (_, i) => i !== idx
                                ),
                              });
                            }}
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                    <Button onClick={handleAddGoal} className="w-full">
                      {editingGoal ? "Update Goal" : "Create Goal"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {savingsData.map((goal, index) => (
                <Card
                  key={goal.id}
                  className="shadow-card hover:shadow-elegant transition-all animate-card group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{goal.title}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover-scale"
                          onClick={() => fetchSavingGoalById(goal.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            {" "}
                            <Trash2 className="w-4 h-4 hover-scale text-destructive hover:text-destructive" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently remove your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteSavings(goal.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current</p>
                        <p className="font-bold text-accent">
                          {formatCurrency(goal.current_target)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Target</p>
                        <p className="font-semibold">
                          {formatCurrency(goal.target)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <span className="text-sm text-muted-foreground">
                        {goal.members.length} contributors
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Budgets Section */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Wallet className="w-6 h-6 text-primary" />
                Budgets
              </h2>
              <Dialog
                open={budgetDialogOpen}
                onOpenChange={setBudgetDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="hover-scale">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Budget
                  </Button>
                </DialogTrigger>
                <DialogContent className="animate-scale-in">
                  <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="budget-title">Budget Title</Label>
                      <Input
                        id="budget-title"
                        placeholder="e.g., Monthly Expenses"
                        value={newBudget.title}
                        onChange={(e) =>
                          setNewBudget({ ...newBudget, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget-amount">Budget Amount (IDR)</Label>
                      <Input
                        id="budget-amount"
                        type="number"
                        placeholder="5000000"
                        value={newBudget.totalBudget}
                        onChange={(e) =>
                          setNewBudget({
                            ...newBudget,
                            totalBudget: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget-period">Period</Label>
                      <Input
                        id="budget-period"
                        placeholder="e.g., January 2024"
                        value={newBudget.period}
                        onChange={(e) =>
                          setNewBudget({ ...newBudget, period: e.target.value })
                        }
                      />
                    </div>
                    <Button onClick={handleAddBudget} className="w-full">
                      Create Budget
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {budgets.map((budget, index) => (
                <Card
                  key={budget.id}
                  className="shadow-card hover:shadow-elegant transition-all animate-card group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{budget.title}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover-scale"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover-scale text-destructive hover:text-destructive"
                          onClick={() => deleteBudget(budget.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Spent</p>
                        <p className="font-bold">
                          {formatCurrency(budget.spent)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Remaining
                        </p>
                        <p className="font-semibold text-accent">
                          {formatCurrency(budget.totalBudget - budget.spent)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <span className="text-sm text-muted-foreground">
                        {budget.period}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddTransactionModal
        isOpen={addSavingsModalOpen}
        onClose={() => setAddSavingsModalOpen(false)}
        type="savings"
        refreshGoals={fetchSavingsGoals}
      />

      <AddTransactionModal
        isOpen={addExpenseModalOpen}
        onClose={() => setAddExpenseModalOpen(false)}
        type="expense"
        refreshGoals={fetchSavingsGoals}
      />

      <OCRUploadModal
        isOpen={ocrModalOpen}
        onClose={() => setOcrModalOpen(false)}
      />
    </div>
  );
};

export default Manage;

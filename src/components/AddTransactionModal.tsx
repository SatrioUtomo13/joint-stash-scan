import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown } from "lucide-react";
import { depostiSavingGoals } from "@/services/goal";
import { savingGoalsDropdown } from "@/services/dropdown";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "savings" | "expense";
  refreshGoals: () => void;
}

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Other",
];

export const AddTransactionModal = ({
  isOpen,
  onClose,
  type,
  refreshGoals,
}: AddTransactionModalProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [goalOptions, setGoalOptions] = useState<
    { id: number; title: string }[]
  >([]);
  const [selectedGoal, setSelectedGoal] = useState("");

  const fetchGoals = async () => {
    try {
      const response = await savingGoalsDropdown();
      setGoalOptions(response);
    } catch (error) {
      console.error("Error fetching savings goals:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type == "savings") {
      if (!amount) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await depostiSavingGoals(
          selectedGoal,
          parseInt(amount)
        );
        console.log("ini response", response);

        if (response) {
          toast({
            title: "Transaction Added",
            description: `${
              type === "savings" ? "Savings" : "Expense"
            } recorded successfully`,
          });
        }
        refreshGoals();
      } catch (error) {
        console.error("Error adding transaction:", error);
      }
    }

    setIsSubmitting(true);

    // toast({
    //   title: "Transaction Added",
    //   description: `${
    //     type === "savings" ? "Savings" : "Expense"
    //   } recorded successfully`,
    // });

    setIsSubmitting(false);
    setAmount("");
    setDescription("");
    setCategory("");
    onClose();
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");
    if (!numericValue) return "";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(parseInt(numericValue));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "savings" ? (
              <TrendingUp className="w-5 h-5 text-accent" />
            ) : (
              <TrendingDown className="w-5 h-5 text-primary" />
            )}
            Add {type === "savings" ? "Savings" : "Expense"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {type === "savings" && (
              <div>
                <Label htmlFor="goal">Goal</Label>
                <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id.toString()}>
                        {opt.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Label htmlFor="amount">Amount (IDR) *</Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1"
            />
            {amount && (
              <p className="text-sm text-muted-foreground mt-1">
                {formatCurrency(amount)}
              </p>
            )}
          </div>

          {type === "expense" && (
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Enter ${type} description`}
                className="mt-1"
                rows={3}
              />
            </div>
          )}

          {type === "expense" && (
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 ${
                type === "savings"
                  ? "bg-gradient-accent hover:shadow-glow"
                  : "bg-gradient-primary hover:shadow-elegant"
              }`}
            >
              {isSubmitting
                ? "Adding..."
                : `Add ${type === "savings" ? "Savings" : "Expense"}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

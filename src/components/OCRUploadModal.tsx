import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileImage, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OCRUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExtractedData {
  amount: string;
  description: string;
  date: string;
  merchant?: string;
}

// Mock budget data - in real app this would come from backend
const mockBudgets = [
  { id: "1", title: "Monthly Expenses" },
  { id: "2", title: "Entertainment" },
  { id: "3", title: "Food & Dining" },
  { id: "4", title: "Transportation" },
  { id: "5", title: "Shopping" }
];

export const OCRUploadModal = ({ isOpen, onClose }: OCRUploadModalProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    processFile(file);
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    // Note: OCR functionality requires backend integration
    // This simulates the OCR processing
    toast({
      title: "OCR Processing",
      description: "Note: OCR functionality requires Supabase backend integration for AI processing",
      variant: "default"
    });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data
    const mockData: ExtractedData = {
      amount: "450000",
      description: "Supermarket Purchase",
      date: new Date().toISOString().split('T')[0],
      merchant: "Fresh Market"
    };
    
    setExtractedData(mockData);
    setIsProcessing(false);
    
    toast({
      title: "Receipt Processed",
      description: "Transaction details extracted successfully",
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setExtractedData(null);
    setIsProcessing(false);
    setSelectedBudget("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileImage className="w-5 h-5 text-primary" />
            Scan Receipt
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!selectedFile && (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                isDragging ? "border-primary bg-primary/5" : "border-muted"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your receipt image here, or click to select
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
            </div>
          )}

          {selectedFile && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <FileImage className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin ml-auto" />}
                {extractedData && <CheckCircle className="w-4 h-4 text-accent ml-auto" />}
              </div>

              {isProcessing && (
                <div className="text-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Processing receipt with AI...
                  </p>
                </div>
              )}

              {extractedData && (
                <div className="space-y-3">
                  <h3 className="font-medium">Extracted Information:</h3>
                  
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="extracted-amount">Amount (IDR)</Label>
                      <Input
                        id="extracted-amount"
                        value={new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        }).format(parseInt(extractedData.amount))}
                        readOnly
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="extracted-description">Description</Label>
                      <Input
                        id="extracted-description"
                        value={extractedData.description}
                        readOnly
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="extracted-date">Date</Label>
                      <Input
                        id="extracted-date"
                        value={extractedData.date}
                        readOnly
                        className="mt-1"
                      />
                    </div>

                    {extractedData.merchant && (
                      <div>
                        <Label htmlFor="extracted-merchant">Merchant</Label>
                        <Input
                          id="extracted-merchant"
                          value={extractedData.merchant}
                          readOnly
                          className="mt-1"
                        />
                      </div>
                    )}

                    {/* Budget Selection */}
                    <div>
                      <Label htmlFor="budget-select">Assign to Budget</Label>
                      <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select budget category" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockBudgets.map((budget) => (
                            <SelectItem key={budget.id} value={budget.id}>
                              {budget.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="flex-1"
              disabled={isProcessing}
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Close
            </Button>
          </div>

          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <strong>Note:</strong> OCR and AI processing features require backend integration. 
            Connect to Supabase to enable full OCR functionality with receipt scanning and automatic data extraction.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
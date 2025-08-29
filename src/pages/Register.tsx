import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ArrowRight, Wallet, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { register } from "@/services/auth";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return false;
    }
    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/login");

      toast({
        title: "Account created successfully!",
        description: "Welcome to JointStash. You can now start saving together.",
      });

    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = formData.password.length >= 6;
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-glow animate-bounce-gentle">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dompet Kita
          </h1>
          <p className="text-muted-foreground mt-2">
            Start saving together today
          </p>
        </div>

        {/* Register Card */}
        <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm animate-card">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Create account</CardTitle>
            <CardDescription className="text-center">
              Join thousands who save together
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pr-10 transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`transition-colors duration-300 ${passwordStrength ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                      {passwordStrength && <Check className="h-3 w-3 inline mr-1" />}
                      At least 6 characters
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="pr-10 transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {formData.confirmPassword && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`transition-colors duration-300 ${passwordsMatch ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                      {passwordsMatch && <Check className="h-3 w-3 inline mr-1" />}
                      Passwords match
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full group relative overflow-hidden"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? "Creating account..." : "Create account"}
                  {!isLoading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary-glow transition-colors duration-300 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our Terms & Privacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
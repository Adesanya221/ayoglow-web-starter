import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Key, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email.trim() || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      setIsLoading(true);
      // This is where you would normally make an API call to authenticate
      // For now, we'll just simulate a login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      console.log("User logged in:", { email, rememberMe });
      navigate('/');
      
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // This will be implemented later with Google Auth
    console.log("Google login clicked - to be implemented");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary font-playfair">Welcome Back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to your AyoGlow account
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary hover:text-accent"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleGoogleLogin}
            >
              <svg 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.7662 12.2765C23.7662 11.4608 23.7001 10.6406 23.5679 9.83813H12.2446V14.4591H18.7175C18.4602 15.9495 17.5946 17.2679 16.323 18.1056V21.104H20.1902C22.4524 19.014 23.7662 15.9274 23.7662 12.2765Z" fill="#4285F4"/>
                <path d="M12.2446 24.0008C15.4826 24.0008 18.2063 22.9382 20.1944 21.1039L16.3273 18.1055C15.2517 18.8375 13.8627 19.252 12.2489 19.252C9.11618 19.252 6.45647 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.70313 24.0008 12.2446 24.0008Z" fill="#34A853"/>
                <path d="M5.50277 14.3003C4.99981 12.8099 4.99981 11.1961 5.50277 9.70575V6.61487H1.51653C-0.18551 10.0056 -0.18551 14.0004 1.51653 17.3912L5.50277 14.3003Z" fill="#FBBC05"/>
                <path d="M12.2446 4.74966C13.9891 4.7232 15.6782 5.36697 16.9741 6.54867L20.4142 3.12134C18.2559 1.0855 15.2918 -0.034466 12.2446 0.000808666C7.70313 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50284 9.7057C6.45647 6.86173 9.11618 4.74966 12.2446 4.74966Z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primary hover:text-accent">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 
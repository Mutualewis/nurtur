import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Menu, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-poppins text-xl font-bold text-gradient">Nurtur</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <a className="mr-6 flex items-center space-x-2 md:hidden" href="/">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-poppins text-lg font-bold text-gradient">Nurtur</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#features" className="transition-colors hover:text-primary">
              Features
            </a>
            <a href="#assessment" className="transition-colors hover:text-primary">
              Assessment
            </a>
            <a href="#pricing" className="transition-colors hover:text-primary">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hover:text-primary" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button
              size="sm"
              className="shadow-primary hover:shadow-primary/50 transition-shadow"
              onClick={() => window.dispatchEvent(new Event("startAssessment"))}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            <a href="#features" className="block py-2 text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
            <a href="#assessment" className="block py-2 text-sm font-medium transition-colors hover:text-primary">
              Assessment
            </a>
            <a href="#pricing" className="block py-2 text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

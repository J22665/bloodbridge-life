
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Donate", path: "/register-donor" },
    { name: "Request Blood", path: "/request-blood" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-red-600">
            <Heart className="h-6 w-6" />
            <span>BloodBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-red-600 ${
                  isActive(item.path) ? "text-red-600" : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <span>Login</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white">
                    <DropdownMenuItem asChild>
                      <Link to="/login-donor" className="w-full cursor-pointer">
                        Donor Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/login-bloodbank" className="w-full cursor-pointer">
                        Blood Bank Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/login-hospital" className="w-full cursor-pointer">
                        Hospital Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="w-full cursor-pointer">
                        Admin Login
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 flex items-center space-x-1">
                      <span>Register</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white">
                    <DropdownMenuItem asChild>
                      <Link to="/register-donor" className="w-full cursor-pointer">
                        Register as Donor
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register-bloodbank" className="w-full cursor-pointer">
                        Register Blood Bank
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register-hospital" className="w-full cursor-pointer">
                        Register Hospital
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-red-600 ${
                    isActive(item.path) ? "text-red-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/dashboard'}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
                    </Link>
                    <Button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-fit"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm font-medium text-gray-700 mb-2">Login Options:</div>
                    <Link to="/login-donor" className="text-sm text-gray-600 pl-4" onClick={() => setIsOpen(false)}>
                      Donor Login
                    </Link>
                    <Link to="/login-bloodbank" className="text-sm text-gray-600 pl-4" onClick={() => setIsOpen(false)}>
                      Blood Bank Login
                    </Link>
                    <Link to="/login-hospital" className="text-sm text-gray-600 pl-4" onClick={() => setIsOpen(false)}>
                      Hospital Login
                    </Link>
                    <Link to="/login" className="text-sm text-gray-600 pl-4" onClick={() => setIsOpen(false)}>
                      Admin Login
                    </Link>
                    
                    <div className="text-sm font-medium text-gray-700 mt-4 mb-2">Register Options:</div>
                    <Link to="/register-donor" className="text-sm text-gray-600 pl-4" onClick={() => setIsOpen(false)}>
                      Register as Donor
                    </Link>
                    <Link to="/register-bloodbank" className="text-sm text-gray-600 pl-4" onClick={() => setIsOpen(false)}>
                      Register Blood Bank
                    </Link>
                    <Link to="/register-hospital" className="text-sm text-gray-600 pl-4" onClick={() => setIsOpen(false)}>
                      Register Hospital
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

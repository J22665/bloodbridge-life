
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import RegisterDonor from "./pages/RegisterDonor";
import RegisterBloodBank from "./pages/RegisterBloodBank";
import RegisterHospital from "./pages/RegisterHospital";
import RequestBlood from "./pages/RequestBlood";
import MatchingResults from "./pages/MatchingResults";
import Login from "./pages/Login";
import LoginDonor from "./pages/LoginDonor";
import LoginBloodBank from "./pages/LoginBloodBank";
import LoginHospital from "./pages/LoginHospital";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register-donor" element={<RegisterDonor />} />
            <Route path="/register-bloodbank" element={<RegisterBloodBank />} />
            <Route path="/register-hospital" element={<RegisterHospital />} />
            <Route path="/request-blood" element={<RequestBlood />} />
            <Route path="/matching-results" element={<MatchingResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-donor" element={<LoginDonor />} />
            <Route path="/login-bloodbank" element={<LoginBloodBank />} />
            <Route path="/login-hospital" element={<LoginHospital />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

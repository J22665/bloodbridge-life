
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Heart, User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RegisterDonor = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    pinCode: "",
    city: "",
    lastDonationDate: "",
    healthDeclaration: false,
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 65) {
      errors.push("Age must be between 18-65 years");
    }
    if (!formData.gender) errors.push("Gender is required");
    if (!formData.bloodGroup) errors.push("Blood group is required");
    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Valid email is required");
    }
    if (!formData.pinCode.trim() || formData.pinCode.length !== 6) {
      errors.push("Valid 6-digit PIN code is required");
    }
    if (!formData.city.trim()) errors.push("City is required");
    if (!formData.password || formData.password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (formData.password !== formData.confirmPassword) {
      errors.push("Passwords do not match");
    }
    if (!formData.healthDeclaration) {
      errors.push("Health declaration must be accepted");
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with actual registration
      console.log("Registering donor:", formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Welcome to BloodBridge! You can now start saving lives.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-red-50">
              <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Become a Life Saver
              </CardTitle>
              <p className="text-gray-600">
                Join our community of heroes and help save lives through blood donation
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <User className="h-5 w-5 mr-2 text-red-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="65"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="18-65 years"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bloodGroup">Blood Group *</Label>
                      <Select onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-red-600" />
                    Contact Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-red-600" />
                    Location Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pinCode">PIN Code *</Label>
                      <Input
                        id="pinCode"
                        value={formData.pinCode}
                        onChange={(e) => handleInputChange("pinCode", e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Your city"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-red-600" />
                    Medical Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="lastDonationDate">Last Donation Date (Optional)</Label>
                    <Input
                      id="lastDonationDate"
                      type="date"
                      value={formData.lastDonationDate}
                      onChange={(e) => handleInputChange("lastDonationDate", e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Leave blank if you're a first-time donor
                    </p>
                  </div>
                </div>

                {/* Account Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-600" />
                    Account Security
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Min. 6 characters"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Health Declaration */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <Checkbox
                      id="healthDeclaration"
                      checked={formData.healthDeclaration}
                      onCheckedChange={(checked) => handleInputChange("healthDeclaration", checked)}
                      required
                    />
                    <div className="text-sm">
                      <Label htmlFor="healthDeclaration" className="font-medium">
                        Health Declaration *
                      </Label>
                      <p className="text-gray-600 mt-1">
                        I declare that I am in good health, weigh at least 50kg (110 lbs), 
                        and meet all eligibility criteria for blood donation. I understand 
                        that providing false information may disqualify me from donating.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Complete Registration"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegisterDonor;

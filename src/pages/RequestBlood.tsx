
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, Hospital, Phone, MapPin, Droplets, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = [
  { value: "low", label: "Low - Within 7 days", color: "text-green-600" },
  { value: "medium", label: "Medium - Within 2-3 days", color: "text-yellow-600" },
  { value: "high", label: "High - Within 24 hours", color: "text-orange-600" },
  { value: "critical", label: "Critical - Immediate", color: "text-red-600" }
];

const RequestBlood = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    patientName: "",
    contactPerson: "",
    phone: "",
    email: "",
    bloodGroup: "",
    quantity: "",
    urgency: "",
    pinCode: "",
    city: "",
    address: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.hospitalName.trim()) errors.push("Hospital/Organization name is required");
    if (!formData.patientName.trim()) errors.push("Patient name is required");
    if (!formData.contactPerson.trim()) errors.push("Contact person is required");
    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Valid email is required");
    }
    if (!formData.bloodGroup) errors.push("Blood group is required");
    if (!formData.quantity || parseInt(formData.quantity) < 1) {
      errors.push("Valid quantity is required");
    }
    if (!formData.urgency) errors.push("Urgency level is required");
    if (!formData.pinCode.trim() || formData.pinCode.length !== 6) {
      errors.push("Valid 6-digit PIN code is required");
    }
    if (!formData.city.trim()) errors.push("City is required");

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
      // Mock API call - replace with actual request submission
      console.log("Submitting blood request:", formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const requestId = `BR${Date.now()}`;
      
      toast({
        title: "Request Submitted Successfully!",
        description: `Your request ID is ${requestId}. We're finding matching donors.`,
      });
      
      // Navigate to matching results with the request data
      navigate("/matching-results", { 
        state: { 
          requestId,
          bloodGroup: formData.bloodGroup,
          urgency: formData.urgency,
          location: `${formData.city}, ${formData.pinCode}`
        }
      });
    } catch (error) {
      toast({
        title: "Request Failed",
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
            <CardHeader className="text-center bg-blue-50">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Hospital className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Request Blood Donation
              </CardTitle>
              <p className="text-gray-600">
                Connect with verified donors in your area quickly and safely
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hospital/Organization Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Hospital className="h-5 w-5 mr-2 text-blue-600" />
                    Hospital/Organization Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="hospitalName">Hospital/Organization Name *</Label>
                    <Input
                      id="hospitalName"
                      value={formData.hospitalName}
                      onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                      placeholder="Enter hospital or organization name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="patientName">Patient Name *</Label>
                    <Input
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange("patientName", e.target.value)}
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    Contact Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      placeholder="Name of person handling this request"
                      required
                    />
                  </div>

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
                        placeholder="contact@hospital.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Blood Requirement */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-red-600" />
                    Blood Requirement Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bloodGroup">Blood Group Required *</Label>
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
                    <div>
                      <Label htmlFor="quantity">Quantity (Units) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                        placeholder="Number of units needed"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <Select onValueChange={(value) => handleInputChange("urgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <span className={level.color}>{level.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
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

                  <div>
                    <Label htmlFor="address">Complete Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Complete hospital/clinic address"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Any specific requirements, medical conditions, or important information..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                    <div className="text-sm">
                      <h4 className="font-medium text-yellow-800">Important Notice</h4>
                      <p className="text-yellow-700 mt-1">
                        All requests are verified before matching with donors. Emergency requests 
                        are prioritized and processed immediately. You will receive donor contact 
                        information within minutes of submission.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={loading}
                >
                  {loading ? "Submitting Request..." : "Submit Blood Request"}
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

export default RequestBlood;

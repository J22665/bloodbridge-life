
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Mock API call
      console.log("Sending message:", formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600">
              Have questions? Need support? We're here to help save lives together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-red-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
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

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Emergency Contact */}
              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Emergency Blood Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    For critical blood requests that need immediate attention:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-red-600 mr-3" />
                      <span className="font-semibold">+1 (555) BLOOD-99</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-red-600 mr-3" />
                      <span>24/7 Emergency Hotline</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* General Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">support@bloodbridge.org</div>
                      <div className="text-sm text-gray-600">General inquiries</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">+1 (555) 123-4567</div>
                      <div className="text-sm text-gray-600">Mon-Fri 9AM-6PM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">BloodBridge Foundation</div>
                      <div className="text-sm text-gray-600">
                        123 Health Ave, Medical District<br />
                        City, State 12345
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">How do I become a donor?</h4>
                      <p className="text-sm text-gray-600">
                        Click "Become a Donor" and complete our simple registration process.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Is my information secure?</h4>
                      <p className="text-sm text-gray-600">
                        Yes, we use industry-standard encryption and never share personal data.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">How quickly can I find donors?</h4>
                      <p className="text-sm text-gray-600">
                        Most requests are matched within minutes, critical cases immediately.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;

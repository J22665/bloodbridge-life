
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, MapPin, Phone, Mail, Clock, Filter, Users, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  lastDonation: string;
  phone: string;
  email: string;
  distance: number;
  availability: 'available' | 'recently_donated' | 'unavailable';
  city: string;
  verified: boolean;
}

// Mock donor data
const mockDonors: Donor[] = [
  {
    id: "1",
    name: "John Smith",
    bloodGroup: "O+",
    lastDonation: "2024-01-15",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    distance: 2.3,
    availability: "available",
    city: "Downtown",
    verified: true
  },
  {
    id: "2",
    name: "Sarah Johnson",
    bloodGroup: "O+",
    lastDonation: "2023-12-10",
    phone: "+1 (555) 234-5678",
    email: "sarah.j@email.com",
    distance: 4.1,
    availability: "available",
    city: "Midtown",
    verified: true
  },
  {
    id: "3",
    name: "Michael Chen",
    bloodGroup: "O+",
    lastDonation: "2024-05-20",
    phone: "+1 (555) 345-6789",
    email: "m.chen@email.com",
    distance: 1.8,
    availability: "recently_donated",
    city: "Downtown",
    verified: true
  },
  {
    id: "4",
    name: "Emily Davis",
    bloodGroup: "O+",
    lastDonation: "2024-02-28",
    phone: "+1 (555) 456-7890",
    email: "emily.davis@email.com",
    distance: 6.2,
    availability: "available",
    city: "Uptown",
    verified: false
  }
];

const MatchingResults = () => {
  const location = useLocation();
  const { requestId, bloodGroup, urgency, location: requestLocation } = location.state || {};
  const [donors, setDonors] = useState<Donor[]>(mockDonors);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>(mockDonors);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch matching donors
    const fetchDonors = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error Loading Donors",
          description: "Failed to fetch donor information.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  useEffect(() => {
    let filtered = [...donors];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(donor =>
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(donor => donor.availability === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance;
        case "name":
          return a.name.localeCompare(b.name);
        case "lastDonation":
          return new Date(b.lastDonation).getTime() - new Date(a.lastDonation).getTime();
        default:
          return 0;
      }
    });

    setFilteredDonors(filtered);
  }, [donors, searchTerm, statusFilter, sortBy]);

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "recently_donated":
        return <Badge className="bg-yellow-100 text-yellow-800">Recently Donated</Badge>;
      case "unavailable":
        return <Badge className="bg-red-100 text-red-800">Unavailable</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "text-red-600 bg-red-50";
      case "high": return "text-orange-600 bg-orange-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const handleContactDonor = (donor: Donor, method: 'phone' | 'email') => {
    if (method === 'phone') {
      window.open(`tel:${donor.phone}`);
    } else {
      window.open(`mailto:${donor.email}?subject=Blood Donation Request - ${requestId}&body=Hello ${donor.name}, we have an urgent blood donation request for ${bloodGroup} blood type. Request ID: ${requestId}`);
    }
    
    toast({
      title: "Contact Initiated",
      description: `Reaching out to ${donor.name} via ${method}`,
    });
  };

  const handleNotifyDonor = (donor: Donor) => {
    toast({
      title: "Notification Sent",
      description: `${donor.name} has been notified about your request`,
    });
  };

  if (!requestId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Request Found</h1>
          <p className="text-gray-600 mb-8">Please submit a blood request first.</p>
          <Button asChild>
            <Link to="/request-blood">Submit Blood Request</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Request Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Heart className="h-6 w-6 text-red-600 mr-2" />
                Request #{requestId}
              </span>
              <Badge className={`px-3 py-1 ${getUrgencyColor(urgency)}`}>
                {urgency?.toUpperCase()} PRIORITY
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-600 font-bold text-sm">{bloodGroup}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blood Type</p>
                  <p className="font-semibold">{bloodGroup}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold">{requestLocation}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Matching Donors</p>
                  <p className="font-semibold">{filteredDonors.length} found</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="recently_donated">Recently Donated</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Sort by Distance</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="lastDonation">Sort by Last Donation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donor List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding matching donors...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDonors.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Donors Found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                </CardContent>
              </Card>
            ) : (
              filteredDonors.map((donor) => (
                <Card key={donor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                              <span className="text-red-600 font-bold">{donor.bloodGroup}</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                {donor.name}
                                {donor.verified && (
                                  <Badge className="ml-2 bg-blue-100 text-blue-800">Verified</Badge>
                                )}
                              </h3>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{donor.city} • {donor.distance} km away</span>
                              </div>
                            </div>
                          </div>
                          {getAvailabilityBadge(donor.availability)}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Last donation: {new Date(donor.lastDonation).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{donor.phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0 lg:ml-6">
                        <Button
                          onClick={() => handleContactDonor(donor, 'phone')}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          disabled={donor.availability === 'unavailable'}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          onClick={() => handleContactDonor(donor, 'email')}
                          size="sm"
                          variant="outline"
                          disabled={donor.availability === 'unavailable'}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button
                          onClick={() => handleNotifyDonor(donor)}
                          size="sm"
                          variant="secondary"
                          disabled={donor.availability === 'unavailable'}
                        >
                          Notify
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MatchingResults;

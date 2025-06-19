
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Calendar, Phone, MapPin, Award, Bell, User, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface DonationHistory {
  id: string;
  date: string;
  location: string;
  recipient: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface BloodRequest {
  id: string;
  hospitalName: string;
  bloodGroup: string;
  urgency: string;
  location: string;
  distance: number;
  date: string;
  status: 'new' | 'contacted' | 'declined';
}

const Dashboard = () => {
  const { user } = useAuth();
  const [donationHistory, setDonationHistory] = useState<DonationHistory[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    livesSaved: 0,
    nextEligibleDate: null as Date | null,
    availabilityStatus: 'available' as 'available' | 'recently_donated' | 'unavailable'
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setDonationHistory([
      {
        id: "1",
        date: "2024-03-15",
        location: "City General Hospital",
        recipient: "Emergency Patient #1234",
        status: "completed"
      },
      {
        id: "2",
        date: "2024-01-10",
        location: "Regional Medical Center",
        recipient: "Surgery Patient #5678",
        status: "completed"
      }
    ]);

    setBloodRequests([
      {
        id: "BR001",
        hospitalName: "St. Mary's Hospital",
        bloodGroup: user?.bloodType || "O+",
        urgency: "high",
        location: "Downtown Medical District",
        distance: 3.2,
        date: "2024-06-19",
        status: "new"
      },
      {
        id: "BR002",
        hospitalName: "Children's Hospital",
        bloodGroup: user?.bloodType || "O+",
        urgency: "medium",
        location: "Pediatric Center",
        distance: 5.8,
        date: "2024-06-18",
        status: "new"
      }
    ]);

    setStats({
      totalDonations: 2,
      livesSaved: 6, // Assuming 3 lives per donation
      nextEligibleDate: new Date("2024-07-15"),
      availabilityStatus: "available"
    });
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New Request</Badge>;
      case 'contacted':
        return <Badge className="bg-purple-100 text-purple-800">Contacted</Badge>;
      case 'declined':
        return <Badge className="bg-gray-100 text-gray-800">Declined</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleRespondToRequest = (requestId: string, response: 'accept' | 'decline') => {
    setBloodRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: response === 'accept' ? 'contacted' : 'declined' }
          : request
      )
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to access your dashboard.</p>
          <Button asChild>
            <Link to="/login">Go to Login</Link>
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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Thank you for being a life-saving hero in our community.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalDonations}</div>
              <div className="text-sm text-gray-600">Total Donations</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.livesSaved}</div>
              <div className="text-sm text-gray-600">Lives Saved</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-lg font-bold text-gray-900">
                {stats.nextEligibleDate?.toLocaleDateString() || "Available Now"}
              </div>
              <div className="text-sm text-gray-600">Next Eligible</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className={`w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold ${
                stats.availabilityStatus === 'available' ? 'bg-green-600' : 
                stats.availabilityStatus === 'recently_donated' ? 'bg-yellow-600' : 'bg-red-600'
              }`}>
                {user.bloodType}
              </div>
              <div className="text-lg font-bold text-gray-900 capitalize">
                {stats.availabilityStatus.replace('_', ' ')}
              </div>
              <div className="text-sm text-gray-600">Status</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Blood Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-red-600" />
                Active Blood Requests
              </CardTitle>
              <Badge className="bg-red-100 text-red-800">
                {bloodRequests.filter(r => r.status === 'new').length} New
              </Badge>
            </CardHeader>
            <CardContent>
              {bloodRequests.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>No blood requests at the moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bloodRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{request.hospitalName}</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{request.location} • {request.distance} km away</span>
                          </div>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                              <span className="text-red-600 font-bold text-xs">{request.bloodGroup}</span>
                            </div>
                            <span>Blood Type</span>
                          </div>
                          <div className={`font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency.toUpperCase()} Priority
                          </div>
                        </div>
                        
                        {request.status === 'new' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleRespondToRequest(request.id, 'accept')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRespondToRequest(request.id, 'decline')}
                            >
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Donation History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Donation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {donationHistory.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>No donations yet</p>
                  <p className="text-sm">Your first donation will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{donation.location}</h4>
                          <p className="text-sm text-gray-600">{donation.recipient}</p>
                        </div>
                        {getStatusBadge(donation.status)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(donation.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button asChild className="h-16 flex flex-col">
                <Link to="/register-donor">
                  <User className="h-6 w-6 mb-2" />
                  Update Profile
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 flex flex-col">
                <Link to="/request-blood">
                  <Heart className="h-6 w-6 mb-2" />
                  Request Blood
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 flex flex-col">
                <Link to="/contact">
                  <Phone className="h-6 w-6 mb-2" />
                  Get Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

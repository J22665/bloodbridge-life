
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Heart, Hospital, Activity, Search, Filter, Download, Shield, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Donor {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  city: string;
  lastDonation: string;
  totalDonations: number;
  status: 'active' | 'inactive' | 'pending';
  verified: boolean;
}

interface BloodRequest {
  id: string;
  hospitalName: string;
  patientName: string;
  bloodType: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  city: string;
  status: 'pending' | 'matched' | 'fulfilled' | 'cancelled';
  date: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [stats, setStats] = useState({
    totalDonors: 0,
    activeRequests: 0,
    totalHospitals: 0,
    matchesThisMonth: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  useEffect(() => {
    setDonors([
      {
        id: "1",
        name: "John Smith",
        email: "john@email.com",
        bloodType: "O+",
        city: "Downtown",
        lastDonation: "2024-03-15",
        totalDonations: 5,
        status: "active",
        verified: true
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@email.com",
        bloodType: "A+",
        city: "Midtown",
        lastDonation: "2024-02-10",
        totalDonations: 3,
        status: "active",
        verified: true
      },
      {
        id: "3",
        name: "Michael Chen",
        email: "michael@email.com",
        bloodType: "B-",
        city: "Uptown",
        lastDonation: "2024-01-20",
        totalDonations: 2,
        status: "pending",
        verified: false
      }
    ]);

    setRequests([
      {
        id: "BR001",
        hospitalName: "City General Hospital",
        patientName: "Emergency Patient",
        bloodType: "O+",
        urgency: "critical",
        city: "Downtown",
        status: "pending",
        date: "2024-06-19"
      },
      {
        id: "BR002",
        hospitalName: "St. Mary's Hospital",
        patientName: "Surgery Patient",
        bloodType: "A+",
        urgency: "high",
        city: "Midtown",
        status: "matched",
        date: "2024-06-18"
      }
    ]);

    setStats({
      totalDonors: 12450,
      activeRequests: 23,
      totalHospitals: 150,
      matchesThisMonth: 340
    });
  }, []);

  // Chart data
  const bloodTypeData = [
    { name: 'O+', value: 35, color: '#DC2626' },
    { name: 'A+', value: 28, color: '#EA580C' },
    { name: 'B+', value: 15, color: '#D97706' },
    { name: 'AB+', value: 8, color: '#CA8A04' },
    { name: 'O-', value: 6, color: '#65A30D' },
    { name: 'A-', value: 4, color: '#059669' },
    { name: 'B-', value: 3, color: '#0891B2' },
    { name: 'AB-', value: 1, color: '#7C3AED' }
  ];

  const monthlyData = [
    { month: 'Jan', donations: 45, requests: 52 },
    { month: 'Feb', donations: 52, requests: 48 },
    { month: 'Mar', donations: 48, requests: 61 },
    { month: 'Apr', donations: 61, requests: 55 },
    { month: 'May', donations: 55, requests: 67 },
    { month: 'Jun', donations: 67, requests: 73 }
  ];

  const getStatusBadge = (status: string, type: 'donor' | 'request' = 'donor') => {
    const styles = {
      donor: {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800'
      },
      request: {
        pending: 'bg-yellow-100 text-yellow-800',
        matched: 'bg-blue-100 text-blue-800',
        fulfilled: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
    };
    
    return (
      <Badge className={styles[type][status as keyof typeof styles[typeof type]] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleApproveReject = (donorId: string, action: 'approve' | 'reject') => {
    setDonors(prev =>
      prev.map(donor =>
        donor.id === donorId
          ? { ...donor, status: action === 'approve' ? 'active' : 'inactive', verified: action === 'approve' }
          : donor
      )
    );
  };

  const handleExportData = () => {
    console.log("Exporting data...");
    // Implement export functionality
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need administrator privileges to access this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage donors, requests, and monitor platform performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalDonors.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Donors</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.activeRequests}</div>
              <div className="text-sm text-gray-600">Active Requests</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <Hospital className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalHospitals}</div>
              <div className="text-sm text-gray-600">Partner Hospitals</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.matchesThisMonth}</div>
              <div className="text-sm text-gray-600">Matches This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {['overview', 'donors', 'requests', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Activity
                  <Button size="sm" variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">New donor registered</p>
                        <p className="text-sm text-gray-600">Sarah Johnson (A+) from Midtown</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <Hospital className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Blood request matched</p>
                        <p className="text-sm text-gray-600">O+ request from City General</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">15 min ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Critical request pending</p>
                        <p className="text-sm text-gray-600">AB- needed urgently</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-16 flex flex-col bg-red-600 hover:bg-red-700">
                    <Users className="h-6 w-6 mb-2" />
                    Approve Donors
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Heart className="h-6 w-6 mb-2" />
                    Match Requests
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Hospital className="h-6 w-6 mb-2" />
                    Add Hospital
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'donors' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Donor Management</CardTitle>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search donors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donors.map((donor) => (
                  <div key={donor.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-red-600 font-bold text-sm">{donor.bloodType}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 flex items-center">
                              {donor.name}
                              {donor.verified && (
                                <Badge className="ml-2 bg-blue-100 text-blue-800">Verified</Badge>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">{donor.email}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>City: {donor.city}</div>
                          <div>Last Donation: {new Date(donor.lastDonation).toLocaleDateString()}</div>
                          <div>Total Donations: {donor.totalDonations}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(donor.status)}
                        {donor.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveReject(donor.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproveReject(donor.id, 'reject')}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'requests' && (
          <Card>
            <CardHeader>
              <CardTitle>Blood Request Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{request.hospitalName}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={`px-3 py-1 ${getUrgencyColor(request.urgency)}`}>
                              {request.urgency.toUpperCase()}
                            </Badge>
                            {getStatusBadge(request.status, 'request')}
                          </div>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>Patient: {request.patientName}</div>
                          <div>Blood Type: <span className="font-bold text-red-600">{request.bloodType}</span></div>
                          <div>Location: {request.city}</div>
                          <div>Date: {new Date(request.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Blood Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Blood Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bloodTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {bloodTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Donations vs Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="#DC2626" name="Donations" />
                    <Bar dataKey="requests" fill="#2563EB" name="Requests" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

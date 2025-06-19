
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, MapPin, Clock, Shield, Award, Phone, Mail, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { label: "Active Donors", value: "12,450", icon: Users },
  { label: "Lives Saved", value: "8,320", icon: Heart },
  { label: "Cities Covered", value: "150", icon: MapPin },
  { label: "Avg Response Time", value: "24 mins", icon: Clock },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Donor",
    content: "BloodBridge made it so easy to donate. I've saved 3 lives this year!",
    avatar: "SJ",
    rating: 5
  },
  {
    name: "Dr. Michael Chen",
    role: "Emergency Physician", 
    content: "This platform helps us find donors quickly during critical situations.",
    avatar: "MC",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Patient Family",
    content: "Found a donor in 20 minutes when my father needed emergency blood.",
    avatar: "PS",
    rating: 5
  }
];

const howItWorks = [
  {
    step: "1",
    title: "Register as Donor",
    description: "Complete your health profile and blood type information",
    icon: Users
  },
  {
    step: "2", 
    title: "Get Matched",
    description: "Our system connects you with nearby patients in need",
    icon: Heart
  },
  {
    step: "3",
    title: "Save Lives", 
    description: "Donate blood and make a direct impact on someone's life",
    icon: Award
  }
];

const features = [
  {
    title: "24/7 Emergency Support",
    description: "Round-the-clock assistance for urgent blood requirements",
    icon: Phone,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Verified Donors",
    description: "All donors are medically verified and regularly screened",
    icon: Shield,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Instant Notifications",
    description: "Get real-time alerts when your blood type is needed nearby",
    icon: Mail,
    color: "bg-green-100 text-green-600"
  }
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Background Pattern */}
      <section className="relative bg-gradient-to-br from-red-50 via-pink-50 to-red-100 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5 backdrop-blur-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-pulse delay-75"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-300 rounded-full opacity-15 animate-pulse delay-150"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 text-white rounded-full mb-6 animate-pulse-heart">
                <Heart className="w-10 h-10" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in leading-tight">
              Bridge the Gap Between
              <span className="text-red-600 block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Donors & Lives
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 animate-fade-in max-w-3xl mx-auto leading-relaxed">
              Connect blood donors with patients in need through our smart matching platform. 
              Every donation saves up to 3 lives and creates hope for families.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link to="/register-donor">
                  <Heart className="mr-3 h-6 w-6" />
                  Become a Donor
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link to="/request-blood">
                  <Shield className="mr-3 h-6 w-6" />
                  Request Blood
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Enhanced Design */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-gray-600">Making a difference across communities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BloodBridge?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of donors and healthcare professionals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className={`${feature.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with Enhanced Visual Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How BloodBridge Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our smart platform makes blood donation simple, fast, and impactful. 
              Join thousands who are already making a difference.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-10">
                    <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                      {item.step}
                    </div>
                    <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <div className="w-12 h-0.5 bg-red-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              BloodBridge is more than a platform – it's a lifeline. We're building a community where 
              generosity meets technology to ensure no patient waits for blood when every second counts. 
              Our smart matching system connects verified donors with nearby patients, creating a seamless 
              bridge between those who can give and those who need.
            </p>
            <div className="grid md:grid-cols-2 gap-10 mt-16">
              <Card className="p-8 border-l-4 border-l-red-600 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">For Donors</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Track your impact, get reminders for eligible donation dates, and receive instant 
                  notifications when someone nearby needs your blood type. Be a hero in your community.
                </p>
              </Card>
              <Card className="p-8 border-l-4 border-l-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">For Hospitals</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Access our verified donor network, manage blood requests efficiently, and reduce 
                  critical waiting times with real-time matching and emergency support.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Stories of Impact</h2>
            <p className="text-xl text-gray-600">Real people, real lives saved through BloodBridge</p>
          </div>
          <Card className="max-w-3xl mx-auto shadow-2xl border-0">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-2xl text-gray-700 italic mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div>
                  <div className="font-semibold text-xl text-gray-900 mb-2">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-red-600 font-medium text-lg">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-75"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join our community of heroes. Every donation matters, every life counts. 
            Start your journey of giving today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Link to="/register-donor">
                <Heart className="mr-3 h-6 w-6" />
                Start Donating Today
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Link to="/about">
                <Award className="mr-3 h-6 w-6" />
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, MapPin, Clock, Shield, Award } from "lucide-react";
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
    avatar: "SJ"
  },
  {
    name: "Dr. Michael Chen",
    role: "Emergency Physician",
    content: "This platform helps us find donors quickly during critical situations.",
    avatar: "MC"
  },
  {
    name: "Priya Sharma",
    role: "Patient Family",
    content: "Found a donor in 20 minutes when my father needed emergency blood.",
    avatar: "PS"
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-red-100 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Bridge the Gap Between
              <span className="text-red-600 block">Donors & Lives</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Connect blood donors with patients in need through our smart matching platform. 
              Every donation saves up to 3 lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                <Link to="/register-donor">
                  <Heart className="mr-2 h-5 w-5" />
                  Become a Donor
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3">
                <Link to="/request-blood">
                  <Shield className="mr-2 h-5 w-5" />
                  Request Blood
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-red-600/5 backdrop-blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-red-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How BloodBridge Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our smart platform makes blood donation simple, fast, and impactful
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              BloodBridge is more than a platform – it's a lifeline. We're building a community where 
              generosity meets technology to ensure no patient waits for blood when every second counts. 
              Our smart matching system connects verified donors with nearby patients, creating a seamless 
              bridge between those who can give and those who need.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="p-6 border-l-4 border-l-red-600">
                <h3 className="text-xl font-semibold mb-3">For Donors</h3>
                <p className="text-gray-600">
                  Track your impact, get reminders for eligible donation dates, and receive instant 
                  notifications when someone nearby needs your blood type.
                </p>
              </Card>
              <Card className="p-6 border-l-4 border-l-blue-600">
                <h3 className="text-xl font-semibold mb-3">For Hospitals</h3>
                <p className="text-gray-600">
                  Access our verified donor network, manage blood requests efficiently, and reduce 
                  critical waiting times with real-time matching.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories of Impact</h2>
            <p className="text-lg text-gray-600">Real people, real lives saved</p>
          </div>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <p className="text-lg text-gray-700 italic mb-4">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-red-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of heroes. Every donation matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              <Link to="/register-donor">Start Donating Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

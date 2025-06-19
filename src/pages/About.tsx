
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Shield, Target, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    name: "Dr. Sarah Williams",
    role: "Chief Medical Officer",
    image: "SW",
    bio: "15+ years in emergency medicine, passionate about blood donation awareness"
  },
  {
    name: "Alex Chen",
    role: "Technology Director",
    image: "AC",
    bio: "Former healthcare tech entrepreneur, building life-saving platforms"
  },
  {
    name: "Maria Rodriguez",
    role: "Community Outreach Manager",
    image: "MR",
    bio: "Coordinating with hospitals and donors to maximize impact"
  }
];

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "Every decision we make is guided by our commitment to saving lives and supporting those in need."
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "We maintain the highest standards of verification, privacy, and security for all our users."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Building a strong network of donors, hospitals, and volunteers working together."
  },
  {
    icon: Target,
    title: "Impact Focused",
    description: "Measuring success by lives saved and communities strengthened through our platform."
  }
];

const impact = [
  { number: "12,450", label: "Active Donors", description: "Verified blood donors ready to help" },
  { number: "8,320", label: "Lives Saved", description: "Direct impact through successful matches" },
  { number: "150", label: "Partner Hospitals", description: "Medical facilities in our network" },
  { number: "45", label: "Cities Covered", description: "Expanding reach across regions" }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-red-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bridging Hearts, Saving Lives
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              BloodBridge was born from a simple belief: no one should lose their life 
              waiting for blood when generous donors are ready to help. We're building 
              technology that connects hearts and saves lives, one donation at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600">
                Creating a world where blood scarcity is no longer a barrier to medical care
              </p>
            </div>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Why BloodBridge Exists</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Every two seconds, someone needs blood. Yet finding compatible donors quickly 
                  remains a critical challenge for hospitals worldwide. Traditional methods of 
                  donor outreach are slow, inefficient, and often fail when time matters most.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  BloodBridge solves this by creating an intelligent network that instantly 
                  connects verified donors with patients in need, using location-based matching, 
                  real-time availability, and secure communication channels to ensure no request 
                  goes unanswered.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Measuring success through lives touched and communities strengthened
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <Card key={index} className="text-center bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Passionate professionals dedicated to making blood donation accessible
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {member.image}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-red-600 font-medium mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Make a Difference */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Make a Difference</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Donors</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                    <div>
                      <strong>Smart Notifications:</strong> Get alerted when someone nearby needs your blood type
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                    <div>
                      <strong>Impact Tracking:</strong> See exactly how many lives you've helped save
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                    <div>
                      <strong>Health Reminders:</strong> Automatic notifications when you're eligible to donate again
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Hospitals</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div>
                      <strong>Instant Matching:</strong> Find compatible donors within minutes, not hours
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div>
                      <strong>Verified Network:</strong> Access to pre-screened, health-verified donors
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div>
                      <strong>Priority System:</strong> Critical cases get immediate attention and faster responses
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Globe className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Vision for the Future</h2>
            <p className="text-xl mb-8 opacity-90">
              We envision a world where blood shortages are eliminated through technology, 
              community, and compassion. A world where every hospital has instant access 
              to the donors they need, and every donor can see the direct impact of their generosity.
            </p>
            <p className="text-lg opacity-80">
              Join us in building this future, one donation at a time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

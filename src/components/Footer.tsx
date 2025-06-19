
import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
              <Heart className="h-6 w-6 text-red-500" />
              <span>BloodBridge</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Connecting hearts, saving lives. Building bridges between donors and those in need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/register-donor" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Become a Donor
              </Link>
              <Link to="/request-blood" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Request Blood
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white text-sm transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Help Center
              </Link>
              <Link to="/privacy" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="block text-gray-400 hover:text-white text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@bloodbridge.org</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Emergency 24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 BloodBridge. All rights reserved. Saving lives, one donation at a time.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <div className="w-5 h-5 bg-gray-400 hover:bg-white rounded transition-colors"></div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <div className="w-5 h-5 bg-gray-400 hover:bg-white rounded transition-colors"></div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <div className="w-5 h-5 bg-gray-400 hover:bg-white rounded transition-colors"></div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useRef, useEffect } from 'react';
import { Shield, Upload, Search, Bell, X, AlertTriangle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Shield className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Upload className="w-4 h-4" /> },
    { name: 'Verify', path: '/verify', icon: <Search className="w-4 h-4" /> },
    { name: 'Admin', path: '/admin', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <nav className="w-full border-b border-white/10 bg-dark-paper/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              DigiProof AI
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4 relative" ref={notificationRef}>
            
            {/* Notification Bell */}
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                if(unreadCount > 0) setUnreadCount(0); // Mark as read
              }}
              className="relative p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-dark animate-pulse"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-4 right-0 w-[350px] bg-dark-paper border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between p-4 border-b border-white/5 bg-dark/30">
                    <h3 className="font-bold text-white">Theft Alerts</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-2 max-h-[300px] overflow-y-auto">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-2 flex items-start space-x-3 cursor-pointer hover:bg-red-500/15 transition-colors">
                      <div className="mt-0.5">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-red-300 mb-1">Unauthorized Upload Detected!</p>
                        <p className="text-xs text-slate-300 mb-2">Our web-crawlers found a 96% match of your registered asset "DPAI-A8F92B" uploaded on <strong className="text-white">Twitter & TikTok</strong> just 10 mins ago.</p>
                        <Link to="/verify" onClick={() => setShowNotifications(false)} className="text-xs font-bold text-red-400 hover:text-red-300 underline">
                          Review & Send Takedown Notice &rarr;
                        </Link>
                      </div>
                    </div>
                    {/* Older notification */}
                    <div className="p-3 rounded-xl flex items-start space-x-3 opacity-60">
                      <div className="mt-0.5"><Shield className="w-5 h-5 text-emerald-400" /></div>
                      <div>
                        <p className="text-sm font-bold text-white mb-1">Weekly Report</p>
                        <p className="text-xs text-slate-400">Zero unauthorized copies detected across 1,402 monitored sites this week.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Link 
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primary-dark text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

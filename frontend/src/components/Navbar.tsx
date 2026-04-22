import { useState, useRef, useEffect } from 'react';
import { Shield, Upload, Search, Bell, X, AlertTriangle, User, Settings, Key, CreditCard, HardDrive, LogOut, Radio } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

const Navbar = ({ role }: { role?: 'user' | 'admin' }) => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [authModal, setAuthModal] = useState<{isOpen: boolean, mode: 'login' | 'register'}>({ isOpen: false, mode: 'login' });
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Shield className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Upload className="w-4 h-4" /> },
    { name: 'Verify', path: '/verify', icon: <Search className="w-4 h-4" /> },
    { name: 'Pro Tools', path: '/tools', icon: <Radio className="w-4 h-4" /> },
  ];

  if (role === 'admin') {
    navLinks.push({ name: 'Admin', path: '/admin', icon: <Shield className="w-4 h-4" /> });
  }

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

            {/* User Profile Avatar / Logged In State */}
            <div className="relative flex items-center space-x-3 ml-4 pl-4 border-l border-white/10" ref={profileRef}>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-white">{role === 'admin' ? 'Administrator' : 'Creator'}</span>
                <span className={`text-[10px] font-medium tracking-wide ${role === 'admin' ? 'text-amber-400' : 'text-green-400'}`}>
                  {role === 'admin' ? 'ROOT ACCESS' : 'VERIFIED'}
                </span>
              </div>
              <div 
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] cursor-pointer hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
              >
                <div className="w-full h-full rounded-full bg-dark flex items-center justify-center border-2 border-dark">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-4 right-0 w-[320px] bg-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 ring-1 ring-black/5"
                  >
                    {/* Header: User Info */}
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-b border-white/5 flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                        <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-md font-bold text-white leading-tight">Amrit Kumar Sah</p>
                        <p className="text-xs text-slate-400">amrit@digiproof.ai</p>
                        <div className={`inline-block px-2 py-0.5 mt-1 text-[9px] font-bold uppercase tracking-wider rounded-md border ${
                          role === 'admin' 
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        }`}>
                          {role === 'admin' ? 'System Admin' : 'Enterprise Plan'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Quota / Storage Bar */}
                    <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-slate-300 flex items-center"><HardDrive className="w-3 h-3 mr-1.5" /> Storage Quota</span>
                        <span className="text-xs font-bold text-white">45GB / 100GB</span>
                      </div>
                      <div className="w-full bg-dark-paper rounded-full h-1.5 border border-white/5 overflow-hidden">
                        <div className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 divide-x divide-white/5 border-b border-white/5 bg-white/[0.01]">
                      <div className="p-3 text-center">
                        <p className="text-2xl font-black text-white">12</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">Asset Registry</p>
                      </div>
                      <div className="p-3 text-center">
                        <p className="text-2xl font-black text-white">34</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">AI Verifications</p>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="p-2 space-y-0.5">
                      <Link 
                        to="/settings?tab=account"
                        onClick={() => setShowProfile(false)}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-slate-300 hover:text-white"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium">Account Settings</span>
                      </Link>
                    </div>

                    {/* Logout Footer */}
                    <div className="p-2 border-t border-white/5 bg-dark-paper">
                      <button 
                        onClick={() => window.location.reload()}
                        className="w-full flex items-center justify-center space-x-2 py-2.5 text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out from DigiProof</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={authModal.isOpen} 
        mode={authModal.mode} 
        onClose={() => setAuthModal({ ...authModal, isOpen: false })} 
      />
    </nav>
  );
};

export default Navbar;

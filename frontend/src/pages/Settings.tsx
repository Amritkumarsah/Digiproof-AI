import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Shield, Bell, CreditCard, Key, Smartphone, HardDrive, Download, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [showLiveKey, setShowLiveKey] = useState(false);
  const [showTestKey, setShowTestKey] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  // Parse URL to set active tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, [location]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/settings?tab=${tab}`);
  };

  const tabs = [
    { id: 'account', label: 'Account Profile', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security & Alerts', icon: <Shield className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing & Subscription', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'api', label: 'Developer API Keys', icon: <Key className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences, billing, and security.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-dark-paper border border-white/5 rounded-2xl p-2 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  activeTab === tab.id 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Account Tab */}
          {activeTab === 'account' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                    <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <input 
                      type="file" 
                      ref={avatarRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={() => toast.success("Profile avatar updated successfully!")}
                    />
                    <button 
                      onClick={() => avatarRef.current?.click()}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors mb-2"
                    >
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Full Name</label>
                    <input type="text" defaultValue={localStorage.getItem('userName') || "Amrit Kumar Sah"} className="w-full bg-dark/50 border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary p-3 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Email Address</label>
                    <input type="email" defaultValue={localStorage.getItem('userEmail') || "amrit@digiproof.ai"} className="w-full bg-dark/50 border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary p-3 transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Bio / Company Name</label>
                    <input type="text" defaultValue="Independent Creator" className="w-full bg-dark/50 border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary p-3 transition-colors" />
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
                  <button 
                    onClick={() => {
                      toast.loading("Saving changes...", { duration: 800 });
                      setTimeout(() => toast.success("Profile information saved!"), 800);
                    }}
                    className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Appearance & Preferences</h2>
                <div className="flex items-center justify-between p-4 bg-dark/50 rounded-xl border border-white/5">
                  <div>
                    <p className="text-white font-medium">Dark Mode</p>
                    <p className="text-sm text-slate-400">Use dark theme across the application.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      defaultChecked={true} 
                      onChange={(e) => {
                        if(e.target.checked) toast.success("Dark mode enabled!");
                        else toast("Light mode is disabled for MVP", { icon: "🌙" });
                      }}
                    />
                    <div className="w-11 h-6 bg-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
                
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <input type="password" placeholder="Current Password" id="curr_pass" className="w-full bg-dark/50 border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary p-3" />
                    <input type="password" placeholder="New Password" id="new_pass" className="w-full bg-dark/50 border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary p-3" />
                    <button 
                      onClick={() => {
                        const curr = document.getElementById('curr_pass') as HTMLInputElement;
                        const newP = document.getElementById('new_pass') as HTMLInputElement;
                        if(!curr.value || !newP.value) {
                          toast.error("Please fill in both password fields");
                          return;
                        }
                        toast.success("Password updated securely!");
                        curr.value = '';
                        newP.value = '';
                      }}
                      className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-sm font-bold text-white mb-4">Two-Factor Authentication (2FA)</h3>
                  <div className={`flex items-center justify-between p-4 bg-dark/50 rounded-xl border ${is2FAEnabled ? 'border-primary/30' : 'border-white/5'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${is2FAEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Authenticator App</p>
                        <p className="text-sm text-slate-400">
                          {is2FAEnabled ? 'Currently active and securing your account.' : 'Two-factor authentication is disabled.'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setIs2FAEnabled(!is2FAEnabled);
                        if(is2FAEnabled) toast.error("2FA Disabled. Your account is less secure.");
                        else toast.success("2FA Enabled via Authenticator!");
                      }}
                      className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                        is2FAEnabled ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}
                    >
                      {is2FAEnabled ? 'Disable' : 'Enable 2FA'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Takedown Alerts', desc: 'Get notified immediately when an unauthorized copy is detected.' },
                    { title: 'Weekly Digest', desc: 'A summary of your protected assets and AI scans.' },
                    { title: 'Marketing Updates', desc: 'Receive news about new features and updates.' },
                  ].map((notif, idx) => (
                    <div key={idx} className="flex items-start justify-between">
                      <div>
                        <p className="text-white font-medium">{notif.title}</p>
                        <p className="text-sm text-slate-400">{notif.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          defaultChecked={idx !== 2} 
                          onChange={(e) => {
                            if(e.target.checked) toast.success(`${notif.title} enabled`);
                            else toast(`${notif.title} disabled`, { icon: '🔕' });
                          }}
                        />
                        <div className="w-11 h-6 bg-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              {/* Current Plan */}
              <div className="bg-gradient-to-br from-primary/10 via-dark-paper to-dark-paper border border-primary/20 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Current Subscription</h2>
                    <p className="text-slate-400">You are currently on the Enterprise Plan.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-white">$99<span className="text-lg text-slate-400 font-medium">/mo</span></p>
                    <p className="text-xs text-emerald-400 font-bold mt-1">Next billing date: May 15, 2026</p>
                  </div>
                </div>

                <div className="bg-dark/50 rounded-xl p-4 border border-white/5 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-300 flex items-center"><HardDrive className="w-4 h-4 mr-2" /> Storage & AI Quota</span>
                    <span className="text-sm font-bold text-white">45GB / 100GB Used</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2 overflow-hidden mb-2">
                    <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={() => toast("Redirecting to Stripe checkout...", { icon: "💳" })}
                    className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-all"
                  >
                    Upgrade Plan
                  </button>
                  <button 
                    onClick={() => toast.error("Subscription cancellation initiated.")}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Payment Methods</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Credit Card */}
                  <div 
                    onClick={() => toast.success("Visa Card ending in 4242 set as default")}
                    className="p-4 bg-dark rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="mb-4">
                      <CreditCard className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-white font-bold tracking-widest">•••• •••• •••• 4242</p>
                    <p className="text-sm text-slate-400 mt-1">Expires 12/28 • Visa</p>
                  </div>

                  {/* UPI Method */}
                  <div 
                    onClick={() => toast.success("Google Pay UPI set as default")}
                    className="p-4 bg-dark rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <div className="mb-4 flex items-center space-x-2">
                      <div className="px-2 py-1 bg-white rounded-md text-black font-black text-xs italic">UPI</div>
                      <span className="text-slate-400 text-sm">Auto-Pay Enabled</span>
                    </div>
                    <p className="text-white font-bold">{(localStorage.getItem('userEmail') || 'user').split('@')[0]}@okhdfcbank</p>
                    <p className="text-sm text-slate-400 mt-1">Google Pay</p>
                  </div>
                </div>

                <button 
                  onClick={() => toast("Redirecting to payment gateway...", { icon: "🔒" })}
                  className="w-full py-3 border border-dashed border-white/20 hover:border-white/40 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center font-medium"
                >
                  + Add New Payment Method
                </button>
              </div>

              {/* Invoice History */}
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Invoice History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase bg-dark/50 border-b border-white/5">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">Date</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 rounded-tr-lg">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: 'Apr 15, 2026', amount: '$99.00', status: 'Paid' },
                        { date: 'Mar 15, 2026', amount: '$99.00', status: 'Paid' },
                        { date: 'Feb 15, 2026', amount: '$99.00', status: 'Paid' },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5">
                          <td className="px-4 py-4 text-white">{row.date}</td>
                          <td className="px-4 py-4 text-white font-bold">{row.amount}</td>
                          <td className="px-4 py-4"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-md">{row.status}</span></td>
                          <td className="px-4 py-4">
                            <button 
                              onClick={() => toast.success(`Downloading Invoice for ${row.date}...`)}
                              className="text-primary hover:underline flex items-center font-medium"
                            >
                              <Download className="w-4 h-4 mr-1" /> PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-2">Developer API Keys</h2>
                <p className="text-slate-400 text-sm mb-6">Use these keys to authenticate API requests from your application.</p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-dark/50 border border-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium mb-1">Production Key</p>
                      <p className="text-xs text-slate-500 font-mono">
                        {showLiveKey ? "dp_live_8f92bd89q24xmv0z2" : "dp_live_8f92bd89q24..."} 
                        <span onClick={() => setShowLiveKey(!showLiveKey)} className="text-primary cursor-pointer hover:underline ml-2">
                          {showLiveKey ? "Hide" : "Reveal"}
                        </span>
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText("dp_live_8f92bd89q24xmv0z2");
                        toast.success("Production Key copied to clipboard!");
                      }}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="p-4 bg-dark/50 border border-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium mb-1">Test Key</p>
                      <p className="text-xs text-slate-500 font-mono">
                        {showTestKey ? "dp_test_1f3ab820cx99l1" : "dp_test_1f3ab820cx..."} 
                        <span onClick={() => setShowTestKey(!showTestKey)} className="text-primary cursor-pointer hover:underline ml-2">
                          {showTestKey ? "Hide" : "Reveal"}
                        </span>
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText("dp_test_1f3ab820cx99l1");
                        toast.success("Test Key copied to clipboard!");
                      }}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;

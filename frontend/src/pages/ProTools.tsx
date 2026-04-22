import { useState } from 'react';
import { Globe, Code, Shield, Radio, PlayCircle, AlertTriangle, CheckCircle, Copy, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ProTools = () => {
  const [activeTab, setActiveTab] = useState<'whitelisting' | 'livestream'>('whitelisting');
  const [domain, setDomain] = useState('');
  const [whitelistedDomains, setWhitelistedDomains] = useState<string[]>(['myportfolio.com']);
  const [streamUrl, setStreamUrl] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [streamAlert, setStreamAlert] = useState<boolean>(false);

  const handleAddDomain = () => {
    if (domain && !whitelistedDomains.includes(domain)) {
      setWhitelistedDomains([...whitelistedDomains, domain]);
      setDomain('');
      toast.success("Domain added to whitelist!");
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText('<script src="https://api.digiproof.ai/v1/asset-lock.js" data-client="DPAI-USER-9021"></script>');
    toast.success("Script copied to clipboard!");
  };

  const handleStartMonitoring = () => {
    if (!streamUrl) {
      toast.error("Please enter a stream URL");
      return;
    }
    setIsMonitoring(true);
    setStreamAlert(false);

    // Mock finding a stolen stream after 4 seconds
    setTimeout(() => {
      setStreamAlert(true);
      toast("Unauthorized broadcast detected!", { icon: "🚨" });
    }, 4000);
  };

  const handleSendEmail = () => {
    const emailTo = "legal@kick.com";
    const subject = encodeURIComponent("URGENT: DMCA Takedown Notice - Unauthorized Live Stream");
    const body = encodeURIComponent(
      `To the Legal Department at Kick.com,\n\n` +
      `I am the authorized copyright owner of the registered digital stream.\n\n` +
      `The DigiProof AI system has detected an unauthorized, infringing rebroadcast of my copyrighted live stream at the following location:\n` +
      `https://kick.com/stolen-restream-402\n\n` +
      `I request that you immediately disable access to this infringing content.\n` +
      `I have a good faith belief that the use of the material is not authorized.\n\n` +
      `Automated by DigiProof AI Legal System\n` +
      `${new Date().toLocaleDateString()}`
    );
    
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    toast.success("Opening Email Client with Drafted Notice!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-3 flex items-center justify-center">
          <Shield className="w-8 h-8 text-secondary mr-3" />
          Pro Creator Tools
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Next-generation features to protect your digital identity across the web and live platforms.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-dark/50 p-1.5 rounded-2xl border border-white/5 inline-flex">
          <button 
            onClick={() => setActiveTab('whitelisting')}
            className={`flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'whitelisting' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-4 h-4 mr-2" /> Smart Domain Whitelisting
          </button>
          <button 
            onClick={() => setActiveTab('livestream')}
            className={`flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'livestream' ? 'bg-secondary/20 text-secondary' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-4 h-4 mr-2" /> Live Stream Piracy Monitor
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Domain Whitelisting Tool */}
        {activeTab === 'whitelisting' && (
          <motion.div 
            key="whitelisting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-2">Dynamic Asset Blocking</h2>
                <p className="text-sm text-slate-400 mb-6">
                  Prevent image hotlinking and unauthorized downloads. Add our script to your site, and your images will only render clearly on whitelisted domains.
                </p>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Allowed Domains</label>
                  <div className="flex space-x-3 mb-4">
                    <input 
                      type="text" 
                      placeholder="e.g., myblog.com" 
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="flex-1 bg-dark/50 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:ring-primary focus:border-primary transition-all"
                    />
                    <button onClick={handleAddDomain} className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {whitelistedDomains.map(d => (
                      <span key={d} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 flex items-center">
                        <CheckCircle className="w-3 h-3 text-emerald-400 mr-2" /> {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Protection Script</label>
                  <div className="relative group">
                    <pre className="bg-dark p-4 rounded-xl border border-white/10 text-xs text-primary font-mono overflow-x-auto">
                      {`<script src="https://api.digiproof.ai/v1/asset-lock.js" data-client="DPAI-USER-9021"></script>`}
                    </pre>
                    <button 
                      onClick={handleCopyScript}
                      className="absolute top-3 right-3 p-2 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Paste this inside the &lt;head&gt; tag of your website.</p>
                </div>
              </div>
            </div>

            <div className="bg-dark-paper border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              <h3 className="text-lg font-bold text-white mb-6 z-10 w-full text-left">Live Preview</h3>
              
              <div className="flex flex-col space-y-8 w-full z-10">
                <div>
                  <p className="text-xs font-bold text-emerald-400 uppercase mb-2">On Whitelisted Domain (myportfolio.com)</p>
                  <div className="w-full h-32 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-white font-medium">Clear Image Renders</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-bold text-red-400 uppercase mb-2">On Unauthorized Domain (stolen-art.net)</p>
                  <div className="w-full h-32 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl flex flex-col items-center justify-center border border-red-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 backdrop-blur-md bg-dark/60 z-10 flex flex-col items-center justify-center">
                      <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
                      <span className="text-red-400 font-black tracking-widest">STOLEN ASSET</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Live Stream Piracy Monitor */}
        {activeTab === 'livestream' && (
          <motion.div 
            key="livestream"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center">
                  <Video className="w-5 h-5 text-secondary mr-2" />
                  Stream Sniper AI
                </h2>
                <p className="text-sm text-slate-400 mb-6">
                  Monitor global platforms (Twitch, YouTube, Kick) in real-time. If someone re-broadcasts your premium live stream, we detect it instantly.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Original Stream URL</label>
                    <input 
                      type="text" 
                      placeholder="https://twitch.tv/yourchannel" 
                      value={streamUrl}
                      onChange={(e) => setStreamUrl(e.target.value)}
                      className="w-full bg-dark/50 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:ring-secondary focus:border-secondary transition-all"
                      disabled={isMonitoring}
                    />
                  </div>
                  
                  <button 
                    onClick={handleStartMonitoring}
                    disabled={isMonitoring}
                    className="w-full py-4 bg-secondary hover:bg-secondary/80 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl transition-all flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    {isMonitoring ? (
                      <span className="flex items-center"><Radio className="w-5 h-5 mr-2 animate-pulse" /> Monitoring Web...</span>
                    ) : (
                      <span className="flex items-center"><PlayCircle className="w-5 h-5 mr-2" /> Initialize Radar</span>
                    )}
                  </button>
                  
                  {isMonitoring && (
                    <button onClick={() => { setIsMonitoring(false); setStreamAlert(false); }} className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors">
                      Stop Monitoring
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-dark-paper border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col">
              <h3 className="text-lg font-bold text-white mb-6">Live Radar Status</h3>
              
              {!isMonitoring ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <Radio className="w-16 h-16 text-slate-500 mb-4" />
                  <p className="text-slate-400 max-w-[200px]">Enter your stream URL to start scanning for piracy.</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center w-full relative">
                  {/* Radar Animation */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className="w-48 h-48 rounded-full border border-secondary animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <div className="w-32 h-32 rounded-full border border-secondary absolute animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
                  </div>

                  {!streamAlert ? (
                    <div className="text-center z-10">
                      <p className="text-secondary font-bold text-lg mb-2">Scanning Global Streams...</p>
                      <p className="text-xs text-slate-400">Analyzing 12,405 active gaming & IRL streams.</p>
                      <p className="text-xs text-emerald-400 mt-4 font-mono">0 Infringements Found</p>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full z-10 bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center"
                    >
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                      <h4 className="text-xl font-bold text-red-400 mb-2">Pirated Stream Detected!</h4>
                      <p className="text-sm text-slate-300 mb-4">98% audio/video match found on an unauthorized platform.</p>
                      
                      <div className="bg-dark/60 p-3 rounded-lg text-left mb-6 border border-white/5">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Source URL</p>
                        <p className="text-sm text-white font-mono break-all">https://kick.com/stolen-restream-402</p>
                      </div>

                      <button 
                        onClick={handleSendEmail}
                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center"
                      >
                        <Shield className="w-4 h-4 mr-2" /> Auto-File DMCA Notice
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProTools;

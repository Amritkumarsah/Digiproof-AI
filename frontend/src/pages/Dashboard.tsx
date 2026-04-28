import { useState, useRef, useEffect } from 'react';
import { UploadCloud, File as FileIcon, CheckCircle2, ShieldAlert, Loader2, ArrowLeft, Fingerprint, Activity, FileText, Download, Zap, Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('register');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStep, setUploadStep] = useState<number>(0);
  const [assetId, setAssetId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fingerprints, setFingerprints] = useState([
    { name: 'Launch_Video_Final.mp4', hash: 'DPAI-9X2KQ4M', date: 'Apr 25, 2026', status: 'Active' },
    { name: 'Character_Design_V2.png', hash: 'DPAI-J83NL0P', date: 'Apr 20, 2026', status: 'Active' },
    { name: 'Q1_Financial_Report.pdf', hash: 'DPAI-C4M1T9X', date: 'Apr 18, 2026', status: 'Active' },
  ]);

  const [takedowns, setTakedowns] = useState([
    { asset: 'Launch_Video_Final.mp4', platform: 'YouTube', status: 'Resolved', date: 'Apr 22, 2026', url: 'youtube.com/watch?v=stolen123' },
    { asset: 'Character_Design_V2.png', platform: 'Instagram', status: 'Pending', date: 'Apr 24, 2026', url: 'instagram.com/p/fake_art_99' },
  ]);

  const [activities, setActivities] = useState([
    { title: 'New Fingerprint Registered', desc: 'Asset DPAI-9X2KQ4M created for "Launch_Video_Final.mp4"', time: '2 hours ago', type: 'fingerprint' },
    { title: 'DMCA Notice Sent', desc: 'Automated notice sent to Instagram Legal Dept for "Character_Design_V2.png"', time: '1 day ago', type: 'takedown' },
    { title: 'AI Verification Completed', desc: 'Found 1 high-confidence match during scheduled scan', time: '1 day ago', type: 'verification' },
    { title: 'Account Settings Updated', desc: 'Two-Factor Authentication enabled', time: '3 days ago', type: 'settings' },
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, [location]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard?tab=${tab}`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setUploadStep(1);
    setTimeout(() => setUploadStep(2), 1500);
    setTimeout(() => setUploadStep(3), 3000);
    setTimeout(() => {
      setUploadStep(4);
      const newAssetId = `DPAI-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setAssetId(newAssetId);
      
      const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      setFingerprints(prev => [{
        name: file.name,
        hash: newAssetId,
        date: dateStr,
        status: 'Active'
      }, ...prev]);

      setTakedowns(prev => [{
        asset: file.name,
        platform: 'Monitoring Active',
        status: 'Scanning',
        date: dateStr,
        url: 'No infringements found yet'
      }, ...prev]);

      setActivities(prev => [{
        title: 'New Fingerprint Registered',
        desc: `Asset ${newAssetId} created for "${file.name}"`,
        time: 'Just now',
        type: 'fingerprint'
      }, ...prev]);

      toast.success("Asset registered successfully!");
    }, 4500);
  };

  const handleDownloadCertificate = () => {
    if (!assetId || !file) return;

    const doc = new jsPDF();
    
    // Add border
    doc.setLineWidth(2);
    doc.setDrawColor(59, 130, 246); // Primary blue
    doc.rect(10, 10, 190, 277);

    // Header
    doc.setFontSize(28);
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.text("Digiproof-AI", 105, 30, { align: "center" });

    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246); // Primary blue
    doc.text("Certificate of Output Registration", 105, 45, { align: "center" });

    // Details section
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105); // Slate-600
    
    doc.text(`Asset Description: ${file.name}`, 20, 70);
    doc.text(`File Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`, 20, 85);
    doc.text(`Timestamp: ${new Date().toLocaleString()}`, 20, 100);
    
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42); // Black ish
    doc.text("Global Asset Hash ID (Immutable):", 20, 125);
    
    doc.setFontSize(12);
    doc.text(`${assetId}`, 20, 135);

    // Footer signature
    doc.setLineWidth(0.5);
    doc.line(20, 240, 90, 240);
    doc.setFontSize(10);
    doc.text("Digiproof-AI Authority Algorithm", 20, 250);

    window.open(URL.createObjectURL(doc.output("blob")));
    toast.success("Certificate Opened!");
  };

  const handleDownloadItemCertificate = (item: any) => {
    const doc = new jsPDF();
    
    // Add border
    doc.setLineWidth(2);
    doc.setDrawColor(59, 130, 246); // Primary blue
    doc.rect(10, 10, 190, 277);

    // Header
    doc.setFontSize(28);
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.text("Digiproof-AI", 105, 30, { align: "center" });

    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246); // Primary blue
    doc.text("Certificate of Output Registration", 105, 45, { align: "center" });

    // Details section
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105); // Slate-600
    
    doc.text(`Asset Description: ${item.name}`, 20, 70);
    doc.text(`File Size: N/A (Archived)`, 20, 85);
    doc.text(`Timestamp: ${item.date}`, 20, 100);
    
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42); // Black ish
    doc.text("Global Asset Hash ID (Immutable):", 20, 125);
    
    doc.setFontSize(12);
    doc.text(`${item.hash}`, 20, 135);

    // Footer signature
    doc.setLineWidth(0.5);
    doc.line(20, 240, 90, 240);
    doc.setFontSize(10);
    doc.text("Digiproof-AI Authority Algorithm", 20, 250);

    window.open(URL.createObjectURL(doc.output("blob")));
    toast.success(`Certificate for ${item.name} Opened!`);
  };

  const tabs = [
    { id: 'register', label: 'Register Asset', icon: <UploadCloud className="w-4 h-4" /> },
    { id: 'fingerprints', label: 'My Fingerprints', icon: <Fingerprint className="w-4 h-4" /> },
    { id: 'takedowns', label: 'Takedown Notices', icon: <FileText className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity Feed', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full flex-1">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Creator Dashboard</h1>
        <p className="text-slate-400">Manage your protected assets, monitor fingerprints, and enforce your rights.</p>
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
          {/* Register Asset Tab */}
          {activeTab === 'register' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                 <h2 className="text-xl font-bold text-white mb-2">Asset Registration Portal</h2>
                 <p className="text-sm text-slate-400 mb-6">Upload your original content to generate an immutable AI fingerprint.</p>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div 
                     className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
                       file ? 'border-primary bg-primary/5' : 'border-slate-700 bg-dark-paper/50 hover:bg-dark-paper'
                     }`}
                     onDragOver={handleDragOver}
                     onDrop={handleDrop}
                     onClick={() => !file && fileInputRef.current?.click()}
                   >
                     <input 
                       type="file" 
                       ref={fileInputRef} 
                       onChange={handleFileChange} 
                       className="hidden" 
                       accept="image/*,video/*,application/pdf"
                     />
                     
                     <AnimatePresence mode="wait">
                       {!file ? (
                         <motion.div 
                           key="empty"
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }} 
                           exit={{ opacity: 0 }}
                           className="flex flex-col items-center cursor-pointer"
                         >
                           <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center mb-4 shadow-inner border border-white/5">
                             <UploadCloud className="w-8 h-8 text-primary" />
                           </div>
                           <h3 className="text-lg font-bold text-white mb-2">Drag & Drop your file here</h3>
                           <p className="text-xs text-slate-400 mb-4 max-w-sm">
                             Supports Images, Videos, Audio, and PDFs up to 50MB.
                           </p>
                           <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-colors">
                             Browse Files
                           </button>
                         </motion.div>
                       ) : (
                         <motion.div 
                           key="filled"
                           initial={{ opacity: 0, scale: 0.95 }} 
                           animate={{ opacity: 1, scale: 1 }} 
                           className="flex flex-col items-center"
                         >
                           <FileIcon className="w-12 h-12 text-primary mb-3" />
                           <p className="text-sm font-medium text-white break-all">{file.name}</p>
                           <p className="text-xs text-slate-400 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                           <div className="flex space-x-3">
                             <button 
                               onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                               disabled={uploadStep > 0 || !!assetId}
                               className="px-4 py-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-colors flex items-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                             >
                               {uploadStep > 0 && uploadStep < 4 ? (
                                 <>
                                   <Loader2 className="w-4 h-4 mr-2 animate-spin" /> 
                                   Processing...
                                 </>
                               ) : assetId ? (
                                 <>
                                   <CheckCircle2 className="w-4 h-4 mr-2" /> Registered
                                 </>
                               ) : (
                                 "Generate Fingerprint"
                               )}
                             </button>
                             {!assetId && uploadStep === 0 && (
                               <button 
                                 onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                 className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors"
                               >
                                 Cancel
                               </button>
                             )}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                   
                   <div className="bg-dark/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                     <h3 className="text-sm font-bold text-white mb-4">Registration Status</h3>
                     {assetId ? (
                       <div className="space-y-4">
                         <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                           <div className="flex items-center text-emerald-400 mb-1">
                             <CheckCircle2 className="w-4 h-4 mr-1.5" />
                             <span className="text-xs font-bold">Successfully Registered</span>
                           </div>
                           <p className="text-[10px] text-slate-400">Timestamp: {new Date().toLocaleString()}</p>
                         </div>
                         <div>
                           <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Asset Hash ID</p>
                           <code className="text-xs text-primary break-all bg-dark p-2 rounded block">{assetId}</code>
                         </div>
                         <button 
                           onClick={handleDownloadCertificate}
                           className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white font-medium transition-colors mt-2 flex justify-center items-center"
                         >
                           <Download className="w-3 h-3 mr-1" /> Download PDF Certificate
                         </button>
                       </div>
                     ) : (
                       <div className="flex flex-col items-center justify-center py-4 text-center">
                         <div className="w-10 h-10 rounded-full border border-dashed border-slate-600 flex items-center justify-center mb-2">
                           <span className="text-slate-500 text-xs">?</span>
                         </div>
                         <p className="text-xs text-slate-500">Upload a file to generate its certificate.</p>
                       </div>
                     )}
                   </div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* My Fingerprints Tab */}
          {activeTab === 'fingerprints' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">My Secure Fingerprints</h2>
                    <p className="text-sm text-slate-400">Manage and view your registered digital assets.</p>
                  </div>
                  <button onClick={() => handleTabChange('register')} className="px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 text-sm font-medium rounded-lg transition-colors">
                    + Register New
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase bg-dark/50 border-b border-white/5">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">Asset Name</th>
                        <th className="px-4 py-3">Hash ID</th>
                        <th className="px-4 py-3">Date Registered</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 rounded-tr-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fingerprints.map((item, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="px-4 py-4 text-white font-medium flex items-center">
                            <FileIcon className="w-4 h-4 mr-2 text-slate-500" />
                            {item.name}
                          </td>
                          <td className="px-4 py-4"><code className="text-primary text-xs">{item.hash}</code></td>
                          <td className="px-4 py-4 text-slate-400">{item.date}</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-md flex items-center w-fit">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <button onClick={() => handleDownloadItemCertificate(item)} className="text-slate-400 hover:text-white transition-colors">
                              <Download className="w-4 h-4" />
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

          {/* Takedown Notices Tab */}
          {activeTab === 'takedowns' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">DMCA Takedown Notices</h2>
                    <p className="text-sm text-slate-400">Track and manage your automated legal enforcement actions.</p>
                  </div>
                  <button onClick={() => navigate('/verify?tab=gemini')} className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 text-sm font-medium rounded-lg transition-colors flex items-center">
                    <ShieldAlert className="w-4 h-4 mr-2" /> Scan & Enforce
                  </button>
                </div>

                <div className="grid gap-4">
                  {takedowns.map((notice, idx) => (
                    <div key={idx} className="p-4 bg-dark/50 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/10 transition-colors">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${notice.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {notice.status}
                          </span>
                          <span className="text-xs text-slate-500">{notice.date}</span>
                        </div>
                        <p className="text-sm font-medium text-white">Infringement on {notice.platform}</p>
                        <p className="text-xs text-slate-400 mt-1">Asset: {notice.asset}</p>
                        <div className="flex items-center text-xs text-slate-500 mt-2 bg-dark p-1.5 rounded w-fit">
                          <Globe className="w-3 h-3 mr-1 text-slate-400" /> {notice.url}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => toast.success("Downloading DMCA Copy...")} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs text-white transition-colors flex items-center">
                          <FileText className="w-3 h-3 mr-1" /> View PDF
                        </button>
                        {notice.status === 'Pending' && (
                          <button onClick={() => toast("Following up...", { icon: "✉️" })} className="px-3 py-1.5 bg-primary/20 text-primary hover:bg-primary/30 rounded text-xs transition-colors flex items-center">
                            <Zap className="w-3 h-3 mr-1" /> Follow Up
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Activity Feed Tab */}
          {activeTab === 'activity' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                
                <div className="relative border-l border-white/10 ml-3 space-y-8 pb-4">
                  {activities.map((act, idx) => {
                    let icon, color;
                    switch(act.type) {
                      case 'fingerprint': icon = <Fingerprint className="w-4 h-4 text-primary" />; color = 'bg-primary/20 border-primary/30'; break;
                      case 'takedown': icon = <FileText className="w-4 h-4 text-red-400" />; color = 'bg-red-500/20 border-red-500/30'; break;
                      case 'verification': icon = <Activity className="w-4 h-4 text-secondary" />; color = 'bg-secondary/20 border-secondary/30'; break;
                      case 'settings': icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />; color = 'bg-emerald-500/20 border-emerald-500/30'; break;
                      default: icon = <Activity className="w-4 h-4 text-slate-400" />; color = 'bg-slate-500/20 border-slate-500/30';
                    }
                    return (
                    <div key={idx} className="relative pl-6">
                      <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border flex items-center justify-center ${color} bg-dark`}>
                        {icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{act.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 mb-1">{act.desc}</p>
                        <span className="text-[10px] text-slate-500">{act.time}</span>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

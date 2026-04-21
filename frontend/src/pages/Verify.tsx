import { useState, useRef } from 'react';
import { UploadCloud, Search, AlertTriangle, CheckCircle, XCircle, Loader2, Globe, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const Verify = () => {
  const [file, setFile] = useState<File | null>(null);
  const [verifyStep, setVerifyStep] = useState<number>(0);
  const [result, setResult] = useState<{ score: number, status: 'match' | 'fake' | 'unknown', message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleVerify = () => {
    if (!file) return;
    
    setVerifyStep(1); // Extracting Metadata
    setTimeout(() => setVerifyStep(2), 1500); // Running AI Pixel Similarity
    setTimeout(() => setVerifyStep(3), 3000); // Querying Gemini Decision
    
    setTimeout(() => {
      setVerifyStep(0); // Done
      // Random result for demo
      const randomScore = Math.floor(Math.random() * 100);
      if (randomScore > 85) {
        setResult({ 
          score: randomScore, 
          status: 'match', 
          message: "High similarity detected! This appears to be a stolen copy of an existing registered asset.",
          locations: [
            { platform: "Instagram", url: "instagram.com/p/xh92j...", date: "2 hours ago" },
            { platform: "Reddit", url: "reddit.com/r/art/comments...", date: "5 hours ago" },
            { platform: "Personal Blog", url: "unknown-blog.net/post-10", date: "yesterday" }
          ]
        } as any);
      } else if (randomScore < 30) {
        setResult({ score: randomScore, status: 'unknown', message: "Original content. No matching fingerprints found in our registry." });
      } else {
        setResult({ score: randomScore, status: 'fake', message: "Warning: AI Manipulation / Deepfake patterns detected in metadata and noise profile." });
      }
      toast("Verification complete", { icon: "🔍" });
    }, 4500);
  };

  const generateTakedownNotice = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(220, 38, 38); // Red
    doc.text("OFFICIAL DMCA TAKEDOWN NOTICE", 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);
    doc.text("To Whom It May Concern,", 20, 65);
    
    doc.text("I am the authorized copyright owner of the registered digital asset.", 20, 80);
    doc.text("The DigiProof AI system has detected unauthorized, infringing copies", 20, 90);
    doc.text("of my copyrighted work at the following locations:", 20, 100);
    
    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246); // Blue
    doc.text("- instagram.com/p/xh92j...", 25, 115);
    doc.text("- reddit.com/r/art/comments...", 25, 122);
    doc.text("- unknown-blog.net/post-10", 25, 129);

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text("I request that you immediately disable access to this infringing content.", 20, 145);
    doc.text("I have a good faith belief that the use of the material is not authorized.", 20, 155);
    
    doc.setLineWidth(0.5);
    doc.line(20, 190, 80, 190);
    doc.setFontSize(10);
    doc.text("Automated by DigiProof AI Legal System", 20, 200);

    doc.save("DMCA_Takedown_Notice.pdf");
    toast.success("Takedown Notice Generated!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">AI Dispute Analyzer</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Upload any suspicious image, video, or document. Our AI will analyze the content against our registry to detect plagiarism or deepfake manipulation.
        </p>
      </div>

      <div className="bg-dark-paper border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          <div className="flex-1 space-y-6">
            <h3 className="text-lg font-semibold text-white">Select Content to Verify</h3>
            <div 
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                file ? 'border-primary bg-primary/5' : 'border-slate-700 bg-dark/50 hover:bg-dark'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              {file ? (
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-primary/20 rounded-full mb-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-medium text-white break-all max-w-xs">{file.name}</p>
                  <p className="text-xs text-slate-400 mt-1">Ready for analysis</p>
                </div>
              ) : (
                <div className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-3" />
                  <p className="text-sm font-medium text-slate-300">Click to browse or drag file</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleVerify}
              disabled={!file || verifyStep > 0}
              className="w-full py-4 bg-primary hover:bg-primary-dark disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold text-white transition-all flex justify-center items-center"
            >
              {verifyStep > 0 ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing AI Scan...</>
              ) : (
                <><Search className="w-5 h-5 mr-2" /> Start AI Verification</>
              )}
            </button>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-6">Analysis Results</h3>
            
            <div className="h-[280px] rounded-2xl bg-dark/50 border border-white/5 flex flex-col items-center justify-center p-6 relative">
              <AnimatePresence mode="wait">
                {verifyStep > 0 ? (
                  <motion.div 
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center max-w-xs"
                  >
                    <div className="relative mb-6">
                      <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin w-16 h-16" />
                      <div className="absolute inset-2 border-4 border-t-transparent border-r-secondary border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_reverse] w-12 h-12" />
                      <Search className="w-6 h-6 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-sm text-primary font-medium mb-1">
                      {verifyStep === 1 && "Extracting Metadata & Features..."}
                      {verifyStep === 2 && "Running Pixel Similarity Check..."}
                      {verifyStep === 3 && "Querying Gemini AI Decision..."}
                    </p>
                    <p className="text-xs text-slate-500">Cross-referencing global registry</p>
                  </motion.div>
                ) : result ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center w-full"
                  >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                      result.status === 'match' ? 'bg-red-500/20 text-red-400' :
                      result.status === 'fake' ? 'bg-amber-500/20 text-amber-500' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {result.status === 'match' ? <AlertTriangle className="w-10 h-10" /> :
                       result.status === 'fake' ? <AlertTriangle className="w-10 h-10" /> :
                       <CheckCircle className="w-10 h-10" />}
                    </div>

                    <div className="flex items-end mb-2">
                      <span className="text-4xl font-bold text-white">{result.score}%</span>
                      <span className="text-sm text-slate-400 ml-2 mb-1">Similarity Score</span>
                    </div>

                    <p className={`text-sm py-2 px-3 rounded-lg w-full mb-4 ${
                      result.status === 'match' ? 'bg-red-500/10 border border-red-500/20 text-red-300' :
                      result.status === 'fake' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300' :
                      'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                    }`}>
                      {result.message}
                    </p>

                    {result.status === 'match' && (result as any).locations && (
                      <div className="w-full text-left bg-dark/50 p-3 rounded-lg border border-white/5 mb-4">
                        <div className="flex items-center text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                          <Globe className="w-4 h-4 mr-1.5 text-secondary" /> 
                          Reverse Search Results: {(result as any).locations.length} Copies Found
                        </div>
                        <ul className="text-xs text-slate-400 space-y-1.5">
                          {(result as any).locations.map((loc: any, idx: number) => (
                            <li key={idx} className="flex justify-between items-center bg-white/5 py-1 px-2 rounded">
                              <span className="truncate w-3/4"><span className="text-primary">{loc.platform}</span>: {loc.url}</span>
                              <span className="text-[10px] text-slate-500">{loc.date}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.status === 'match' && (
                      <button onClick={generateTakedownNotice} className="flex items-center text-sm font-bold text-white bg-red-600 hover:bg-red-700 w-full py-3 justify-center rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Takedown Notice
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-center opacity-40"
                  >
                    <Search className="w-12 h-12 mb-3" />
                    <p className="text-sm max-w-[200px]">Waiting for content to verify.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;

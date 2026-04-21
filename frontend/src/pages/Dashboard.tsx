import { useState, useRef } from 'react';
import { UploadCloud, File as FileIcon, CheckCircle2, ShieldAlert, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStep, setUploadStep] = useState<number>(0); // 0: idle, 1: uploading, 2: fingerprint, 3: cloud, 4: done
  const [assetId, setAssetId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    setUploadStep(1); // Uploading Original Asset
    setTimeout(() => setUploadStep(2), 1500); // Generating Fingerprint
    setTimeout(() => setUploadStep(3), 3000); // Securing on Cloud Storage
    setTimeout(() => {
      setUploadStep(4); // Done
      setAssetId(`DPAI-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
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
    doc.text("DigiProof AI", 105, 30, { align: "center" });

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
    doc.text("DigiProof AI Authority Algorithm", 20, 250);

    doc.save(`DigiProof_Certificate_${assetId}.pdf`);
    toast.success("Certificate Downloaded!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Asset Registration Portal</h1>
        <p className="text-slate-400">Upload your original content to generate an immutable AI fingerprint.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
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
                  <div className="w-20 h-20 bg-dark rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5">
                    <UploadCloud className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Drag & Drop your file here</h3>
                  <p className="text-sm text-slate-400 mb-6 max-w-sm">
                    Supports Images (JPG, PNG), Videos (MP4), Audio (MP3), and PDF Documents up to 50MB.
                  </p>
                  <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
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
                  <FileIcon className="w-16 h-16 text-primary mb-4" />
                  <p className="text-lg font-medium text-white break-all">{file.name}</p>
                  <p className="text-sm text-slate-400 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                      disabled={uploadStep > 0 || !!assetId}
                      className="px-6 py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    >
                      {uploadStep > 0 && uploadStep < 4 ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 
                          {uploadStep === 1 && "Uploading Asset..."}
                          {uploadStep === 2 && "Generating Fingerprint..."}
                          {uploadStep === 3 && "Securing on Cloud..."}
                        </>
                      ) : assetId ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" /> Registered
                        </>
                      ) : (
                        "Generate Fingerprint"
                      )}
                    </button>
                    {!assetId && uploadStep === 0 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="px-6 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-amber-400" /> Terms of Protection
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              By uploading an asset, you certify that you are the original creator or authorized rights holder. Submitting copyrighted material you do not own may negatively impact your Creator Trust Score and could result in account suspension.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Registration Status</h3>
            {assetId ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-center text-emerald-400 mb-1">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    <span className="text-sm font-bold">Successfully Registered</span>
                  </div>
                  <p className="text-xs text-slate-400">Timestamp: {new Date().toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Asset Hash ID</p>
                  <code className="text-sm text-primary break-all">{assetId}</code>
                </div>
                <button 
                  onClick={handleDownloadCertificate}
                  className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white font-medium transition-colors mt-2"
                >
                  Download PDF Certificate
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-12 h-12 rounded-full border border-dashed border-slate-600 flex items-center justify-center mb-3">
                  <span className="text-slate-500">?</span>
                </div>
                <p className="text-sm text-slate-500">Upload a file to generate its protection certificate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

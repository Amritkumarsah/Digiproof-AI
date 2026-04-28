import { ArrowRight, Fingerprint, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />

      <motion.div 
        className="max-w-4xl mx-auto px-4 text-center z-10 pt-16 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <Zap className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-slate-300">AI Trust Infrastructure for the Creator Economy</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
        >
          Prove Ownership in <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Seconds with AI
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12"
        >
          Digiproof-AI enables creators to instantly protect their content, detect deepfakes, and generate legal proof certificates using advanced AI fingerprints.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-primary hover:bg-primary-dark text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center space-x-2">
            <span>Register Asset</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/verify?tab=content" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center justify-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Verify Content</span>
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left"
        >
          {[
            { icon: <Fingerprint className="w-6 h-6 text-primary" />, title: "Secure Fingerprints", desc: "Generate indestructible cryptographic hashes linked to your assets.", path: "/dashboard?tab=fingerprints" },
            { icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, title: "Gemini AI Verification", desc: "Instantly compare suspicious content against your registered originals.", path: "/verify?tab=gemini" },
            { icon: <Zap className="w-6 h-6 text-secondary" />, title: "Auto-Takedown Notices", desc: "One-click generation of DCMA / legal notices with PDF certificates.", path: "/dashboard?tab=takedowns" },
          ].map((feature, idx) => (
            <Link to={feature.path} key={idx}>
              <motion.div variants={itemVariants} className="bg-dark-paper/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-1 transition-all h-full cursor-pointer shadow-lg hover:shadow-primary/20">
                <div className="bg-dark p-3 rounded-xl inline-block mb-4 border border-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;

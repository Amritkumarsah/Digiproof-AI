import { useState } from 'react';
import { Users, FileText, AlertTriangle, ShieldCheck, Activity, X, Globe, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  const adminRole = localStorage.getItem('adminRole') || 'super_admin';
  const showStats = adminRole === 'super_admin' || adminRole === 'analyst_admin';
  const showLogs = adminRole === 'super_admin' || adminRole === 'moderator_admin';
  const showHealth = adminRole === 'super_admin' || adminRole === 'analyst_admin';
  const showSupport = adminRole === 'super_admin' || adminRole === 'support_admin';

  const supportUsers = [
    { name: 'Alex Johnson', email: 'alex@example.com', joined: 'Oct 12, 2026', status: 'Active' },
    { name: 'Sarah Miller', email: 'sarah@example.com', joined: 'Nov 02, 2026', status: 'Active' },
    { name: 'Michael Design', email: 'mike@design.co', joined: 'Dec 15, 2026', status: 'Warned' },
  ];

  const stats = [
    { label: 'Total Protected Assets', value: '14,205', icon: <FileText className="w-6 h-6 text-primary" />, trend: '+12% this week' },
    { label: 'Active Creators', value: '3,842', icon: <Users className="w-6 h-6 text-secondary" />, trend: '+5% this week' },
    { label: 'Takedown Notices Sent', value: '412', icon: <AlertTriangle className="w-6 h-6 text-red-400" />, trend: '+22% this week' },
    { label: 'Deepfakes Intercepted', value: '89', icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, trend: '-3% this week' },
  ];

  const logs = [
    { id: 'INC-8291', user: 'alex_art', score: '98%', status: 'Takedown Issued', color: 'text-emerald-400', url: 'instagram.com/p/x9...'},
    { id: 'INC-8290', user: 'sarah_photo', score: '45%', status: 'Manual Review', color: 'text-amber-400', url: 'pending review'},
    { id: 'INC-8289', user: 'design_co', score: '12%', status: 'Dismissed', color: 'text-slate-400', url: 'no match'},
    { id: 'INC-8288', user: 'mike_beats', score: '88%', status: 'Takedown Issued', color: 'text-emerald-400', url: 'tiktok.com/@stolen...'},
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Analytics Panel</h1>
          <p className="text-slate-400">Platform-wide statistics and automated trust monitoring.</p>
        </div>
        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white flex items-center">
          <Activity className="w-4 h-4 mr-2" /> Live Updates
        </button>
      </div>

      {showStats && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-dark-paper border border-white/5 rounded-2xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-dark rounded-xl border border-white/5">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-400 mb-4">{stat.label}</p>
            <p className="text-xs text-slate-500">{stat.trend}</p>
          </motion.div>
        ))}
      </div>
      )}

      {showSupport && (
        <div className="bg-dark-paper border border-white/5 rounded-2xl p-6 mb-10">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" /> Active Platform Users
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-dark/50 border-b border-white/5">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">User Name</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">Joined Date</th>
                  <th className="px-4 py-3 rounded-tr-lg">Account Status</th>
                </tr>
              </thead>
              <tbody>
                {supportUsers.map((user, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-4 font-bold text-white">{user.name}</td>
                    <td className="px-4 py-4 text-slate-400">{user.email}</td>
                    <td className="px-4 py-4 text-slate-300">{user.joined}</td>
                    <td className={`px-4 py-4 font-medium ${user.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {showLogs && (
        <div className="col-span-2 bg-dark-paper border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Dispute Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-dark/50 border-b border-white/5">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Incident ID</th>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Similarity</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-4 font-medium text-white">{row.id}</td>
                    <td className="px-4 py-4 text-slate-400">{row.user}</td>
                    <td className="px-4 py-4 text-white font-bold">{row.score}</td>
                    <td className={`px-4 py-4 font-medium ${row.color}`}>{row.status}</td>
                    <td className="px-4 py-4">
                      <button 
                        onClick={() => setSelectedIncident(row)}
                        className="text-primary hover:underline hover:text-primary-dark transition-colors font-medium px-3 py-1 bg-primary/10 rounded-md"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {showHealth && (
        <div className={`bg-dark-paper border border-white/5 rounded-2xl p-6 ${!showLogs ? 'col-span-3' : ''}`}>
          <h3 className="text-lg font-bold text-white mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-300">Gemini API Uptime</span>
                <span className="text-sm font-medium text-emerald-400">99.9%</span>
              </div>
              <div className="w-full bg-dark rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '99%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-300">Cloud Storage Capacity</span>
                <span className="text-sm font-medium text-amber-400">78%</span>
              </div>
              <div className="w-full bg-dark rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-300">Firestore Read/Write</span>
                <span className="text-sm font-medium text-primary">Normal</span>
              </div>
              <div className="w-full bg-dark rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Incident Details Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIncident(null)}
              className="fixed inset-0 bg-dark/80 backdrop-blur-sm z[100] flex items-center justify-center p-4"
              style={{ zIndex: 100 }}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-dark-paper border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-amber-500" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2 text-amber-500" />
                      Incident Report: {selectedIncident.id}
                    </h2>
                    <button 
                      onClick={() => setSelectedIncident(null)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-dark p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Creator / Owner</p>
                      <p className="text-lg text-white font-medium">@{selectedIncident.user}</p>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex-1 bg-dark p-4 rounded-xl border border-white/5">
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">AI Match Score</p>
                        <p className="text-2xl text-primary font-black">{selectedIncident.score}</p>
                      </div>
                      <div className="flex-1 bg-dark p-4 rounded-xl border border-white/5">
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Current Status</p>
                        <p className={`text-lg font-bold ${selectedIncident.color}`}>{selectedIncident.status}</p>
                      </div>
                    </div>

                    <div className="bg-dark p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Detected Location</p>
                      <div className="flex items-center text-slate-300 text-sm">
                        <Globe className="w-4 h-4 mr-2 text-secondary" />
                        {selectedIncident.url}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex space-x-3">
                    {selectedIncident.status === 'Takedown Issued' && (
                      <button className="flex-1 bg-emerald-500/10 text-emerald-400 font-bold py-3 rounded-xl flex items-center justify-center border border-emerald-500/20">
                        <Download className="w-4 h-4 mr-2" /> PDF Copy
                      </button>
                    )}
                    <button 
                      onClick={() => setSelectedIncident(null)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      Close Report
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;

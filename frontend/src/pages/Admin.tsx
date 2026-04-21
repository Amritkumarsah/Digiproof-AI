import { Users, FileText, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
  const stats = [
    { label: 'Total Protected Assets', value: '14,205', icon: <FileText className="w-6 h-6 text-primary" />, trend: '+12% this week' },
    { label: 'Active Creators', value: '3,842', icon: <Users className="w-6 h-6 text-secondary" />, trend: '+5% this week' },
    { label: 'Takedown Notices Sent', value: '412', icon: <AlertTriangle className="w-6 h-6 text-red-400" />, trend: '+22% this week' },
    { label: 'Deepfakes Intercepted', value: '89', icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, trend: '-3% this week' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                {[
                  { id: 'INC-8291', user: 'alex_art', score: '98%', status: 'Takedown Issued', color: 'text-emerald-400' },
                  { id: 'INC-8290', user: 'sarah_photo', score: '45%', status: 'Manual Review', color: 'text-amber-400' },
                  { id: 'INC-8289', user: 'design_co', score: '12%', status: 'Dismissed', color: 'text-slate-400' },
                  { id: 'INC-8288', user: 'mike_beats', score: '88%', status: 'Takedown Issued', color: 'text-emerald-400' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-4 font-medium text-white">{row.id}</td>
                    <td className="px-4 py-4 text-slate-400">{row.user}</td>
                    <td className="px-4 py-4 text-white font-bold">{row.score}</td>
                    <td className={`px-4 py-4 font-medium ${row.color}`}>{row.status}</td>
                    <td className="px-4 py-4">
                      <button className="text-primary hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-dark-paper border border-white/5 rounded-2xl p-6">
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
      </div>
    </div>
  );
};

export default Admin;

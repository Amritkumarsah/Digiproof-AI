import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Verify from './pages/Verify';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import ProTools from './pages/ProTools';
import AuthModal from './components/AuthModal';

function App() {
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-dark flex flex-col relative overflow-hidden">
        {/* Background visual for locked state */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
        
        <AuthModal 
          isOpen={true} 
          onClose={() => {}} 
          mode="login" 
          isMandatory={true}
          onSuccess={(role) => setUserRole(role || 'user')}
        />
        <Toaster position="bottom-right" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark w-full flex flex-col">
        <Navbar role={userRole} />
        <main className="flex-1 flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/tools" element={<ProTools />} />
            <Route path="/settings" element={<Settings />} />
            {userRole === 'admin' ? (
              <Route path="/admin" element={<Admin />} />
            ) : (
              <Route path="/admin" element={
                <div className="flex-1 flex items-center justify-center p-8 text-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                    <p className="text-slate-400">You need administrator privileges to view this page.</p>
                  </div>
                </div>
              } />
            )}
          </Routes>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;

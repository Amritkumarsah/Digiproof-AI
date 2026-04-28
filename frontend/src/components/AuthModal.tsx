import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'login' | 'register' | 'forgot_password' | 'otp' | 'admin_login';
  isMandatory?: boolean;
  onSuccess?: (role?: 'user' | 'admin') => void;
}

const AuthModal = ({ isOpen, onClose, mode: initialMode = 'login', isMandatory = false, onSuccess }: AuthModalProps) => {
  const [internalMode, setInternalMode] = useState<'login' | 'register' | 'forgot_password' | 'otp' | 'admin_login'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Sync mode if it changes externally
  useEffect(() => {
    setInternalMode(initialMode);
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // If admin login
    if (internalMode === 'admin_login') {
      setTimeout(() => {
        setIsLoading(false);
        
        const ADMIN_USERS = [
          { email: 'deepa@digiproof.ai', password: 'password123', name: 'Deepa', role: 'super_admin' },
          { email: 'gautam@digiproof.ai', password: 'password123', name: 'Gautam', role: 'moderator_admin' },
          { email: 'amrit@digiproof.ai', password: 'password123', name: 'Amrit', role: 'analyst_admin' },
          { email: 'sachin@digiproof.ai', password: 'password123', name: 'Sachin', role: 'support_admin' }
        ];

        const validAdmin = ADMIN_USERS.find(admin => admin.email === email && admin.password === password);

        if (validAdmin) {
          toast.success(`Welcome back, ${validAdmin.name}! (${validAdmin.role.replace('_', ' ').toUpperCase()})`);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', validAdmin.name);
          localStorage.setItem('adminRole', validAdmin.role);
          if (onSuccess) onSuccess('admin');
          else onClose();
        } else {
          toast.error("Invalid Admin credentials. Access denied.");
        }
      }, 1500);
      return;
    }

    // If login, fake verify immediately
    if (internalMode === 'login') {
      setTimeout(() => {
        setIsLoading(false);
        const usersStr = localStorage.getItem('registeredUsers');
        const users = usersStr ? JSON.parse(usersStr) : {};
        
        if (!users[email]) {
          toast.error("Account not found. Please sign up first.");
          setInternalMode('register');
          return;
        }
        
        if (users[email].password !== password) {
          toast.error("Incorrect password.");
          return;
        }

        toast.success("Successfully logged in!");
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', users[email].name || email.split('@')[0]);
        if (onSuccess) onSuccess('user');
        else onClose();
      }, 1500);
    } 
    // If registering or forgot password, transition to OTP screen
    else if (internalMode === 'register' || internalMode === 'forgot_password') {
      setTimeout(() => {
        setIsLoading(false);
        const usersStr = localStorage.getItem('registeredUsers');
        const users = usersStr ? JSON.parse(usersStr) : {};
        
        if (internalMode === 'register' && users[email]) {
          toast.error("Account already exists. Please log in.");
          setInternalMode('login');
          return;
        }
        
        if (internalMode === 'forgot_password' && !users[email]) {
          toast.error("Account not found. Please sign up first.");
          setInternalMode('register');
          return;
        }

        toast.success(`OTP sent to your email!`);
        setInternalMode('otp');
      }, 1500);
    }
    // If submitting OTP
    else if (internalMode === 'otp') {
      setTimeout(() => {
        setIsLoading(false);
        if (otpCode.length === 6) {
          const usersStr = localStorage.getItem('registeredUsers');
          const users = usersStr ? JSON.parse(usersStr) : {};
          const userName = name || email.split('@')[0];
          
          users[email] = { password, name: userName };
          localStorage.setItem('registeredUsers', JSON.stringify(users));

          toast.success("Identity verified successfully!");
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', userName);
          if (onSuccess) onSuccess('user');
          else onClose();
        } else {
          toast.error("Invalid OTP code. Please enter 6 digits.");
        }
      }, 1500);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Signed in with Google!");
      if (onSuccess) onSuccess('user');
      else onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            {/* Modal Modal */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-dark-paper border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden"
            >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/20 p-2 rounded-xl">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Digiproof-AI</h2>
                </div>
                {!isMandatory && (
                  <button 
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {internalMode === 'login' && 'Welcome back'}
                  {internalMode === 'register' && 'Create an account'}
                  {internalMode === 'forgot_password' && 'Reset Password'}
                  {internalMode === 'otp' && 'Verify Email'}
                  {internalMode === 'admin_login' && 'Admin Portal Access'}
                </h3>
                <p className="text-sm text-slate-400">
                  {internalMode === 'login' && 'Enter your credentials to access your protected assets.'}
                  {internalMode === 'register' && 'Join the platform to securely register and protect your content.'}
                  {internalMode === 'forgot_password' && 'Enter your email to receive a password reset OTP.'}
                  {internalMode === 'otp' && 'Enter the 6-digit code sent to your email.'}
                  {internalMode === 'admin_login' && 'Enter administrator credentials to access the analytics and review system.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {internalMode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-500" />
                      </div>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-dark/50 border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-10 p-3 transition-colors" 
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                {internalMode !== 'otp' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-500" />
                      </div>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-dark/50 border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-10 p-3 transition-colors" 
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>
                )}

                {/* OTP Input Field */}
                {internalMode === 'otp' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide text-center">6-Digit Code</label>
                    <div className="flex justify-between space-x-2">
                      {otpArray.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpRefs.current[index] = el)}
                          type="text"
                          required
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            const newOtp = [...otpArray];
                            newOtp[index] = val;
                            setOtpArray(newOtp);
                            setOtpCode(newOtp.join(''));
                            
                            if (val && index < 5) {
                              otpRefs.current[index + 1]?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !digit && index > 0) {
                              otpRefs.current[index - 1]?.focus();
                            }
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, '').slice(0, 6);
                            if (pastedData) {
                              const newOtp = [...otpArray];
                              for (let i = 0; i < pastedData.length; i++) {
                                newOtp[i] = pastedData[i];
                              }
                              setOtpArray(newOtp);
                              setOtpCode(newOtp.join(''));
                              const focusIndex = Math.min(pastedData.length, 5);
                              otpRefs.current[focusIndex]?.focus();
                            }
                          }}
                          className="bg-dark/50 border border-white/10 text-white text-center text-xl font-bold rounded-xl focus:ring-primary focus:border-primary block w-12 h-14 transition-colors" 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {(internalMode === 'login' || internalMode === 'register' || internalMode === 'admin_login') && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide">Password</label>
                      {internalMode === 'login' && (
                        <button type="button" onClick={() => setInternalMode('forgot_password')} className="text-xs text-primary hover:text-primary-dark transition-colors">Forgot password?</button>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-500" />
                      </div>
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-dark/50 border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-10 p-3 transition-colors" 
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary/30 font-bold rounded-xl text-sm px-5 py-3 text-center transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-70 flex justify-center items-center"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        {internalMode === 'login' && 'Sign in to account'}
                        {internalMode === 'register' && 'Send OTP to Email'}
                        {internalMode === 'forgot_password' && 'Send Recovery OTP'}
                        {internalMode === 'otp' && 'Verify & Continue'}
                        {internalMode === 'admin_login' && 'Access Admin Dashboard'}
                      </>
                    )}
                  </button>
                </div>
              </form>

              {(internalMode === 'login' || internalMode === 'register') && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-center text-slate-500 mb-4 uppercase tracking-wider font-medium">Or continue with</p>
                  <div className="flex justify-center space-x-4">
                    {/* Google Icon Button */}
                    <button 
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex justify-center items-center transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    </button>
                    {/* Generic Apple Icon */}
                    <button 
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex justify-center items-center transition-colors"
                    >
                      <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.05 20.28c-.98.95-2.05 2.04-3.32 2.03-1.27-.01-1.74-.78-3.23-.78s-1.98.77-3.21.79c-1.28.02-2.5-1.28-3.48-2.29-2.02-2.04-3.56-5.75-2.51-8.22.52-1.24 1.55-2.03 2.72-2.05 1.25-.03 2.45.83 3.23.83.78 0 2.21-.99 3.73-.86 1.57.14 2.92.79 3.71 2 0 0-3.33 1.95-3.08 5.4.26 3.84 4.09 5.38 4.09 5.38-.01.02-1.29 4.38-4.65 7.77m-3.04-12.7c.69-.84 1.15-2.01 1.02-3.17-1.02.04-2.27.68-2.98 1.51-.62.74-1.16 1.93-1.01 3.08 1.15.09 2.28-.58 2.97-1.42" />
                      </svg>
                    </button>
                    {/* Microsoft/Generic User Icon */}
                    <button 
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex justify-center items-center transition-colors"
                    >
                      <svg className="w-5 h-5 fill-slate-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.55 21H3v-8.55h8.55V21zM21 21h-8.55v-8.55H21V21zm-9.45-9.45H3V3h8.55v8.55zm9.45 0h-8.55V3H21v8.55z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center space-y-3">
                <p className="text-sm font-light text-slate-400">
                  {(internalMode === 'login' || internalMode === 'forgot_password' || internalMode === 'otp') ? "Don't have an account yet? " : "Already have an account? "}
                  <button 
                    onClick={() => {
                      setInternalMode(internalMode === 'register' ? 'login' : 'register');
                      setOtpCode('');
                      setOtpArray(['', '', '', '', '', '']);
                    }} 
                    className="font-medium text-primary hover:underline"
                  >
                    {internalMode === 'register' ? 'Sign in' : 'Register here'}
                  </button>
                </p>
                
                {internalMode !== 'admin_login' ? (
                  <button 
                    onClick={() => setInternalMode('admin_login')} 
                    className="text-xs font-medium text-amber-500/80 hover:text-amber-400 hover:underline transition-colors"
                  >
                    Administrator Login
                  </button>
                ) : (
                  <button 
                    onClick={() => setInternalMode('login')} 
                    className="text-xs font-medium text-slate-500 hover:text-white hover:underline transition-colors"
                  >
                    Return to User Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;

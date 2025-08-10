import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/staff/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/Login.jpg')", 
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center text-white hover:text-brand-primary mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Glassmorphic Container */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-8 text-center text-white">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Staff Login</h1>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/30 text-white placeholder-white border border-white/40 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/30 text-white placeholder-white border border-white/40 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-xs text-white/70 mt-6">
            Only authorized staff can access this area.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;

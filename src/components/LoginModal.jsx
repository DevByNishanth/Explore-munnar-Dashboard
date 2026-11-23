import React, { useEffect, useState } from "react";
import { X, User, Lock, Mail, Phone } from "lucide-react";

const getErrorMessage = (error) => error?.response?.data?.message || error?.message || "Unable to connect. Please try again.";

const LoginModal = ({ open, onClose, onLogin, onSignup, onSuccess, accessDenied }) => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape" && !loading) onClose?.(); };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, loading]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    const normalizedEmail = email.trim();
    if (mode === "signup" && !name.trim()) { setError("Please enter your full name."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) { setError("Please enter a valid email address."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true);
    try {
      if (mode === "signup") await onSignup?.({ name: name.trim(), email: normalizedEmail, password, phoneNumber });
      else await onLogin?.({ email: normalizedEmail, password });
      onSuccess?.();
      if (!onSuccess) onClose?.();
    } catch (err) { setError(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  const inputClass = "w-full outline-none text-gray-800 placeholder:text-gray-400 bg-transparent";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl py-6 transform transition-all duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-gray-400 pb-2 px-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{mode === "login" ? "Sign in" : "Create admin account"}</h3>
            <p className="text-sm text-gray-500 mt-1">{mode === "login" ? "Enter your credentials to continue" : "Enter your details to get started"}</p>
          </div>
          <button aria-label="Close login" onClick={onClose} disabled={loading} className="text-gray-400 hover:text-gray-700 rounded p-1"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 px-6">
          {accessDenied && <p className="text-sm text-red-600">This account does not have admin access.</p>}
          {mode === "signup" && <label className="block"><span className="text-sm text-gray-500">Full Name</span><div className="mt-1 flex items-center gap-2 border rounded-md p-2"><User className="w-4 h-4 text-gray-400" /><input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Admin Name" required /></div></label>}
          <label className="block"><span className="text-sm text-gray-500">Email</span><div className="mt-1 flex items-center gap-2 border rounded-md p-2"><Mail className="w-4 h-4 text-gray-400" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="admin@example.com" autoComplete="email" required /></div></label>
          <label className="block"><span className="text-sm text-gray-500">Password</span><div className="mt-1 flex items-center gap-2 border rounded-md p-2"><Lock className="w-4 h-4 text-gray-400" /><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className={inputClass} placeholder="••••••••" autoComplete={mode === "login" ? "current-password" : "new-password"} required /></div></label>
          {mode === "signup" && <label className="block"><span className="text-sm text-gray-500">Phone Number <span className="text-gray-400">(optional)</span></span><div className="mt-1 flex items-center gap-2 border rounded-md p-2"><Phone className="w-4 h-4 text-gray-400" /><input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={inputClass} placeholder="+91 9876543210" /></div></label>}
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <div><button type="submit" disabled={loading} className="w-full py-2 rounded-md btn-green cursor-pointer hover:bg-indigo-700 text-white font-medium shadow disabled:opacity-60">{loading ? "Please wait..." : mode === "login" ? "Login" : "Sign up"}</button></div>
        </form>
        <div className="mt-4 text-center text-xs text-gray-500">{mode === "login" ? "By logging in you agree to the admin policies." : "Admin access is granted by your account role."}</div>
        <div className="mt-3 text-center text-sm text-gray-600"><button type="button" disabled={loading} onClick={() => { setError(""); setMode(mode === "login" ? "signup" : "login"); }} className="text-emerald-800 hover:underline">{mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}</button></div>
        </div>
    </div>
  );
};

export default LoginModal;

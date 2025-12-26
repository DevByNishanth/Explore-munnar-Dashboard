import React, { useEffect, useState } from "react";
import { X, User, Lock } from "lucide-react";

const LoginModal = ({ open, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook point: replace with real auth logic
    onLogin?.({ username, password });
    // For now just close modal after login attempt
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl py-6 transform transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-400 pb-2 px-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Sign in</h3>
            <p className="text-sm text-gray-500 mt-1">
              Enter your credentials to continue
            </p>
          </div>
          <button
            aria-label="Close login"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 rounded p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 px-6">
          <label className="block">
            <span className="text-sm text-gray-500">Username</span>
            <div className="mt-1 flex items-center gap-2 border rounded-md p-2">
              <User className="w-4 h-4 text-gray-400" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full outline-none text-gray-800 placeholder:text-gray-400 bg-transparent"
                placeholder="your.username"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-gray-500">Password</span>
            <div className="mt-1 flex items-center gap-2 border rounded-md p-2 ">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full outline-none text-gray-800 placeholder:text-gray-400 bg-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </label>

          {/* <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-xs">Remember me</span>
              </label>
            </div>
            <a className="text-sm text-indigo-600 hover:underline">Forgot?</a>
          </div> */}

          <div>
            <button
              type="submit"
              className="w-full py-2 rounded-md btn-green cursor-pointer hover:bg-indigo-700 text-white font-medium shadow"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500">
          By logging in you agree to the admin policies.
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

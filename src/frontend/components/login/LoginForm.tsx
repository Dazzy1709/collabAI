import React, { useState } from 'react';
import type { LoginData } from '../../types/auth.types';

const LoginForm = () => {
  const [form, setForm] = useState<LoginData>({ name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [consoleMessage, setConsoleMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmission = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setConsoleMessage('');
    setIsError(false);

    try {
      const res = await fetch('/login', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      if (!res.ok) {
        setIsError(true);
        setConsoleMessage(data.message || 'Something went wrong');
      } else {
        setConsoleMessage(data.message);
      }
    } catch (err) {
      setIsError(true);
      setConsoleMessage('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-90">
          {/* Header */}
          <div className="mb-9">
            <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-tight mb-1.5">
              Welcome back
            </h2>
            <p className="text-sm text-neutral-400">Sign in to continue to your workspace</p>
          </div>

          {/* Error message */}
          {consoleMessage && isError && (
            <div className="mb-5 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {consoleMessage}
            </div>
          )}

          {/* Success message */}
          {consoleMessage && !isError && (
            <div className="mb-5 px-3.5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
              {consoleMessage}
            </div>
          )}

          <form onSubmit={handleFormSubmission} noValidate>
            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-[11px] font-medium text-neutral-500 uppercase tracking-widest mb-2"
              >
                Username
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="your_username"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="username"
                className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-[#0a0a0a] placeholder:text-neutral-300 outline-none transition-all focus:border-[#0a0a0a] focus:bg-white"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-[11px] font-medium text-neutral-500 uppercase tracking-widest mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-[#0a0a0a] placeholder:text-neutral-300 outline-none transition-all focus:border-[#0a0a0a] focus:bg-white"
              />
            </div>

            {/* Forgot password */}
            <div className="flex justify-end mb-6">
              <a
                href="/forgot-password"
                className="text-xs text-neutral-400 hover:text-[#0a0a0a] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg tracking-tight transition-all hover:bg-neutral-800 active:scale-[0.99] disabled:bg-neutral-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign in'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-neutral-100" />
              <span className="text-xs text-neutral-300">or</span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            {/* Sign up link */}
            <p className="text-center text-[13px] text-neutral-400">
              No account?{' '}
              <a href="/signup" className="text-[#0a0a0a] font-medium hover:underline underline-offset-2">
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

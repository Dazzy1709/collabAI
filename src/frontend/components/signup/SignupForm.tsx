import React, { useState, useEffect } from 'react';
import type { SignupData } from '../../types/auth.types';
import { useNavigate } from 'react-router';


type Errors = Partial<Record<keyof SignupData, string>>;

const SignupForm = () => {
  const [form, setForm] = useState<SignupData>({
    username: '',
    password: '',
    confirmPassword: '',
    avatar_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [consoleMessage, setConsoleMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name as keyof SignupData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = (): boolean => {
    const next: Errors = {};

    if (!form.username.trim()) {
      next.username = 'name is required.';
    } else if (form.username.length < 3) {
      next.username = 'name must be at least 3 characters.';
    }

    if (!form.password) {
      next.password = 'Password is required.';
    } else if (form.password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      next.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleFormSubmission = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConsoleMessage('');
    setIsError(false);

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch('/auth/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
       
        }),
        
      });
      console.log(form.username)

      const data = await res.json();
      if (!res.ok) {
        setIsError(true);
        setConsoleMessage(data.message || 'Something went wrong.');
      } else {
        setConsoleMessage(data.message);
        redirectHome();
      }
    } catch (err) {
      setIsError(true);
      setConsoleMessage('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (): { label: string; width: string; color: string } => {
    const p = form.password;
    if (!p) return { label: '', width: 'w-0', color: '' };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { label: 'Weak', width: 'w-1/4', color: 'bg-red-400' };
    if (score === 2) return { label: 'Fair', width: 'w-2/4', color: 'bg-amber-400' };
    if (score === 3) return { label: 'Good', width: 'w-3/4', color: 'bg-emerald-400' };
    return { label: 'Strong', width: 'w-full', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="flex min-h-screen w-full">
      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-95">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-tight mb-1.5">
              Create an account
            </h2>
            <p className="text-sm text-neutral-400">Get started — it only takes a minute.</p>
          </div>

          {/* Global error / success */}
          {consoleMessage && isError && (
            <div className="mb-5 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {consoleMessage}
            </div>
          )}
          {consoleMessage && !isError && (
            <div className="mb-5 px-3.5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
              {consoleMessage}
            </div>
          )}

          <form onSubmit={handleFormSubmission} noValidate>
            {/* name */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-[11px] font-medium text-neutral-500 uppercase tracking-widest mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="your_username"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="name"
                className={`w-full px-3.5 py-3 bg-neutral-50 border rounded-lg text-sm text-[#0a0a0a] placeholder:text-neutral-300 outline-none transition-all focus:bg-white ${
                  errors.username
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-neutral-200 focus:border-[#0a0a0a]'
                }`}
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-500">{errors.username}</p>
              )}
            </div>


            {/* Password */}
            <div className="mb-4">
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
                autoComplete="new-password"
                className={`w-full px-3.5 py-3 bg-neutral-50 border rounded-lg text-sm text-[#0a0a0a] placeholder:text-neutral-300 outline-none transition-all focus:bg-white ${
                  errors.password
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-neutral-200 focus:border-[#0a0a0a]'
                }`}
              />
              {/* Password strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="h-0.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.width} ${strength.color}`}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-400">
                    Strength:{' '}
                    <span
                      className={
                        strength.label === 'Weak'
                          ? 'text-red-400'
                          : strength.label === 'Fair'
                          ? 'text-amber-500'
                          : 'text-emerald-500'
                      }
                    >
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-[11px] font-medium text-neutral-500 uppercase tracking-widest mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className={`w-full px-3.5 py-3 bg-neutral-50 border rounded-lg text-sm text-[#0a0a0a] placeholder:text-neutral-300 outline-none transition-all focus:bg-white ${
                  errors.confirmPassword
                    ? 'border-red-300 focus:border-red-400'
                    : form.confirmPassword && form.password === form.confirmPassword
                    ? 'border-emerald-300 focus:border-emerald-400'
                    : 'border-neutral-200 focus:border-[#0a0a0a]'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
              {!errors.confirmPassword &&
                form.confirmPassword &&
                form.password === form.confirmPassword && (
                  <p className="mt-1.5 text-xs text-emerald-500 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Passwords match
                  </p>
                )}
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
                  Creating account…
                </span>
              ) : (
                'Create account'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-neutral-100" />
              <span className="text-xs text-neutral-300">or</span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            {/* Login link */}
            <p className="text-center text-[13px] text-neutral-400">
              Already have an account?{' '}
              <a href="/login" className="text-[#0a0a0a] font-medium hover:underline underline-offset-2">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

import React from 'react'
import SignupForm from '../components/signup/SignupForm'
import ReturnHomeMenu from '../components/universal/ReturnHomeMenu'

type Props = {}

const Signup = (props: Props) => {
  
  return (
    <div>
      <ReturnHomeMenu />
      <div className="signup-container flex min-h-screen">
        {/* ── Left branding panel ── */}
        <div className="hidden md:flex w-[45%] bg-[#0a0a0a] flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle circle accents */}
        <div className="absolute -top-10 -right-10 w-64 h-64 border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 border border-white/3 rounded-full pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 border border-white/80 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 3h12M1 7h8M1 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-white text-[15px] font-medium tracking-tight">Nexus Chat</span>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h1 className="font-serif text-white text-5xl leading-[1.1] font-normal mb-5">
            Your people<br />are waiting<br />for you.
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-70">
            Join thousands of teams using Nexus Chat for real-time messaging, group conversations, and more.
          </p>

          {/* Social proof strip */}
          <div className="flex items-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {['J', 'A', 'M', 'S'].map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border border-[#0a0a0a] bg-neutral-700 flex items-center justify-center text-[10px] text-white font-medium"
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-white/35 text-xs">10,000+ users and counting</p>
          </div>
        </div>

        <p className="text-white/20 text-xs relative z-10">© 2026 Nexus Chat</p>
        </div>
      <SignupForm />
      </div>
      
    </div>
  )
}

export default Signup;
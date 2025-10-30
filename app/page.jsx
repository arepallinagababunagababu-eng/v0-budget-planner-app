"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import Image from "next/image"
import { ArrowRight, TrendingUp, Shield, Target, Zap } from "lucide-react"

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50">
              <span className="text-white font-bold text-lg">BP</span>
            </div>
            <span className="text-white font-bold text-xl">Budget Planner</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-slate-300 hover:text-emerald-400 transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-slate-300 hover:text-emerald-400 transition-colors">
              Benefits
            </a>
            <a href="#how-it-works" className="text-slate-300 hover:text-emerald-400 transition-colors">
              How It Works
            </a>
            <button
              onClick={() => setIsLogin(true)}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
                  Smart Financial Planning
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Take Control of Your{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent animate-gradient">
                  Financial Future
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                The all-in-one platform to track income, manage expenses, monitor investments, and achieve your
                financial goals. Start building wealth with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsLogin(false)}
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border-2 border-slate-600 text-white rounded-xl font-semibold hover:border-emerald-500 hover:bg-emerald-500/10 transition-all">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-white">10K+</p>
                  <p className="text-slate-400 text-sm">Active Users</p>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div>
                  <p className="text-3xl font-bold text-white">$50M+</p>
                  <p className="text-slate-400 text-sm">Managed</p>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div>
                  <p className="text-3xl font-bold text-white">4.9/5</p>
                  <p className="text-slate-400 text-sm">User Rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <Image
                  src="/attached_assets/stock_images/financial_planning_d_8dc8e6d6.jpg"
                  alt="Financial Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to
              <span className="text-emerald-400"> Succeed</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to help you take control of your finances
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/50">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Income Tracking</h3>
              <p className="text-slate-400 leading-relaxed">
                Monitor all your income sources in one place. Visualize earnings trends and identify growth opportunities
                with smart analytics.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 transition-all transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/50">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Expense Management</h3>
              <p className="text-slate-400 leading-relaxed">
                Categorize spending, set budgets, and get intelligent insights to help you save more and spend smarter.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Investment Portfolio</h3>
              <p className="text-slate-400 leading-relaxed">
                Track your investments, monitor performance, and make data-driven decisions to grow your wealth.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/50">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Goal Setting</h3>
              <p className="text-slate-400 leading-relaxed">
                Set financial goals, track progress, and celebrate milestones. Stay motivated on your journey to financial
                freedom.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/50">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Smart Analytics</h3>
              <p className="text-slate-400 leading-relaxed">
                Get actionable insights with beautiful charts and reports. Understand your financial patterns at a glance.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Real-time Sync</h3>
              <p className="text-slate-400 leading-relaxed">
                Access your financial data anywhere, anytime. All your information syncs instantly across all devices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get started in minutes and take control of your finances today
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/50">
                  <span className="text-white text-3xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Create Your Account</h3>
                <p className="text-slate-400">
                  Sign up in seconds with just your email. No credit card required to start your financial journey.
                </p>
              </div>
              <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div>
            </div>

            <div className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
                  <span className="text-white text-3xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Add Your Data</h3>
                <p className="text-slate-400">
                  Input your income, expenses, and investments. Our intuitive interface makes it quick and easy.
                </p>
              </div>
              <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50">
                <span className="text-white text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Achieve Your Goals</h3>
              <p className="text-slate-400">
                Watch your wealth grow with actionable insights, smart budgeting, and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back!" : "Start Your Journey"}
              </h2>
              <p className="text-slate-400">
                {isLogin ? "Sign in to access your financial dashboard" : "Create your free account today"}
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  isLogin
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 transform scale-105"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  !isLogin
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 transform scale-105"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Content */}
            {isLogin ? <LoginForm /> : <RegisterForm />}

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-center text-sm text-slate-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Budget Planner?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Join thousands of users who trust us with their financial future
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Bank-Level Security</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Your financial data is encrypted and protected with industry-leading security standards. We never store
                    sensitive information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Zap className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Optimized for speed with real-time updates. Get instant insights without waiting for data to sync.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Target className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Goal-Oriented Design</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Every feature is built to help you achieve your financial goals faster. Stay motivated with progress
                    tracking.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <Image
                  src="/attached_assets/stock_images/happy_person_budgeti_130ba533.jpg"
                  alt="Happy person using budget planner"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-emerald-500/10 via-emerald-600/10 to-emerald-500/10 border-y border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have taken control of their finances. Start your journey today for free.
          </p>
          <button
            onClick={() => setIsLogin(false)}
            className="group px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-3"
          >
            Get Started Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <span className="text-white font-bold text-lg">BP</span>
                </div>
                <span className="text-white font-bold text-xl">Budget Planner</span>
              </div>
              <p className="text-slate-400 text-sm">
                Your trusted partner in financial planning and wealth building.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400 text-sm">&copy; 2025 Budget Planner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

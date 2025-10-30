"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"

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
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">BP</span>
            </div>
            <span className="text-white font-bold text-xl">Budget Planner</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition">
              Features
            </a>
            <a href="#benefits" className="text-slate-300 hover:text-white transition">
              Benefits
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Take Control of Your{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Financial Future
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Manage your income, expenses, investments, and goals all in one beautiful, intuitive platform. Start
            building wealth today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsLogin(false)}
              className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition"
            >
              Get Started Free
            </button>
            <button className="px-8 py-3 border border-slate-600 text-white rounded-lg font-semibold hover:border-slate-400 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div id="features" className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-white font-semibold mb-2">Track Income</h3>
            <p className="text-slate-400 text-sm">Monitor all your income sources and visualize your earnings</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition">
            <div className="text-3xl mb-3">💸</div>
            <h3 className="text-white font-semibold mb-2">Manage Expenses</h3>
            <p className="text-slate-400 text-sm">Categorize and control your spending with smart insights</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-white font-semibold mb-2">Grow Wealth</h3>
            <p className="text-slate-400 text-sm">Track investments and reach your financial goals faster</p>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="max-w-md mx-auto mb-20 px-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
          {/* Tab Buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                isLogin
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/50"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                !isLogin
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/50"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
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
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="bg-slate-800/30 border-t border-slate-700 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose Budget Planner?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500/20 text-emerald-400">
                  <span className="text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-time Updates</h3>
                <p className="text-slate-400">See your financial data update instantly across all devices</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500/20 text-emerald-400">
                  <span className="text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Analytics</h3>
                <p className="text-slate-400">Get actionable insights into your spending and saving patterns</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500/20 text-emerald-400">
                  <span className="text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Goal Tracking</h3>
                <p className="text-slate-400">Set and monitor financial goals with progress visualization</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500/20 text-emerald-400">
                  <span className="text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure & Private</h3>
                <p className="text-slate-400">Your financial data is encrypted and protected with industry standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>&copy; 2025 Budget Planner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

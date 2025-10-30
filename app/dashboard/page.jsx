"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import RecentTransactions from "@/components/RecentTransactions"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function Dashboard() {
  const { token } = useAuth()
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalInvestments: 0,
    netBalance: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [incomeRes, expensesRes, investmentsRes] = await Promise.all([
          fetch("/api/income", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/expenses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/investments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const incomeData = await incomeRes.json()
        const expensesData = await expensesRes.json()
        const investmentsData = await investmentsRes.json()

        const totalIncome = incomeData.data?.reduce((sum, item) => sum + item.amount, 0) || 0
        const totalExpenses = expensesData.data?.reduce((sum, item) => sum + item.amount, 0) || 0
        const totalInvestments = investmentsData.data?.reduce((sum, item) => sum + item.currentValue, 0) || 0

        setStats({
          totalIncome,
          totalExpenses,
          totalInvestments,
          netBalance: totalIncome - totalExpenses,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchStats()
      const interval = setInterval(fetchStats, 5000)
      return () => clearInterval(interval)
    }
  }, [token])

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition">
                  <h3 className="text-slate-400 text-sm font-medium mb-2">Total Income</h3>
                  <p className="text-3xl font-bold text-emerald-400">${stats.totalIncome.toFixed(2)}</p>
                  <p className="text-xs text-slate-500 mt-2">All income sources</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-red-500/50 transition">
                  <h3 className="text-slate-400 text-sm font-medium mb-2">Total Expenses</h3>
                  <p className="text-3xl font-bold text-red-400">${stats.totalExpenses.toFixed(2)}</p>
                  <p className="text-xs text-slate-500 mt-2">All expenses</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition">
                  <h3 className="text-slate-400 text-sm font-medium mb-2">Total Investments</h3>
                  <p className="text-3xl font-bold text-blue-400">${stats.totalInvestments.toFixed(2)}</p>
                  <p className="text-xs text-slate-500 mt-2">Current value</p>
                </div>
                <div
                  className={`bg-slate-800/50 backdrop-blur border rounded-xl p-6 transition ${stats.netBalance >= 0 ? "border-emerald-500/50 hover:border-emerald-500" : "border-red-500/50 hover:border-red-500"}`}
                >
                  <h3 className="text-slate-400 text-sm font-medium mb-2">Net Balance</h3>
                  <p className={`text-3xl font-bold ${stats.netBalance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    ${stats.netBalance.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Income - Expenses</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
                  <RecentTransactions />
                </div>

                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <a
                      href="/income"
                      className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition text-center font-medium"
                    >
                      Add Income
                    </a>
                    <a
                      href="/expenses"
                      className="block w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition text-center font-medium"
                    >
                      Add Expense
                    </a>
                    <a
                      href="/investments"
                      className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition text-center font-medium"
                    >
                      Add Investment
                    </a>
                    <a
                      href="/goals"
                      className="block w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition text-center font-medium"
                    >
                      Create Goal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

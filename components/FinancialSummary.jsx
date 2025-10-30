"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function FinancialSummary() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalInvestments: 0,
    totalGoals: 0,
    netBalance: 0,
  })
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [incomeRes, expensesRes, investmentsRes, goalsRes] = await Promise.all([
          fetch("/api/income", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/expenses", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/investments", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/goals", { headers: { Authorization: `Bearer ${token}` } }),
        ])

        const incomeData = await incomeRes.json()
        const expensesData = await expensesRes.json()
        const investmentsData = await investmentsRes.json()
        const goalsData = await goalsRes.json()

        const totalIncome = incomeData.data?.reduce((sum, item) => sum + item.amount, 0) || 0
        const totalExpenses = expensesData.data?.reduce((sum, item) => sum + item.amount, 0) || 0
        const totalInvestments = investmentsData.data?.reduce((sum, item) => sum + item.currentValue, 0) || 0
        const totalGoals = goalsData.data?.reduce((sum, item) => sum + item.targetAmount, 0) || 0

        setSummary({
          totalIncome,
          totalExpenses,
          totalInvestments,
          totalGoals,
          netBalance: totalIncome - totalExpenses,
        })
      } catch (error) {
        console.error("Error fetching summary:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchSummary()
    }
  }, [token])

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Income</h3>
        <p className="text-2xl font-bold text-green-600">${summary.totalIncome.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-600">${summary.totalExpenses.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">Net Balance</h3>
        <p className={`text-2xl font-bold ${summary.netBalance >= 0 ? "text-blue-600" : "text-red-600"}`}>
          ${summary.netBalance.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Investments</h3>
        <p className="text-2xl font-bold text-purple-600">${summary.totalInvestments.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Goals</h3>
        <p className="text-2xl font-bold text-indigo-600">${summary.totalGoals.toFixed(2)}</p>
      </div>
    </div>
  )
}

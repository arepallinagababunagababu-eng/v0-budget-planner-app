"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function MonthlyTrendChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expensesRes] = await Promise.all([
          fetch("/api/income", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/expenses", { headers: { Authorization: `Bearer ${token}` } }),
        ])

        const incomeData = await incomeRes.json()
        const expensesData = await expensesRes.json()

        const monthlyData = {}

        incomeData.data?.forEach((item) => {
          const date = new Date(item.date)
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { income: 0, expenses: 0 }
          }
          monthlyData[monthKey].income += item.amount
        })

        expensesData.data?.forEach((item) => {
          const date = new Date(item.date)
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { income: 0, expenses: 0 }
          }
          monthlyData[monthKey].expenses += item.amount
        })

        const chartData = Object.entries(monthlyData)
          .sort()
          .slice(-6)
          .map(([month, data]) => ({
            month,
            income: data.income,
            expenses: data.expenses,
            balance: data.income - data.expenses,
          }))

        setData(chartData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchData()
    }
  }, [token])

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>
  }

  const maxValue = Math.max(...data.flatMap((d) => [d.income, d.expenses]), 1)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trend (Last 6 Months)</h3>

      {data.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No data available</p>
      ) : (
        <div className="space-y-6">
          {data.map((item) => (
            <div key={item.month}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.month}</span>
                <span className={`text-sm font-semibold ${item.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  Balance: ${item.balance.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(item.income / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Income: ${item.income.toFixed(2)}</p>
                </div>

                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(item.expenses / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Expenses: ${item.expenses.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

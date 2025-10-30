"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function IncomeCategoryChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await fetch("/api/income", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const incomeData = await res.json()

        const categoryTotals = {}
        incomeData.data?.forEach((income) => {
          categoryTotals[income.category] = (categoryTotals[income.category] || 0) + income.amount
        })

        const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
          category,
          amount,
        }))

        setData(chartData)
      } catch (error) {
        console.error("Error fetching income:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchIncome()
    }
  }, [token])

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Income by Category</h3>

      {data.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No income data available</p>
      ) : (
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = (item.amount / total) * 100
            return (
              <div key={item.category}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-semibold text-gray-900">${item.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [incomeRes, expensesRes] = await Promise.all([
          fetch("/api/income", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/expenses", { headers: { Authorization: `Bearer ${token}` } }),
        ])

        const incomeData = await incomeRes.json()
        const expensesData = await expensesRes.json()

        const allTransactions = [
          ...(incomeData.data || []).map((item) => ({
            ...item,
            type: "income",
            displayName: item.source,
          })),
          ...(expensesData.data || []).map((item) => ({
            ...item,
            type: "expense",
            displayName: item.description,
          })),
        ]

        allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
        setTransactions(allTransactions.slice(0, 10))
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchTransactions()
    }
  }, [token])

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>
  }

  if (transactions.length === 0) {
    return <div className="text-center py-8 text-gray-600">No transactions yet</div>
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {transactions.map((item) => (
            <tr key={`${item.type}-${item._id}`} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{item.displayName}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.type === "income" ? "Income" : "Expense"}
                </span>
              </td>
              <td
                className={`px-6 py-4 text-sm font-semibold ${
                  item.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

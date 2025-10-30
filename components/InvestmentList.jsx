"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function InvestmentList({ refresh }) {
  const [investments, setInvestments] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await fetch("/api/investments", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setInvestments(data.data || [])
      } catch (error) {
        console.error("Error fetching investments:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchInvestments()
    }
  }, [token, refresh])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return

    try {
      await fetch(`/api/investments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setInvestments(investments.filter((item) => item._id !== id))
    } catch (error) {
      console.error("Error deleting investment:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>
  }

  if (investments.length === 0) {
    return <div className="text-center py-8 text-gray-600">No investments yet</div>
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Purchase</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Current Value</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Gain/Loss</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {investments.map((item) => {
            const gainLoss = item.currentValue - item.amount
            const gainLossPercent = ((gainLoss / item.amount) * 100).toFixed(2)
            return (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${item.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">${item.currentValue.toFixed(2)}</td>
                <td className={`px-6 py-4 text-sm font-semibold ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${gainLoss.toFixed(2)} ({gainLossPercent}%)
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

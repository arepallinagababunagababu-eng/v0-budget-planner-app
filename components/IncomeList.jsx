"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function IncomeList({ refresh }) {
  const [income, setIncome] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await fetch("/api/income", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setIncome(data.data || [])
      } catch (error) {
        console.error("Error fetching income:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchIncome()
    }
  }, [token, refresh])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return

    try {
      await fetch(`/api/income/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setIncome(income.filter((item) => item._id !== id))
    } catch (error) {
      console.error("Error deleting income:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>
  }

  if (income.length === 0) {
    return <div className="text-center py-8 text-gray-600">No income records yet</div>
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {income.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{item.source}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
              <td className="px-6 py-4 text-sm font-semibold text-green-600">${item.amount.toFixed(2)}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm">
                <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800 font-medium">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

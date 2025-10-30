"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function GoalList({ refresh }) {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setGoals(data.data || [])
      } catch (error) {
        console.error("Error fetching goals:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchGoals()
    }
  }, [token, refresh])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return

    try {
      await fetch(`/api/goals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setGoals(goals.filter((item) => item._id !== id))
    } catch (error) {
      console.error("Error deleting goal:", error)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/goals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        const data = await res.json()
        setGoals(goals.map((g) => (g._id === id ? data.data : g)))
      }
    } catch (error) {
      console.error("Error updating goal:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>
  }

  if (goals.length === 0) {
    return <div className="text-center py-8 text-gray-600">No goals yet</div>
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100
        const daysLeft = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24))

        return (
          <div key={goal._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                <p className="text-sm text-gray-600">{goal.category}</p>
              </div>
              <select
                value={goal.status}
                onChange={(e) => handleStatusChange(goal._id, e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Active</option>
                <option>Completed</option>
                <option>Abandoned</option>
              </select>
            </div>

            <p className="text-sm text-gray-600 mb-4">{goal.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">
                  ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                </span>
                <span className="text-gray-600">{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className={daysLeft > 0 ? "text-gray-600" : "text-red-600"}>
                {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
              </span>
              <button onClick={() => handleDelete(goal._id)} className="text-red-600 hover:text-red-800 font-medium">
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

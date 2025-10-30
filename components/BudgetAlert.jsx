"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function BudgetAlert() {
  const [alert, setAlert] = useState(null)
  const { token, user } = useAuth()

  useEffect(() => {
    const checkBudget = async () => {
      if (!user?.monthlyBudget || user.monthlyBudget === 0) return

      try {
        const res = await fetch("/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()

        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()

        const monthlyExpenses =
          data.data?.reduce((sum, expense) => {
            const expenseDate = new Date(expense.date)
            if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
              return sum + expense.amount
            }
            return sum
          }, 0) || 0

        const percentage = (monthlyExpenses / user.monthlyBudget) * 100

        if (percentage >= 100) {
          setAlert({
            type: "error",
            message: `You have exceeded your monthly budget by $${(monthlyExpenses - user.monthlyBudget).toFixed(2)}`,
          })
        } else if (percentage >= 80) {
          setAlert({
            type: "warning",
            message: `You have spent ${percentage.toFixed(0)}% of your monthly budget`,
          })
        } else {
          setAlert(null)
        }
      } catch (error) {
        console.error("Error checking budget:", error)
      }
    }

    if (token && user) {
      checkBudget()
    }
  }, [token, user])

  if (!alert) return null

  return (
    <div
      className={`fixed top-20 right-8 p-4 rounded-lg shadow-lg text-white max-w-sm ${
        alert.type === "error" ? "bg-red-600" : "bg-yellow-600"
      }`}
    >
      {alert.message}
    </div>
  )
}

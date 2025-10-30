"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import GoalForm from "@/components/GoalForm"
import GoalList from "@/components/GoalList"
import { useState } from "react"

export default function GoalsPage() {
  const [refresh, setRefresh] = useState(0)

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Goals</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <GoalForm onSuccess={() => setRefresh(refresh + 1)} />
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Your Goals</h2>
                  <GoalList refresh={refresh} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

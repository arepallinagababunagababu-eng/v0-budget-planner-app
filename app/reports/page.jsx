"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import FinancialSummary from "@/components/FinancialSummary"
import ExpenseCategoryChart from "@/components/ExpenseCategoryChart"
import IncomeCategoryChart from "@/components/IncomeCategoryChart"
import MonthlyTrendChart from "@/components/MonthlyTrendChart"

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Reports & Analytics</h1>

              <div className="mb-8">
                <FinancialSummary />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ExpenseCategoryChart />
                <IncomeCategoryChart />
              </div>

              <div className="mt-8">
                <MonthlyTrendChart />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

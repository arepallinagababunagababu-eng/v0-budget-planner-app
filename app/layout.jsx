import { AuthProvider } from "@/lib/context"
import BudgetAlert from "@/components/BudgetAlert"
import "./globals.css"

export const metadata = {
  title: "Budget Planner",
  description: "Manage your finances with ease",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <BudgetAlert />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

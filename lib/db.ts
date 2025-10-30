// In-memory database with localStorage persistence
// This can be easily replaced with MongoDB/Supabase later

interface User {
  id: string
  name: string
  email: string
  password: string
  currency: string
  createdAt: string
}

interface Transaction {
  id: string
  userId: string
  type: "income" | "expense"
  category: string
  amount: number
  date: string
  note: string
  createdAt: string
}

interface Investment {
  id: string
  userId: string
  name: string
  amount: number
  roi: number
  date: string
  status: "active" | "completed"
  createdAt: string
}

interface Goal {
  id: string
  userId: string
  goalName: string
  targetAmount: number
  savedAmount: number
  status: "in-progress" | "completed"
  createdAt: string
}

// Initialize data from localStorage
const getStoredData = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

const saveData = (key: string, data: any) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Failed to save data:", error)
  }
}

export const db = {
  users: {
    getAll: () => getStoredData("users", []),
    getById: (id: string) => {
      const users = getStoredData("users", [])
      return users.find((u: User) => u.id === id)
    },
    getByEmail: (email: string) => {
      const users = getStoredData("users", [])
      return users.find((u: User) => u.email === email)
    },
    create: (user: Omit<User, "id" | "createdAt">) => {
      const users = getStoredData("users", [])
      const newUser: User = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      users.push(newUser)
      saveData("users", users)
      return newUser
    },
    update: (id: string, updates: Partial<User>) => {
      const users = getStoredData("users", [])
      const index = users.findIndex((u: User) => u.id === id)
      if (index !== -1) {
        users[index] = { ...users[index], ...updates }
        saveData("users", users)
        return users[index]
      }
      return null
    },
  },
  transactions: {
    getByUserId: (userId: string) => {
      const transactions = getStoredData("transactions", [])
      return transactions.filter((t: Transaction) => t.userId === userId)
    },
    create: (transaction: Omit<Transaction, "id" | "createdAt">) => {
      const transactions = getStoredData("transactions", [])
      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      transactions.push(newTransaction)
      saveData("transactions", transactions)
      return newTransaction
    },
    update: (id: string, updates: Partial<Transaction>) => {
      const transactions = getStoredData("transactions", [])
      const index = transactions.findIndex((t: Transaction) => t.id === id)
      if (index !== -1) {
        transactions[index] = { ...transactions[index], ...updates }
        saveData("transactions", transactions)
        return transactions[index]
      }
      return null
    },
    delete: (id: string) => {
      const transactions = getStoredData("transactions", [])
      const filtered = transactions.filter((t: Transaction) => t.id !== id)
      saveData("transactions", filtered)
      return true
    },
  },
  investments: {
    getByUserId: (userId: string) => {
      const investments = getStoredData("investments", [])
      return investments.filter((i: Investment) => i.userId === userId)
    },
    create: (investment: Omit<Investment, "id" | "createdAt">) => {
      const investments = getStoredData("investments", [])
      const newInvestment: Investment = {
        ...investment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      investments.push(newInvestment)
      saveData("investments", investments)
      return newInvestment
    },
    update: (id: string, updates: Partial<Investment>) => {
      const investments = getStoredData("investments", [])
      const index = investments.findIndex((i: Investment) => i.id === id)
      if (index !== -1) {
        investments[index] = { ...investments[index], ...updates }
        saveData("investments", investments)
        return investments[index]
      }
      return null
    },
    delete: (id: string) => {
      const investments = getStoredData("investments", [])
      const filtered = investments.filter((i: Investment) => i.id !== id)
      saveData("investments", filtered)
      return true
    },
  },
  goals: {
    getByUserId: (userId: string) => {
      const goals = getStoredData("goals", [])
      return goals.filter((g: Goal) => g.userId === userId)
    },
    create: (goal: Omit<Goal, "id" | "createdAt">) => {
      const goals = getStoredData("goals", [])
      const newGoal: Goal = {
        ...goal,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      goals.push(newGoal)
      saveData("goals", goals)
      return newGoal
    },
    update: (id: string, updates: Partial<Goal>) => {
      const goals = getStoredData("goals", [])
      const index = goals.findIndex((g: Goal) => g.id === id)
      if (index !== -1) {
        goals[index] = { ...goals[index], ...updates }
        saveData("goals", goals)
        return goals[index]
      }
      return null
    },
    delete: (id: string) => {
      const goals = getStoredData("goals", [])
      const filtered = goals.filter((g: Goal) => g.id !== id)
      saveData("goals", filtered)
      return true
    },
  },
}

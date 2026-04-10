import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
  phone: string
  role: 'patient' | 'admin'
  token: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female'
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock users DB stored in localStorage
const MOCK_USERS_KEY = 'alshifa_users'
const AUTH_KEY = 'alshifa_auth'

function getMockUsers(): Record<string, { id: string; name: string; email: string; password: string; phone: string; role: 'patient' | 'admin' }> {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(MOCK_USERS_KEY)
    const users = stored ? JSON.parse(stored) : {}
    // Seed default users
    if (!users['admin@alshifa.com']) {
      users['admin@alshifa.com'] = { id: 'admin1', name: 'مدير النظام', email: 'admin@alshifa.com', password: 'admin123', phone: '+966500000001', role: 'admin' }
    }
    if (!users['patient@alshifa.com']) {
      users['patient@alshifa.com'] = { id: 'u1', name: 'محمد علي السهلي', email: 'patient@alshifa.com', password: 'patient123', phone: '+966501111111', role: 'patient' }
    }
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
    return users
  } catch {
    return {}
  }
}

function generateToken(userId: string): string {
  return btoa(`${userId}:${Date.now()}:alshifa_secret`)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500))
    const users = getMockUsers()
    const found = users[email.toLowerCase()]
    if (!found || found.password !== password) {
      return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }
    }
    const authUser: AuthUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      role: found.role,
      token: generateToken(found.id),
    }
    setUser(authUser)
    localStorage.setItem(AUTH_KEY, JSON.stringify(authUser))
    return { success: true }
  }

  const register = async (data: RegisterData) => {
    await new Promise((r) => setTimeout(r, 500))
    const users = getMockUsers()
    if (users[data.email.toLowerCase()]) {
      return { success: false, error: 'البريد الإلكتروني مسجل مسبقاً' }
    }
    const newUser = {
      id: `u_${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: 'patient' as const,
    }
    users[data.email.toLowerCase()] = newUser
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
    const authUser: AuthUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: 'patient',
      token: generateToken(newUser.id),
    }
    setUser(authUser)
    localStorage.setItem(AUTH_KEY, JSON.stringify(authUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

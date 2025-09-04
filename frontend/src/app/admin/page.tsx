'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminDashboard from '@/components/admin/AdminDashboard'
import AdminLogin from '@/components/admin/AdminLogin'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('admin_token')
    
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('admin_token')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('admin_token')
    }
    
    setIsLoading(false)
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return isAuthenticated ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  )
}
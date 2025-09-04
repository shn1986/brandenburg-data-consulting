'use client'

import { useState, useEffect } from 'react'
import { 
  HomeIcon, 
  EnvelopeIcon, 
  DocumentTextIcon, 
  BriefcaseIcon,
  HeartIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'
import AdminMessages from './AdminMessages'
import ContentManager from './ContentManager'

interface AdminDashboardProps {
  onLogout: () => void
}

interface DashboardStats {
  newMessages: number
  totalMessages: number
  publishedPosts: number
  portfolioItems: number
}

interface RecentMessage {
  id: number
  first_name: string
  last_name: string
  email: string
  service: string
  created_at: string
}

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, id: 'dashboard' },
  { name: 'Messages', icon: EnvelopeIcon, id: 'messages' },
  { name: 'Content', icon: DocumentTextIcon, id: 'content' },
  { name: 'Blog', icon: ChatBubbleBottomCenterTextIcon, id: 'blog' },
  { name: 'Portfolio', icon: BriefcaseIcon, id: 'portfolio' },
  { name: 'Testimonials', icon: HeartIcon, id: 'testimonials' },
  { name: 'Settings', icon: CogIcon, id: 'settings' },
]

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData()
    }
  }, [activeTab])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setRecentMessages(data.recentMessages)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    onLogout()
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Overview of your website activity and recent updates.
              </p>
            </div>

            {/* Stats Grid */}
            {stats && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">New Messages</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.newMessages}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Messages</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.totalMessages}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Published Posts</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.publishedPosts}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BriefcaseIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Portfolio Items</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.portfolioItems}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Messages */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Messages
                </h3>
                {recentMessages.length > 0 ? (
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            {message.first_name} {message.last_name}
                          </p>
                          <p className="text-sm text-gray-500">{message.email}</p>
                          {message.service && (
                            <p className="text-sm text-gray-600">Interest: {message.service}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(message.created_at).toLocaleDateString()}
                          </p>
                          <button
                            onClick={() => setActiveTab('messages')}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No recent messages</p>
                )}
              </div>
            </div>
          </div>
        )
      
      case 'messages':
        return <AdminMessages />
      
      case 'content':
        return <ContentManager />
      
      case 'blog':
      case 'portfolio':
      case 'testimonials':
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {navigation.find(nav => nav.id === activeTab)?.name}
            </h2>
            <p className="text-gray-500">This section is coming soon!</p>
          </div>
        )
      
      default:
        return null
    }
  }

  if (isLoading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <h1 className="text-xl font-bold text-white">Brandenburg Admin</h1>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </button>
              )
            })}
          </nav>
          
          <div className="px-2 pb-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
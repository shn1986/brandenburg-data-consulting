'use client'

import { useState, useEffect } from 'react'
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  CheckIcon,
  ArrowUturnLeftIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

interface Message {
  id: number
  first_name: string
  last_name: string
  email: string
  company: string | null
  phone: string | null
  service: string | null
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [pagination.page, statusFilter])

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || '/api'}/admin/messages?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateMessageStatus = async (messageId: number, status: Message['status']) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || '/api'}/admin/messages/${messageId}/status`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      )

      if (response.ok) {
        // Update the message in the local state
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, status } : msg
          )
        )
        
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(prev => prev ? { ...prev, status } : null)
        }
      }
    } catch (error) {
      console.error('Failed to update message status:', error)
    }
  }

  const getStatusBadge = (status: Message['status']) => {
    const styles = {
      new: 'bg-red-100 text-red-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  if (selectedMessage) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center">
          <button
            onClick={() => setSelectedMessage(null)}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Back to Messages
          </button>
        </div>

        {/* Message Details */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedMessage.first_name} {selectedMessage.last_name}
                </h1>
                <p className="text-sm text-gray-500">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(selectedMessage.status)}
                <div className="flex space-x-1">
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Mark as read"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Mark as replied"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900">{selectedMessage.email}</dd>
                    </div>
                    {selectedMessage.company && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Company</dt>
                        <dd className="text-sm text-gray-900">{selectedMessage.company}</dd>
                      </div>
                    )}
                    {selectedMessage.phone && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="text-sm text-gray-900">{selectedMessage.phone}</dd>
                      </div>
                    )}
                    {selectedMessage.service && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Service Interest</dt>
                        <dd className="text-sm text-gray-900">{selectedMessage.service}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <button
                    onClick={() => window.location.href = `mailto:${selectedMessage.email}`}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                    Reply via Email
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage contact form submissions and inquiries.
          </p>
        </div>
        
        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white shadow rounded-lg">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {message.first_name} {message.last_name}
                      </h3>
                      {getStatusBadge(message.status)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{message.email}</p>
                    {message.service && (
                      <p className="text-sm text-gray-600 mt-1">Interest: {message.service}</p>
                    )}
                    <p className="text-sm text-gray-800 mt-2 line-clamp-2">
                      {message.message.substring(0, 150)}
                      {message.message.length > 150 ? '...' : ''}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No messages found.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">
                    {((pagination.page - 1) * pagination.limit) + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{pagination.total}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const pageNumber = i + 1
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          pageNumber === pagination.page
                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
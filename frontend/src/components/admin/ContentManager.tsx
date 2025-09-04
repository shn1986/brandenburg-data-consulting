'use client'

import { useState, useEffect } from 'react'
import { PencilIcon, PlusIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ContentItem {
  page: string
  section: string
  key: string
  value: string
  type: string
  created_at: string
  updated_at: string
}

interface EditingItem extends ContentItem {
  isNew?: boolean
}

export default function ContentManager() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPage, setSelectedPage] = useState<string>('all')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/content/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setContent(data.content || [])
      } else {
        console.error('Failed to fetch content:', response.status, response.statusText)
        setContent([])
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
      setContent([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editingItem) return

    try {
      const token = localStorage.getItem('admin_token')
      const url = editingItem.isNew 
        ? `${process.env.NEXT_PUBLIC_API_URL || '/api'}/content`
        : `${process.env.NEXT_PUBLIC_API_URL || '/api'}/content/${editingItem.page}/${editingItem.section}/${editingItem.key}`
      
      const method = editingItem.isNew ? 'POST' : 'PUT'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page: editingItem.page,
          section: editingItem.section,
          key: editingItem.key,
          value: editingItem.value,
          type: editingItem.type
        })
      })

      if (response.ok) {
        if (editingItem.isNew) {
          // Add new item to content array
          setContent(prev => [...prev, {
            ...editingItem,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
        } else {
          // Update existing item
          setContent(prev => prev.map(item => 
            item.page === editingItem.page && 
            item.section === editingItem.section && 
            item.key === editingItem.key
              ? { ...editingItem, updated_at: new Date().toISOString() }
              : item
          ))
        }
        setEditingItem(null)
      } else {
        console.error('Failed to save content')
      }
    } catch (error) {
      console.error('Failed to save content:', error)
    }
  }

  const handleDelete = async (item: ContentItem) => {
    if (!confirm('Are you sure you want to delete this content item?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || '/api'}/content/${item.page}/${item.section}/${item.key}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.ok) {
        setContent(prev => prev.filter(
          content => !(content.page === item.page && content.section === item.section && content.key === item.key)
        ))
      }
    } catch (error) {
      console.error('Failed to delete content:', error)
    }
  }

  const handleAddNew = () => {
    setEditingItem({
      page: '',
      section: '',
      key: '',
      value: '',
      type: 'text',
      created_at: '',
      updated_at: '',
      isNew: true
    })
  }

  const filteredContent = (content || []).filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPage = selectedPage === 'all' || item.page === selectedPage

    return matchesSearch && matchesPage
  })

  const uniquePages = Array.from(new Set(content.map(item => item.page))).sort()

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Loading content...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage website content dynamically through the CMS.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Content
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="all">All Pages</option>
            {uniquePages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((item, index) => (
                <tr key={`${item.page}-${item.section}-${item.key}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.page}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.key}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    <div className="truncate">
                      {item.value.substring(0, 100)}
                      {item.value.length > 100 ? '...' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {editingItem.isNew ? 'Add New Content' : 'Edit Content'}
              </h3>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Page</label>
                  <input
                    type="text"
                    value={editingItem.page}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, page: e.target.value} : null)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="e.g., home, about, services"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Section</label>
                  <input
                    type="text"
                    value={editingItem.section}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, section: e.target.value} : null)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="e.g., hero, stats, main"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Key</label>
                  <input
                    type="text"
                    value={editingItem.key}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, key: e.target.value} : null)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="e.g., title, description, image"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={editingItem.type}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, type: e.target.value} : null)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="html">HTML</option>
                    <option value="markdown">Markdown</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Value</label>
                <textarea
                  value={editingItem.value}
                  onChange={(e) => setEditingItem(prev => prev ? {...prev, value: e.target.value} : null)}
                  rows={editingItem.type === 'html' || editingItem.type === 'markdown' ? 10 : 4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter the content value..."
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingItem(null)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'

type PostData = {
  title: string
  content: string
  excerpt?: string
  published: boolean
}

export default function PostForm({ 
  initialData,
  onSubmit,
}: { 
  initialData?: PostData
  onSubmit?: (data: PostData) => Promise<{ error?: string }>
}) {
  const [formData, setFormData] = useState<PostData>(initialData || {
    title: '',
    content: '',
    excerpt: '',
    published: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (onSubmit) {
        const result = await onSubmit(formData)
        if (result?.error) {
          console.error('Form submission error:', result.error)
        }
      } else {
        console.log('Form submitted:', formData)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          rows={10}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  )
}

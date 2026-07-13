'use client'

import { useState } from 'react'

type PostData = {
  title: string
  content: string
  excerpt?: string
  published: boolean
}

export function PostForm({ initialData }: { initialData?: PostData }) {
  const [formData, setFormData] = useState<PostData>(initialData || {
    title: '',
    content: '',
    excerpt: '',
    published: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Add form submission logic
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
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Post
      </button>
    </form>
  )
}
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

interface ContentEditorProps {
  content: string
  onChange: (html: string) => void
}

export default function ContentEditor({ content, onChange }: ContentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  })

  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('Image URL')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const setLink = () => {
    const url = window.prompt('URL')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="border border-gray-300 rounded-md">
      <div className="flex flex-wrap gap-1 border-b border-gray-300 p-2 bg-gray-50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-white'}`}>
          Bold
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-white'}`}>
          Italic
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-white'}`}>
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-white'}`}>
          H3
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-white'}`}>
          Bullet List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'bg-white'}`}>
          Quote
        </button>
        <button type="button" onClick={addImage} className="px-2 py-1 rounded text-sm bg-white">
          Insert Image
        </button>
        <button type="button" onClick={setLink} className="px-2 py-1 rounded text-sm bg-white">
          Link
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
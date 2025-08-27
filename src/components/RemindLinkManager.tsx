'use client'

import { useState, useEffect } from 'react'

interface Book {
  id: number
  title: string
  author: string
  genre: string
}

interface RemindLink {
  id: number
  from: Book
  to: Book
}

interface RemindLinkManagerProps {
  bookId: number
  currentLinks: RemindLink[]
}

export default function RemindLinkManager({ bookId, currentLinks }: RemindLinkManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBookId, setSelectedBookId] = useState<number | ''>('')
  const [links, setLinks] = useState<RemindLink[]>(currentLinks)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      const data = await response.json()
      setBooks(data.filter((book: Book) => book.id !== bookId))
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const addRemindLink = async () => {
    if (!selectedBookId) return

    try {
      const response = await fetch('/api/remind-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromId: bookId,
          toId: selectedBookId,
        }),
      })

      if (response.ok) {
        const newLink = await response.json()
        setLinks([...links, newLink])
        setSelectedBookId('')
      }
    } catch (error) {
      console.error('Error adding remind link:', error)
    }
  }

  const removeLink = async (linkId: number) => {
    try {
      const response = await fetch(`/api/remind-links/${linkId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setLinks(links.filter(link => link.id !== linkId))
      }
    } catch (error) {
      console.error('Error removing remind link:', error)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-indigo-600 hover:text-indigo-900 text-sm"
      >
        Manage Remind Links ({links.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Remind Links</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add book that reminds you of this one:
                </label>
                <div className="flex space-x-2">
                  <select
                    value={selectedBookId}
                    onChange={(e) => setSelectedBookId(e.target.value ? parseInt(e.target.value) : '')}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a book...</option>
                    {books.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.title} by {book.author}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addRemindLink}
                    disabled={!selectedBookId}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-md text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Current Links:</h4>
                {links.length === 0 ? (
                  <p className="text-gray-500 text-sm">No remind links yet.</p>
                ) : (
                  links.map((link) => (
                    <div key={link.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium">{link.to.title}</p>
                        <p className="text-xs text-gray-500">by {link.to.author}</p>
                      </div>
                      <button
                        onClick={() => removeLink(link.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import { prisma } from '@/lib/prisma'
import Charts from '@/components/Charts'

export default async function Dashboard() {
  const books = await prisma.book.findMany()
  
  // Calculate statistics
  const totalBooks = books.length
  const readBooks = books.filter(book => book.status === 'READ').length
  const tbrBooks = books.filter(book => book.status === 'TBR').length
  const dnfBooks = books.filter(book => book.status === 'DNF').length
  const audiobooks = books.filter(book => book.format === 'AUDIOBOOK' && book.status === 'READ').length
  
  // Genre breakdown
  const genreStats = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const genreData = Object.entries(genreStats).map(([name, value]) => ({
    name,
    value
  }))
  
  // Format breakdown
  const formatStats = books.reduce((acc, book) => {
    acc[book.format] = (acc[book.format] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const formatData = Object.entries(formatStats).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <div className="space-y-6">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Reading Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-blue-600">Total Books</div>
              <div className="text-2xl font-bold text-blue-900">{totalBooks}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-green-600">Books Read</div>
              <div className="text-2xl font-bold text-green-900">{readBooks}</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-yellow-600">TBR Books</div>
              <div className="text-2xl font-bold text-yellow-900">{tbrBooks}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-purple-600">Audiobooks</div>
              <div className="text-2xl font-bold text-purple-900">{audiobooks}</div>
            </div>
          </div>
        </div>
      </div>

      <Charts genreData={genreData} formatData={formatData} />

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Books</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.slice(0, 10).map((book) => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.format}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        book.status === 'READ' ? 'bg-green-100 text-green-800' :
                        book.status === 'TBR' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

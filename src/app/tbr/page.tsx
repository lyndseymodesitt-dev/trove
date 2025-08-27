import { prisma } from '@/lib/prisma'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import AddBookForm from '@/components/AddBookForm'

export default async function TBRPage() {
  const tbrBooks = await prisma.book.findMany({
    where: { status: 'TBR' },
    orderBy: { createdAt: 'desc' }
  })
  
  // Calculate TBR statistics
  const totalTBR = tbrBooks.length
  
  // Genre breakdown for TBR
  const genreStats = tbrBooks.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const genreData = Object.entries(genreStats).map(([name, value]) => ({
    name,
    value
  }))
  
  // Author breakdown for TBR
  const authorStats = tbrBooks.reduce((acc, book) => {
    acc[book.author] = (acc[book.author] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const authorData = Object.entries(authorStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([name, value]) => ({
      name,
      value
    }))
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">To-Be-Read Books</h1>
        <AddBookForm />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">TBR Overview</h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-yellow-600">Total TBR Books</div>
                <div className="text-2xl font-bold text-yellow-900">{totalTBR}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-600">Unique Authors</div>
                <div className="text-2xl font-bold text-blue-900">{Object.keys(authorStats).length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">TBR by Genre</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Authors in TBR</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={authorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">TBR Book List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tbrBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.format}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.pages || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Remove</button>
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

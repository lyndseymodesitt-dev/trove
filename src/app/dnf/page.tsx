import { prisma } from '@/lib/prisma'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default async function DNFPage() {
  const dnfBooks = await prisma.book.findMany({
    where: { status: 'DNF' },
    orderBy: { createdAt: 'desc' }
  })
  
  // Calculate DNF statistics
  const totalDNF = dnfBooks.length
  const avgPercentRead = dnfBooks.length > 0 
    ? dnfBooks.reduce((sum, book) => sum + (book.percentRead || 0), 0) / dnfBooks.length 
    : 0
  
  // Genre breakdown for DNF
  const genreStats = dnfBooks.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const genreData = Object.entries(genreStats).map(([name, value]) => ({
    name,
    value
  }))
  
  // Average percentage by genre
  const genrePercentages = dnfBooks.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = { total: 0, count: 0 }
    }
    acc[book.genre].total += book.percentRead || 0
    acc[book.genre].count += 1
    return acc
  }, {} as Record<string, { total: number, count: number }>)
  
  const genreAvgData = Object.entries(genrePercentages).map(([name, data]) => ({
    name,
    value: data.count > 0 ? data.total / data.count : 0
  }))
  
  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Did Not Finish (DNF) Books</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">DNF Overview</h3>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-red-600">Total DNF Books</div>
                <div className="text-2xl font-bold text-red-900">{totalDNF}</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-orange-600">Average % Completed</div>
                <div className="text-2xl font-bold text-orange-900">{avgPercentRead.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">DNF by Genre</h3>
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
                    fill="#FF6B6B"
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

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Avg % by Genre</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genreAvgData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Average %']} />
                  <Bar dataKey="value" fill="#FF6B6B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">DNF Book List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dnfBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.format}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${book.percentRead || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{book.percentRead?.toFixed(1) || 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Mark Read</button>
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

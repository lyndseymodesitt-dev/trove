import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(books)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, author, genre, format, status, pages, percentRead } = body

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        format,
        status,
        pages: pages ? parseInt(pages) : null,
        percentRead: percentRead ? parseFloat(percentRead) : null,
      },
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 })
  }
}

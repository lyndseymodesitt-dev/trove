import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        remindLinksFrom: {
          include: { to: true }
        },
        remindLinksTo: {
          include: { from: true }
        }
      }
    })

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, author, genre, format, status, pages, percentRead } = body

    const book = await prisma.book.update({
      where: { id: parseInt(params.id) },
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
    console.error('Error updating book:', error)
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.book.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 })
  }
}

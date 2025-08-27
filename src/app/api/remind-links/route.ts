import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromId, toId } = body

    // Check if both books exist
    const fromBook = await prisma.book.findUnique({ where: { id: fromId } })
    const toBook = await prisma.book.findUnique({ where: { id: toId } })

    if (!fromBook || !toBook) {
      return NextResponse.json({ error: 'One or both books not found' }, { status: 404 })
    }

    // Check if link already exists
    const existingLink = await prisma.remindLink.findFirst({
      where: {
        fromId: parseInt(fromId),
        toId: parseInt(toId)
      }
    })

    if (existingLink) {
      return NextResponse.json({ error: 'Remind link already exists' }, { status: 400 })
    }

    const remindLink = await prisma.remindLink.create({
      data: {
        fromId: parseInt(fromId),
        toId: parseInt(toId)
      },
      include: {
        from: true,
        to: true
      }
    })

    return NextResponse.json(remindLink)
  } catch (error) {
    console.error('Error creating remind link:', error)
    return NextResponse.json({ error: 'Failed to create remind link' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.remindLink.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Remind link deleted successfully' })
  } catch (error) {
    console.error('Error deleting remind link:', error)
    return NextResponse.json({ error: 'Failed to delete remind link' }, { status: 500 })
  }
}

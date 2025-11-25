import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tutorId = searchParams.get('tutorId')
    
    const messages = await db.message.findMany({
      where: tutorId ? { tutorId } : {},
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const message = await db.message.create({
      data: {
        tutorId: data.tutorId,
        subject: data.subject,
        content: data.content,
        type: data.type || 'support',
        status: data.status || 'open'
      }
    })
    
    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'pending-tutors') {
      const pendingTutors = await db.tutor.findMany({
        where: { isApproved: false },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(pendingTutors)
    }
    
    if (action === 'all-tutors') {
      const allTutors = await db.tutor.findMany({
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(allTutors)
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { action, tutorId } = data
    
    if (action === 'approve-tutor') {
      const tutor = await db.tutor.update({
        where: { id: tutorId },
        data: { isApproved: true }
      })
      return NextResponse.json(tutor)
    }
    
    if (action === 'reject-tutor') {
      const tutor = await db.tutor.update({
        where: { id: tutorId },
        data: { isApproved: false }
      })
      return NextResponse.json(tutor)
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process admin action' }, { status: 500 })
  }
}
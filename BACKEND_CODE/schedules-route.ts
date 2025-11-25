import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tutorId = searchParams.get('tutorId')
    
    const schedules = await db.schedule.findMany({
      where: tutorId ? { tutorId } : {},
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(schedules)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const schedule = await db.schedule.create({
      data: {
        tutorId: data.tutorId,
        studentName: data.studentName,
        subject: data.subject,
        level: data.level,
        day: data.day,
        time: data.time,
        status: data.status || 'scheduled'
      }
    })
    
    return NextResponse.json(schedule)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 })
  }
}
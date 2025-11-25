import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const tutors = await db.tutor.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(tutors)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tutors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const tutor = await db.tutor.create({
      data: {
        userId: data.userId,
        email: data.email,
        fullName: data.fullName,
        profilePhoto: data.profilePhoto || null,
        contactEmail: data.contactEmail,
        phoneNumber: data.phoneNumber || null,
        state: data.state,
        bio: data.bio || null,
        education: data.education || null,
        certifications: data.certifications || null,
        experience: data.experience ? parseInt(data.experience) : null,
        workplace: data.workplace || null,
        isApproved: false
      }
    })
    return NextResponse.json(tutor)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tutor' }, { status: 500 })
  }
}
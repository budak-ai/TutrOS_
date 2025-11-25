import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tutorId = searchParams.get('tutorId')
    
    const invoices = await db.invoice.findMany({
      where: tutorId ? { tutorId } : {},
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}`
    
    const invoice = await db.invoice.create({
      data: {
        tutorId: data.tutorId,
        invoiceNumber,
        studentName: data.studentName,
        subject: data.subject,
        amount: parseFloat(data.amount),
        dueDate: new Date(data.dueDate),
        status: data.status || 'pending'
      }
    })
    
    return NextResponse.json(invoice)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 })
  }
}
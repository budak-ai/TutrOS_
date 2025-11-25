import { Invoice } from '@prisma/client'

export interface InvoiceData extends Invoice {
  tutor: {
    fullName: string
    contactEmail: string
    phoneNumber?: string
    state: string
  }
}

export function generateInvoicePDF(invoiceData: InvoiceData): string {
  // This is a simple PDF generation function
  // In a real application, you would use a library like jsPDF or puppeteer
  // For now, we'll return a base64 encoded string representation
  
  const invoiceContent = `
    INVOICE
    
    Invoice Number: ${invoiceData.invoiceNumber}
    Date: ${new Date().toLocaleDateString()}
    Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString()}
    
    BILL TO:
    ${invoiceData.studentName}
    
    SERVICE:
    ${invoiceData.subject}
    
    AMOUNT: RM ${invoiceData.amount}
    
    STATUS: ${invoiceData.status}
    
    TUTOR:
    ${invoiceData.tutor.fullName}
    ${invoiceData.tutor.contactEmail}
    ${invoiceData.tutor.phoneNumber || ''}
    ${invoiceData.tutor.state}
  `
  
  // Convert to base64 (in real app, use proper PDF library)
  const base64 = Buffer.from(invoiceContent).toString('base64')
  
  return base64
}

export function downloadPDF(base64Data: string, filename: string) {
  // Create download link for PDF
  const link = document.createElement('a')
  link.href = `data:application/pdf;base64,${base64Data}`
  link.download = filename
  link.click()
}
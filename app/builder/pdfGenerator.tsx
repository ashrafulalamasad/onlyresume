import { pdf } from '@react-pdf/renderer'
import PDFResume from './pdf/PDFResume'
import type { ResumeData } from './types'

export async function generateResumePdf(data: ResumeData): Promise<Blob> {
  try {
    const pdfDocument = <PDFResume data={data} />
    const pdfBlob = await pdf(pdfDocument).toBlob()
    return pdfBlob
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('PDF Generation Error:', errorMessage)
    throw error
  }
}

export function downloadPdf(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 100)
}

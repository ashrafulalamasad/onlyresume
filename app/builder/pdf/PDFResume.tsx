import './pdfFonts'
import { Document, Page, View } from '@react-pdf/renderer'
import type { ResumeData } from '../types'
import { styles } from './pdfStyles'
import { PDFMinimalTemplate } from './PDFMinimalTemplate'
import { PDFCorporateTemplate } from './PDFCorporateTemplate'
import { PDFModernTemplate } from './PDFModernTemplate'

interface PDFResumeProps {
  data: ResumeData
}

export default function PDFResume({ data }: PDFResumeProps) {
  const selectTemplate = (template: string) => {
    switch (template) {
      case 'corporate':
        return PDFCorporateTemplate
      case 'modern':
        return PDFModernTemplate
      default:
        return PDFMinimalTemplate
    }
  }

  const Template = selectTemplate(data.template)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Template data={data} />
        </View>
      </Page>
    </Document>
  )
}

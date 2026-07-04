import "./pdfFonts";
import { Document, Page, View } from "@react-pdf/renderer";
import type { ResumeData, TemplateId } from "../types";
import { styles } from "./pdfStyles";
import { PDFMinimalTemplate } from "./PDFMinimalTemplate";
import { PDFCorporateTemplate } from "./PDFCorporateTemplate";
import { PDFModernTemplate } from "./PDFModernTemplate";
import { PDFElegantTemplate } from "./PDFElegantTemplate";
import { PDFExecutiveTemplate } from "./PDFExecutiveTemplate";
import { PDFTechnicalTemplate } from "./PDFTechnicalTemplate";
import { PDFAcademicTemplate } from "./PDFAcademicTemplate";
import { PDFTimelineTemplate } from "./PDFTimelineTemplate";
import { PDFCreativeTemplate } from "./PDFCreativeTemplate";
import { PDFAtsTemplate } from "./PDFAtsTemplate";
import { PDFCompactTemplate } from "./PDFCompactTemplate";
import { PDFBoldTemplate } from "./PDFBoldTemplate";
import { PDFEmeraldTemplate } from "./PDFEmeraldTemplate";
import { PDFSlateTemplate } from "./PDFSlateTemplate";
import { PDFGeometricTemplate } from "./PDFGeometricTemplate";
import { PDFSplitTemplate } from "./PDFSplitTemplate";
import { PDFGridTemplate } from "./PDFGridTemplate";
import { PDFSidebarRightTemplate } from "./PDFSidebarRightTemplate";
import { PDFWarmTemplate } from "./PDFWarmTemplate";
import { PDFTwoColumnTemplate } from "./PDFTwoColumnTemplate";

interface PDFResumeProps {
  data: ResumeData;
}

/** Complete dispatch map — every TemplateId has a dedicated renderer. */
const PDF_TEMPLATES = {
  minimal: PDFMinimalTemplate,
  corporate: PDFCorporateTemplate,
  modern: PDFModernTemplate,
  elegant: PDFElegantTemplate,
  executive: PDFExecutiveTemplate,
  technical: PDFTechnicalTemplate,
  academic: PDFAcademicTemplate,
  timeline: PDFTimelineTemplate,
  creative: PDFCreativeTemplate,
  ats: PDFAtsTemplate,
  compact: PDFCompactTemplate,
  bold: PDFBoldTemplate,
  emerald: PDFEmeraldTemplate,
  slate: PDFSlateTemplate,
  geometric: PDFGeometricTemplate,
  split: PDFSplitTemplate,
  grid: PDFGridTemplate,
  "sidebar-right": PDFSidebarRightTemplate,
  warm: PDFWarmTemplate,
  "two-column": PDFTwoColumnTemplate,
} as const satisfies Record<TemplateId, React.FC<{ data: ResumeData }>>;

export default function PDFResume({ data }: PDFResumeProps) {
  const Template = PDF_TEMPLATES[data.template];

  if (!Template) {
    throw new Error(`PDF template not implemented: ${data.template}`);
  }

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.container} wrap>
          <Template data={data} />
        </View>
      </Page>
    </Document>
  );
}
import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Minimalist ATS — ultra-plain single column, no color, no rules, gray uppercase headings.
 */
export function PDFAtsTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const head = "#475569";
  const ink = "#1F2937";
  const text = "#374151";

  const Heading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2,
        color: head,
        marginTop: SPACING.md,
        marginBottom: SPACING.xs,
      }}
    >
      {children}
    </Text>
  );

  return (
    <View style={styles.column} wrap>
      {/* Header */}
      <Text style={{ fontSize: 18, fontWeight: 700, color: ink }}>
        {personal.fullName || "Your Name"}
      </Text>
      {personal.professionTitle && (
        <Text style={{ fontSize: 10, color: text, marginTop: 2 }}>
          {personal.professionTitle}
        </Text>
      )}
      <PdfContactRow
        items={[
          ...(personal.email
            ? [{ key: "email" as const, value: personal.email, href: `mailto:${personal.email}` }]
            : []),
          ...(personal.phone
            ? [{ key: "phone" as const, value: personal.phone, href: `tel:${personal.phone}` }]
            : []),
          ...(personal.location
            ? [{ key: "location" as const, value: personal.location, href: "" }]
            : []),
          ...(personal.linkedinUrl
            ? [{ key: "linkedin" as const, value: personal.linkedinUrl, href: personal.linkedinUrl.startsWith("http") ? personal.linkedinUrl : `https://${personal.linkedinUrl}` }]
            : []),
          ...(personal.githubUrl
            ? [{ key: "github" as const, value: personal.githubUrl, href: personal.githubUrl.startsWith("http") ? personal.githubUrl : `https://${personal.githubUrl}` }]
            : []),
          ...(personal.portfolioUrl
            ? [{ key: "portfolio" as const, value: personal.portfolioUrl, href: personal.portfolioUrl.startsWith("http") ? personal.portfolioUrl : `https://${personal.portfolioUrl}` }]
            : []),
        ]}
        color={text}
        sepColor={text}
        fontSize={9}
      />

      {personal.summary && (
        <View wrap>
          <Heading>Summary</Heading>
          <Text style={{ fontSize: 9.5, color: text, lineHeight: 1.45 }}>
            {normalizeText(personal.summary)}
          </Text>
        </View>
      )}

      {experience.length > 0 && (
        <View wrap>
          <Heading>Experience</Heading>
          {experience.map((exp) => (
            <View key={exp.id} style={{ marginTop: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text style={{ fontSize: 10, fontWeight: 700, color: ink }}>
                    {exp.title || "Job Title"}
                  </Text>
                  <Text style={{ fontSize: 9.5, color: text }}>
                    {exp.company || "Company"}
                    {joinLocation(exp.city, exp.state) ? `, ${joinLocation(exp.city, exp.state)}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 9.5, color: text }}>
                  {dateRange(exp.startDate, exp.endDate)}
                </Text>
              </View>
              {exp.description && (
                <Text style={{ fontSize: 9.5, color: text, marginTop: 2, lineHeight: 1.45 }}>
                  {normalizeText(exp.description)}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {education.length > 0 && (
        <View wrap>
          <Heading>Education</Heading>
          {education.map((edu) => (
            <View key={edu.id} style={{ marginTop: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text style={{ fontSize: 10, fontWeight: 700, color: ink }}>
                    {edu.degree || "Degree"}
                  </Text>
                  <Text style={{ fontSize: 9.5, color: text }}>
                    {edu.school || "School"}
                    {edu.location ? `, ${edu.location}` : ""}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 9.5, color: text }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {skillCategories.length > 0 && (
        <View wrap>
          <Heading>Skills</Heading>
          <View style={{ marginTop: SPACING.xs }}>
            {skillCategories.map((cat) => (
              <Text key={cat.id} style={{ fontSize: 9.5, color: text, marginBottom: 2 }}>
                <Text style={{ fontWeight: 700, color: ink }}>{cat.category}: </Text>
                {cat.skills.join(", ")}
              </Text>
            ))}
          </View>
        </View>
      )}

      {projects.length > 0 && (
        <View wrap>
          <Heading>Projects</Heading>
          {projects.map((proj) => (
            <View key={proj.id} style={{ marginTop: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: ink }}>
                  {proj.title || "Project Title"}
                </Text>
                {proj.liveLink && <Text style={{ fontSize: 9.5, color: text }}>{proj.liveLink}</Text>}
              </View>
              {proj.techStack && <Text style={{ fontSize: 9.5, color: text }}>{proj.techStack}</Text>}
              {proj.description && (
                <Text style={{ fontSize: 9.5, color: text, marginTop: 2, lineHeight: 1.45 }}>
                  {normalizeText(proj.description)}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {languages.length > 0 && (
        <View wrap>
          <Heading>Languages</Heading>
          <Text style={{ fontSize: 9.5, color: text, marginTop: SPACING.xs }}>
            {languages.map((l, i) => (
              <Text key={l.id}>
                {i > 0 && <Text>, </Text>}
                {l.language || "Language"} ({l.proficiency})
              </Text>
            ))}
          </Text>
        </View>
      )}

      {certifications.length > 0 && (
        <View wrap>
          <Heading>Certifications</Heading>
          {certifications.map((c) => (
            <View key={c.id} style={{ flexDirection: "row", justifyContent: "space-between", marginTop: SPACING.xs }}>
              <Text style={{ fontSize: 9.5, color: text }}>
                <Text style={{ fontWeight: 700, color: ink }}>{c.name || "Certification"}</Text>
                {c.issuer && <Text>, {c.issuer}</Text>}
              </Text>
              {c.date && <Text style={{ fontSize: 9.5, color: text }}>{c.date}</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
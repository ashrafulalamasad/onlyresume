import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Compact — dense single column, inline name|contact header, tight leading.
 */
export function PDFCompactTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const ink = "#0F172A";
  const accent = "#2563EB";
  const head = ink;

  const Heading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 8.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2,
        color: head,
        borderBottom: "0.5pt solid #E2E8F0",
        paddingBottom: 2,
        marginTop: SPACING.sm,
        marginBottom: SPACING.xs,
      }}
    >
      {children}
    </Text>
  );

  return (
    <View style={styles.column} wrap>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: SPACING.sm }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 700, color: ink }}>
            {personal.fullName || "Your Name"}
          </Text>
          {personal.professionTitle && (
            <Text style={{ fontSize: 9.5, fontWeight: 600, color: accent, marginTop: 1 }}>
              {personal.professionTitle}
            </Text>
          )}
        </View>
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
          color="#475569"
          sepColor="#475569"
          fontSize={7.5}
        />
      </View>

      {personal.summary && (
        <View wrap>
          <Heading>Summary</Heading>
          <Text style={{ fontSize: 9, color: "#374151", lineHeight: 1.35 }}>
            {normalizeText(personal.summary)}
          </Text>
        </View>
      )}

      {experience.length > 0 && (
        <View wrap>
          <Heading>Experience</Heading>
          {experience.map((exp) => (
            <View key={exp.id} style={{ marginTop: 3 }} wrap>
              <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <Text style={{ fontSize: 9.5, fontWeight: 700, color: ink }}>
                  {exp.title || "Job Title"}
                  <Text style={{ fontWeight: 400, color: "#64748B" }}> · {exp.company || "Company"}{joinLocation(exp.city, exp.state) ? `, ${joinLocation(exp.city, exp.state)}` : ""}</Text>
                </Text>
                <Text style={{ fontSize: 7.5, color: "#94A3B8" }}>
                  {dateRange(exp.startDate, exp.endDate)}
                </Text>
              </View>
              {exp.description && (
                <Text style={{ fontSize: 9, color: "#374151", marginTop: 1, lineHeight: 1.35 }}>
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
            <View key={edu.id} style={{ marginTop: 3 }} wrap>
              <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <Text style={{ fontSize: 9.5, fontWeight: 700, color: ink }}>
                  {edu.degree || "Degree"}
                  <Text style={{ fontWeight: 400, color: "#64748B" }}> · {edu.school || "School"}{edu.location ? `, ${edu.location}` : ""}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</Text>
                </Text>
                <Text style={{ fontSize: 7.5, color: "#94A3B8" }}>
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
          <View style={{ marginTop: 2 }}>
            {skillCategories.map((cat) => (
              <Text key={cat.id} style={{ fontSize: 9, color: "#374151", marginBottom: 1 }}>
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
            <View key={proj.id} style={{ marginTop: 3 }} wrap>
              <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <Text style={{ fontSize: 9.5, fontWeight: 700, color: ink }}>
                  {proj.title || "Project Title"}
                  {proj.techStack && <Text style={{ fontWeight: 400, color: "#64748B" }}> · {proj.techStack}</Text>}
                </Text>
                {proj.liveLink && <Text style={{ fontSize: 8, color: accent }}>{proj.liveLink}</Text>}
              </View>
              {proj.description && (
                <Text style={{ fontSize: 9, color: "#374151", marginTop: 1, lineHeight: 1.35 }}>
                  {normalizeText(proj.description)}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
        <View wrap>
          <Heading>Additional</Heading>
          {languages.length > 0 && (
            <Text style={{ fontSize: 9, color: "#374151", marginTop: 2 }}>
              <Text style={{ fontWeight: 700, color: ink }}>Languages: </Text>
              {languages.map((l, i) => (
                <Text key={l.id}>
                  {i > 0 && <Text>, </Text>}
                  {l.language || "Language"} ({l.proficiency})
                </Text>
              ))}
            </Text>
          )}
          {certifications.length > 0 && (
            <View style={{ marginTop: 2 }}>
              {certifications.map((c) => (
                <Text key={c.id} style={{ fontSize: 9, color: "#374151", marginBottom: 1 }}>
                  <Text style={{ fontWeight: 700, color: ink }}>{c.name || "Certification"}</Text>
                  {c.issuer && <Text>, {c.issuer}</Text>}
                  {c.date && <Text style={{ color: "#94A3B8" }}> · {c.date}</Text>}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
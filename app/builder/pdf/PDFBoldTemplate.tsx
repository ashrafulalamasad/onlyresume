import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Bold — oversized name, thick deep-blue full-width rules, all-caps section titles.
 */
export function PDFBoldTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const ink = "#0B1220";
  const accent = "#1D4ED8";
  const text = "#374151";

  const Heading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 10,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 3,
        color: ink,
        borderBottom: `3pt solid ${accent}`,
        paddingBottom: 3,
        marginTop: SPACING.md,
        marginBottom: 6,
      }}
    >
      {children}
    </Text>
  );

  return (
    <View style={styles.column} wrap>
      {/* Header */}
      <Text style={{ fontSize: 30, fontWeight: 800, color: ink, lineHeight: 1.1 }}>
        {personal.fullName || "YOUR NAME"}
      </Text>
      <View style={{ borderTop: `6pt solid ${accent}`, marginVertical: SPACING.sm }} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-end", gap: 8, marginBottom: SPACING.xs }}>
        {personal.professionTitle && (
          <Text style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: accent }}>
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
          color={ink}
          sepColor={ink}
          fontSize={9}
        />
      </View>

      {personal.summary && (
        <View wrap>
          <Heading>Profile</Heading>
          <Text style={{ fontSize: 10, fontWeight: 600, color: text, lineHeight: 1.45 }}>
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
                  <Text style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: ink }}>
                    {exp.title || "Job Title"}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 700, color: accent }}>
                    {exp.company || "Company"}
                    {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: ink }}>
                  {dateRange(exp.startDate, exp.endDate)}
                </Text>
              </View>
              {exp.description && (
                <Text style={{ fontSize: 10, fontWeight: 600, color: text, marginTop: 2, lineHeight: 1.45 }}>
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
            <View key={edu.id} style={{ marginTop: 4 }} wrap>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: ink }}>
                    {edu.degree || "Degree"}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 700, color: accent }}>
                    {edu.school || "School"}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: ink }}>
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
              <Text key={cat.id} style={{ fontSize: 10, color: text, marginBottom: 2 }}>
                <Text style={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: ink }}>{cat.category}</Text>
                <Text style={{ color: accent, marginHorizontal: 4 }}>|</Text>
                {cat.skills.join(" · ")}
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
                <Text style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: ink }}>
                  {proj.title || "Project Title"}
                </Text>
                {proj.liveLink && <Text style={{ fontSize: 9.5, fontWeight: 700, color: accent }}>{proj.liveLink}</Text>}
              </View>
              {proj.techStack && <Text style={{ fontSize: 9, fontWeight: 700, color: "#64748B" }}>{proj.techStack}</Text>}
              {proj.description && (
                <Text style={{ fontSize: 10, fontWeight: 600, color: text, marginTop: 2, lineHeight: 1.45 }}>
                  {normalizeText(proj.description)}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
        <View wrap>
          <Heading>Credentials</Heading>
          {languages.length > 0 && (
            <Text style={{ fontSize: 10, color: text, marginTop: SPACING.xs }}>
              <Text style={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: ink }}>Languages</Text>
              <Text style={{ color: accent, marginHorizontal: 4 }}>|</Text>
              {languages.map((l, i) => (
                <Text key={l.id}>
                  {i > 0 && <Text> · </Text>}
                  {l.language || "Language"} ({l.proficiency})
                </Text>
              ))}
            </Text>
          )}
          {certifications.length > 0 && (
            <View style={{ marginTop: 4 }}>
              {certifications.map((c) => (
                <View key={c.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                  <Text style={{ fontSize: 10, color: text }}>
                    <Text style={{ fontWeight: 800, color: ink }}>{c.name || "Certification"}</Text>
                    {c.issuer && <Text style={{ fontWeight: 700, color: accent }}> — {c.issuer}</Text>}
                  </Text>
                  {c.date && <Text style={{ fontSize: 9, fontWeight: 700, color: ink }}>{c.date}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
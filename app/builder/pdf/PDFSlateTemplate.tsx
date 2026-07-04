import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Slate — light slate band header with left border accent, cool slate-blue accents.
 */
export function PDFSlateTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const band = "#F1F5F9";
  const accent = "#334155";
  const ink = "#0F172A";
  const sub = "#64748B";
  const border = "#CBD5E1";

  const Heading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2.5,
        color: accent,
        borderBottom: `1.5pt solid ${border}`,
        paddingBottom: 3,
        marginTop: SPACING.md,
        marginBottom: SPACING.xs,
      }}
    >
      {children}
    </Text>
  );

  return (
    <View style={styles.column} wrap>
      {/* Header band */}
      <View
        style={{
          backgroundColor: band,
          borderLeftWidth: 4,
          borderLeftColor: accent,
          paddingVertical: 16,
          paddingHorizontal: 20,
          marginBottom: SPACING.md,
        }}
      >
        <Text style={{ fontSize: 21, fontWeight: 700, color: ink }}>
          {personal.fullName || "Your Name"}
        </Text>
        {personal.professionTitle && (
          <Text style={{ fontSize: 11, fontWeight: 600, color: accent, marginTop: 2 }}>
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
          color="#475569"
          sepColor="#475569"
          fontSize={9}
        />
      </View>

      {personal.summary && (
        <View wrap>
          <Heading>Summary</Heading>
          <Text style={{ fontSize: 9.5, color: "#374151", lineHeight: 1.45 }}>
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
                  <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                    {exp.title || "Job Title"}
                  </Text>
                  <Text style={{ fontSize: 9.5, color: sub }}>
                    {exp.company || "Company"}
                    {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 8.5, color: "#94A3B8" }}>
                  {dateRange(exp.startDate, exp.endDate)}
                </Text>
              </View>
              {exp.description && (
                <Text style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>
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
                  <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                    {edu.degree || "Degree"}
                  </Text>
                  <Text style={{ fontSize: 9.5, color: sub }}>
                    {edu.school || "School"}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 8.5, color: "#94A3B8" }}>
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
          <View style={{ marginTop: SPACING.xs, flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {skillCategories.map((cat) => (
              <Text key={cat.id} style={{ fontSize: 9.5, color: "#374151" }}>
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
                <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                  {proj.title || "Project Title"}
                </Text>
                {proj.liveLink && <Text style={{ fontSize: 9.5, color: "#1D4ED8" }}>{proj.liveLink}</Text>}
              </View>
              {proj.techStack && <Text style={{ fontSize: 9.5, color: sub }}>{proj.techStack}</Text>}
              {proj.description && (
                <Text style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>
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
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: SPACING.sm }}>
              {languages.map((l) => (
                <Text
                  key={l.id}
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: "#334155",
                    backgroundColor: "#E2E8F0",
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 3,
                  }}
                >
                  {l.language || "Language"} · {l.proficiency}
                </Text>
              ))}
            </View>
          )}
          {certifications.length > 0 && (
            <View style={{ marginTop: SPACING.sm }}>
              {certifications.map((c) => (
                <View key={c.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text style={{ fontSize: 9.5, color: "#374151" }}>
                    <Text style={{ fontWeight: 700, color: ink }}>{c.name || "Certification"}</Text>
                    {c.issuer && <Text style={{ color: sub }}> — {c.issuer}</Text>}
                  </Text>
                  {c.date && <Text style={{ fontSize: 9, color: "#94A3B8" }}>{c.date}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
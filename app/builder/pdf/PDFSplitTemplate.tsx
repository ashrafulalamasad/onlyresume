import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Split Header — name left, contact stack right, divided by vertical accent line.
 */
export function PDFSplitTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const accent = "#0369A1";
  const ink = "#0F172A";
  const sub = "#475569";

  const Heading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2.5,
        color: accent,
        borderBottom: `1pt solid #BAE6FD`,
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
      {/* Split header */}
      <View style={{ flexDirection: "row", alignItems: "stretch", gap: 12, marginBottom: SPACING.sm }}>
        <View style={{ flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 23, fontWeight: 700, color: ink }}>
            {personal.fullName || "Your Name"}
          </Text>
          {personal.professionTitle && (
            <Text style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: accent, marginTop: 2 }}>
              {personal.professionTitle}
            </Text>
          )}
        </View>
        <View style={{ width: 1, backgroundColor: accent }} />
        <View style={{ flexDirection: "column", justifyContent: "center", flex: 1 }}>
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
            sepColor={accent}
            fontSize={8.5}
          />
        </View>
      </View>

      <View style={{ borderTop: `1.5pt solid ${accent}`, marginTop: SPACING.sm, marginBottom: SPACING.sm }} />

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
                  <Text style={{ fontSize: 9.5, color: accent }}>
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
                  <Text style={{ fontSize: 9.5, color: accent }}>
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
          <View style={{ marginTop: SPACING.xs }}>
            {skillCategories.map((cat) => (
              <Text key={cat.id} style={{ fontSize: 9.5, color: "#374151", marginBottom: 2 }}>
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
                {proj.liveLink && <Text style={{ fontSize: 9.5, color: accent }}>{proj.liveLink}</Text>}
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
                    color: accent,
                    backgroundColor: "#0369A110",
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
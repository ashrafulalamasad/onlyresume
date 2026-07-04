import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Elegant — serif Counterpart, with Helvetica fallback; centered name,
 * burgundy hairline rules, double-rule under the header.
 */
export function PDFElegantTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const ink = "#1F2937";
  const accent = "#7C2D12";
  const subtle = "#7C2D1240";

  const SectionHeading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 9,
fontFamily: "Times-Roman",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 4,
          color: accent,
          textAlign: "center",
          marginTop: SPACING.md,
          marginBottom: 4,
      }}
    >
      {children}
    </Text>
  );

  const SectionRule = () => (
    <View
      style={{ borderTop: `0.5pt solid ${subtle}`, marginBottom: SPACING.sm }}
    />
  );

  return (
    <View style={styles.column} wrap>
      {/* Header */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Times-Roman",
            fontWeight: 700,
            color: ink,
            textAlign: "center",
          }}
        >
          {personal.fullName || "Your Name"}
        </Text>
        {personal.professionTitle && (
          <Text
            style={{
              fontSize: 10,
              fontFamily: "Times-Roman",
              fontStyle: "italic",
              color: accent,
              marginTop: 2,
              textAlign: "center",
            }}
          >
            {personal.professionTitle}
          </Text>
        )}
      </View>

      {/* Double rule under header */}
      <View
        style={{
          borderTop: `2pt double ${accent}`,
          marginTop: SPACING.sm,
          marginBottom: SPACING.sm,
        }}
      />

      {/* Contact strip */}
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
        fontSize={9}
      />

      {/* Summary */}
      {personal.summary && (
        <View wrap>
          <SectionHeading>Summary</SectionHeading>
          <Text
            style={{
              fontSize: 9.5,
              color: "#374151",
              textAlign: "justify",
              lineHeight: 1.45,
            }}
          >
            {normalizeText(personal.summary)}
          </Text>
        </View>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <View wrap>
          <SectionHeading>Experience</SectionHeading>
          <SectionRule />
          {experience.map((exp) => (
            <View key={exp.id} style={{ marginTop: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text
                    style={{
                      fontFamily: "Times-Roman",
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: ink,
                    }}
                  >
                    {exp.title || "Job Title"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Times-Roman",
                      fontStyle: "italic",
                      fontSize: 9.5,
                      color: accent,
                    }}
                  >
                    {exp.company || "Company"}
                    {joinLocation(exp.city, exp.state)
                      ? ` · ${joinLocation(exp.city, exp.state)}`
                      : ""}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 8.5,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {dateRange(exp.startDate, exp.endDate)}
                </Text>
              </View>
              {exp.description && (
                <Text
                  style={{
                    fontSize: 9.5,
                    color: "#374151",
                    marginTop: 2,
                    lineHeight: 1.45,
                  }}
                >
                  {normalizeText(exp.description)}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View wrap>
          <SectionHeading>Education</SectionHeading>
          <SectionRule />
          {education.map((edu) => (
            <View key={edu.id} style={{ marginTop: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text
                    style={{
                      fontFamily: "Times-Roman",
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: ink,
                    }}
                  >
                    {edu.degree || "Degree"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Times-Roman",
                      fontStyle: "italic",
                      fontSize: 9.5,
                      color: accent,
                    }}
                  >
                    {edu.school || "School"}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 8.5, color: "#6B7280" }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <View wrap>
          <SectionHeading>Skills</SectionHeading>
          <SectionRule />
          <View style={{ marginTop: SPACING.sm }}>
            {skillCategories.map((cat) => (
              <Text
                key={cat.id}
                style={{ fontSize: 9.5, color: "#374151", marginBottom: 2 }}
              >
                <Text style={{ fontFamily: "Times-Roman", fontWeight: 700, color: ink }}>
                  {cat.category}:{" "}
                </Text>
                {cat.skills.join(", ")}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View wrap>
          <SectionHeading>Projects</SectionHeading>
          <SectionRule />
          {projects.map((proj) => (
            <View key={proj.id} style={{ marginTop: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <Text
                  style={{
fontFamily: "Times-Roman",
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: ink,
                  }}
                >
                  {proj.title || "Project Title"}
                </Text>
                {proj.liveLink && (
                  <Text style={{ fontSize: 9, color: accent }}>{proj.liveLink}</Text>
                )}
              </View>
              {proj.techStack && (
                <Text
                  style={{
fontFamily: "Times-Roman",
                      fontStyle: "italic",
                      fontSize: 9.5,
                      color: accent,
                  }}
                >
                  {proj.techStack}
                </Text>
              )}
              {proj.description && (
                <Text
                  style={{
                    fontSize: 9.5,
                    color: "#374151",
                    marginTop: 2,
                    lineHeight: 1.45,
                  }}
                >
                  {normalizeText(proj.description)}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Credentials */}
      {(languages.length > 0 || certifications.length > 0) && (
        <View wrap>
          <SectionHeading>Credentials</SectionHeading>
          <SectionRule />
          {languages.length > 0 && (
            <Text style={{ fontSize: 9.5, color: "#374151", marginTop: SPACING.xs }}>
              <Text style={{ fontFamily: "Times-Roman", fontWeight: 700, color: ink }}>
                Languages:{" "}
              </Text>
              {languages.map((l, i) => (
                <Text key={l.id}>
                  {i > 0 && <Text style={{ color: accent }}> · </Text>}
                  {l.language || "Language"} ({l.proficiency})
                </Text>
              ))}
            </Text>
          )}
          {certifications.length > 0 && (
            <View style={{ marginTop: SPACING.xs }}>
              {certifications.map((c) => (
                <Text
                  key={c.id}
                  style={{ fontSize: 9.5, color: "#374151", marginBottom: 2 }}
                >
                  <Text style={{ fontFamily: "Times-Roman", fontWeight: 700, color: ink }}>
                    {c.name || "Certification"}
                  </Text>
                  {c.issuer && <Text style={{ color: "#6B7280" }}> — {c.issuer}</Text>}
                  {c.date && <Text style={{ color: "#6B7280" }}> · {c.date}</Text>}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

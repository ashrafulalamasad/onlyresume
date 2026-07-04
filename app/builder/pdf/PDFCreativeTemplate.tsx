import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Creative — asymmetric header with accent squares, coral palette, coral left borders on sections.
 */
export function PDFCreativeTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const accent = "#E11D48";
  const ink = "#0F172A";
  const sub = "#475569";
  const lightAccent = "#FECDD3";

  const Heading = ({ children }: { children: string }) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: SPACING.md, marginBottom: SPACING.xs }}>
      <View style={{ width: 8, height: 8, backgroundColor: accent }} />
      <Text style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: ink }}>
        {children}
      </Text>
    </View>
  );

  return (
    <View style={styles.column} wrap>
      {/* Header with accent squares */}
      <View style={styles.rowBetween} wrap>
        <View>
          <View style={{ flexDirection: "row", gap: 4, marginBottom: 2 }}>
            <View style={{ width: 10, height: 10, backgroundColor: accent }} />
            <View style={{ width: 10, height: 10, backgroundColor: "#FB7185" }} />
            <View style={{ width: 10, height: 10, backgroundColor: "#FECDD3" }} />
          </View>
          <Text style={{ fontSize: 25, fontWeight: 800, color: ink }}>
            {personal.fullName || "Your Name"}
          </Text>
          {personal.professionTitle && (
            <Text style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: accent, marginTop: 4 }}>
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
          color={ink}
          sepColor={accent}
          fontSize={8.5}
        />
      </View>

      <View style={{ height: 2, backgroundColor: `linear-gradient(90deg, ${accent} 0%, ${accent} 40%, #FECDD3 100%)`, marginTop: SPACING.sm, marginBottom: SPACING.sm }} />

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
            <View key={exp.id} style={{ marginTop: SPACING.sm, borderLeft: `2pt solid ${lightAccent}`, paddingLeft: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                    {exp.title || "Job Title"}
                  </Text>
                  <Text style={{ fontSize: 9.5, fontWeight: 700, color: accent }}>
                    {exp.company || "Company"}
                    {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#94A3B8" }}>
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
            <View key={edu.id} style={{ marginTop: SPACING.sm, borderLeft: `2pt solid ${lightAccent}`, paddingLeft: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                    {edu.degree || "Degree"}
                  </Text>
                  <Text style={{ fontSize: 9.5, fontWeight: 700, color: accent }}>
                    {edu.school || "School"}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                  </Text>
                </View>
                <Text style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#94A3B8" }}>
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
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: SPACING.xs }}>
            {skillCategories.flatMap((cat) =>
              cat.skills.map((s) => (
                <Text
                  key={cat.id + ":" + s}
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: accent,
                    backgroundColor: "#E11D4810",
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                  }}
                >
                  {s}
                </Text>
              ))
            )}
          </View>
          <Text style={{ fontSize: 8, color: "#94A3B8", marginTop: 2 }}>
            {skillCategories.map((c) => `${c.category}: ${c.skills.join(", ")}`).join(" · ")}
          </Text>
        </View>
      )}

      {projects.length > 0 && (
        <View wrap>
          <Heading>Projects</Heading>
          {projects.map((proj) => (
            <View key={proj.id} style={{ marginTop: SPACING.sm, borderLeft: `2pt solid ${lightAccent}`, paddingLeft: SPACING.sm }} wrap>
              <View style={styles.rowBetween}>
                <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                  {proj.title || "Project Title"}
                </Text>
                {proj.liveLink && <Text style={{ fontSize: 9.5, fontWeight: 700, color: accent }}>{proj.liveLink}</Text>}
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
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: SPACING.xs }}>
              {languages.map((l) => (
                <Text
                  key={l.id}
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: accent,
                    backgroundColor: "#E11D4810",
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 10,
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
                    <Text style={{ fontWeight: 800, color: ink }}>{c.name || "Certification"}</Text>
                    {c.issuer && <Text style={{ color: sub }}> · {c.issuer}</Text>}
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
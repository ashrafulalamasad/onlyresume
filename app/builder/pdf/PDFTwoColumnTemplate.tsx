import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Two Column — equal two-column light layout split by a thin rule; slate accent.
 */
export function PDFTwoColumnTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const accent = "#334155";
  const ink = "#0F172A";
  const sub = "#64748B";
  const border = "#CBD5E1";

  const Heading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2.5,
        color: accent,
        borderBottom: `1pt solid ${border}`,
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
      <View style={{ alignItems: "center", marginBottom: SPACING.sm }}>
        <Text style={{ fontSize: 20, fontWeight: 700, color: ink }}>
          {personal.fullName || "Your Name"}
        </Text>
        {personal.professionTitle && (
          <Text style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: accent, marginTop: 2 }}>
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
          sepColor="#CBD5E1"
          fontSize={8.5}
        />
        <View style={{ borderTop: `1.5pt solid ${accent}`, width: "100%", marginTop: SPACING.sm, marginBottom: SPACING.sm }} />
      </View>

      {personal.summary && (
        <View wrap>
          <Heading>Summary</Heading>
          <Text style={{ fontSize: 9.5, color: "#374151", lineHeight: 1.45 }}>
            {normalizeText(personal.summary)}
          </Text>
        </View>
      )}

      {/* Two column body */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
        {/* Left column */}
        <View style={{ flex: 1, minWidth: 200, borderRightWidth: 0.5, borderRightColor: border, paddingRight: 16 }}>
          {experience.length > 0 && (
            <View wrap>
              <Heading>Experience</Heading>
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginTop: 4 }} wrap>
                  <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 10, fontWeight: 700, color: ink }}>
                        {exp.title || "Job Title"}
                      </Text>
                      <Text style={{ fontSize: 8.5, color: sub }}>
                        {exp.company || "Company"}
                        {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ""}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 8, color: "#94A3B8" }}>
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
                <View key={edu.id} style={{ marginTop: 4 }} wrap>
                  <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 10, fontWeight: 700, color: ink }}>
                        {edu.degree || "Degree"}
                      </Text>
                      <Text style={{ fontSize: 8.5, color: sub }}>
                        {edu.school || "School"}
                        {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 8, color: "#94A3B8" }}>
                      {dateRange(edu.startDate, edu.endDate)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right column */}
        <View style={{ flex: 1, minWidth: 200, paddingLeft: 4 }}>
          {skillCategories.length > 0 && (
            <View wrap>
              <Heading>Skills</Heading>
              {skillCategories.map((cat) => (
                <Text key={cat.id} style={{ fontSize: 9, color: "#374151", marginBottom: 2 }}>
                  <Text style={{ fontWeight: 700, color: ink }}>{cat.category}: </Text>
                  {cat.skills.join(", ")}
                </Text>
              ))}
            </View>
          )}

          {projects.length > 0 && (
            <View wrap>
              <Heading>Projects</Heading>
              {projects.map((proj) => (
                <View key={proj.id} style={{ marginTop: 4 }} wrap>
                  <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <Text style={{ fontSize: 10, fontWeight: 700, color: ink }}>
                      {proj.title || "Project Title"}
                    </Text>
                    {proj.liveLink && <Text style={{ fontSize: 8, color: "#1D4ED8" }}>{proj.liveLink}</Text>}
                  </View>
                  {proj.techStack && <Text style={{ fontSize: 8, color: sub }}>{proj.techStack}</Text>}
                  {proj.description && (
                    <Text style={{ fontSize: 9, color: "#374151", marginTop: 1, lineHeight: 1.35 }}>
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
              <Text style={{ fontSize: 9, color: "#374151", marginTop: 2 }}>
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
                <View key={c.id} style={{ marginTop: 2 }}>
                  <Text style={{ fontSize: 9, color: "#374151" }}>
                    <Text style={{ fontWeight: 700, color: ink }}>{c.name || "Certification"}</Text>
                    {c.issuer && <Text style={{ color: sub }}> — {c.issuer}</Text>}
                    {c.date && <Text style={{ color: "#94A3B8" }}> · {c.date}</Text>}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Grid — each section in its own bordered card; neutral gray accents.
 */
export function PDFGridTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const accent = "#374151";
  const ink = "#111827";
  const border = "#E5E7EB";
  const sub = "#6B7280";

  const Card = ({ children, style }: { children: React.ReactNode; style?: any }) => (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: border,
        borderRadius: 4,
        padding: 10,
        marginBottom: SPACING.sm,
        ...style,
      }}
    >
      {children}
    </View>
  );

  const CardHeading = ({ children }: { children: string }) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 }}>
      <View style={{ width: 4, height: 10, backgroundColor: accent }} />
      <Text style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: ink }}>
        {children}
      </Text>
    </View>
  );

  return (
    <View style={styles.column} wrap>
      {/* Header card */}
      <Card>
        <View style={{ alignItems: "center" }}>
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
            color="#4B5563"
            sepColor="#CBD5E1"
            fontSize={8.5}
          />
        </View>
      </Card>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm }}>
        {personal.summary && (
          <Card style={{ flex: 1, minWidth: "100%" }}>
            <CardHeading>Summary</CardHeading>
            <Text style={{ fontSize: 9.5, color: "#374151", lineHeight: 1.45 }}>
              {normalizeText(personal.summary)}
            </Text>
          </Card>
        )}

        {experience.length > 0 && (
          <Card style={{ flex: 1, minWidth: "100%" }}>
            <CardHeading>Experience</CardHeading>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 6 }}>
                <View style={styles.rowBetween}>
                  <View style={{ flex: 1, paddingRight: SPACING.md }}>
                    <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                      {exp.title || "Job Title"}
                    </Text>
                    <Text style={{ fontSize: 9.5, fontWeight: 600, color: accent }}>
                      {exp.company || "Company"}
                      {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: border,
                      borderRadius: 2,
                      paddingHorizontal: 4,
                      paddingVertical: 1,
                    }}
                  >
                    <Text style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", color: "#6B7280" }}>
                      {dateRange(exp.startDate, exp.endDate)}
                    </Text>
                  </View>
                </View>
                {exp.description && (
                  <Text style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>
                    {normalizeText(exp.description)}
                  </Text>
                )}
              </View>
            ))}
          </Card>
        )}

        {education.length > 0 && (
          <Card style={{ flex: 1, minWidth: 200 }}>
            <CardHeading>Education</CardHeading>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 10.5, fontWeight: 700, color: ink }}>
                  {edu.degree || "Degree"}
                </Text>
                <Text style={{ fontSize: 9, color: sub }}>
                  {edu.school || "School"}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                </Text>
                <Text style={{ fontSize: 8, color: "#9CA3AF" }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </Text>
              </View>
            ))}
          </Card>
        )}

        {skillCategories.length > 0 && (
          <Card style={{ flex: 1, minWidth: 200 }}>
            <CardHeading>Skills</CardHeading>
            {skillCategories.map((cat) => (
              <Text key={cat.id} style={{ fontSize: 9, color: "#374151", marginBottom: 2 }}>
                <Text style={{ fontWeight: 700, color: ink }}>{cat.category}: </Text>
                {cat.skills.join(", ")}
              </Text>
            ))}
          </Card>
        )}

        {projects.length > 0 && (
          <Card style={{ flex: 1, minWidth: "100%" }}>
            <CardHeading>Projects</CardHeading>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <View style={styles.rowBetween}>
                  <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                    {proj.title || "Project Title"}
                  </Text>
                  {proj.liveLink && <Text style={{ fontSize: 9.5, color: accent }}>{proj.liveLink}</Text>}
                </View>
                {proj.techStack && <Text style={{ fontSize: 9, color: sub }}>{proj.techStack}</Text>}
                {proj.description && (
                  <Text style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>
                    {normalizeText(proj.description)}
                  </Text>
                )}
              </View>
            ))}
          </Card>
        )}

        {languages.length > 0 && (
          <Card style={{ flex: 1, minWidth: 200 }}>
            <CardHeading>Languages</CardHeading>
            {languages.map((l) => (
              <Text key={l.id} style={{ fontSize: 9, color: "#374151", marginBottom: 1 }}>
                <Text style={{ fontWeight: 700, color: ink }}>{l.language || "Language"}</Text>
                <Text style={{ color: sub }}> — {l.proficiency}</Text>
              </Text>
            ))}
          </Card>
        )}

        {certifications.length > 0 && (
          <Card style={{ flex: 1, minWidth: 200 }}>
            <CardHeading>Certifications</CardHeading>
            {certifications.map((c) => (
              <View key={c.id} style={{ marginBottom: 3 }}>
                <Text style={{ fontSize: 9, fontWeight: 700, color: ink }}>
                  {c.name || "Certification"}
                </Text>
                <Text style={{ fontSize: 8, color: sub }}>
                  {c.issuer}{c.date ? ` · ${c.date}` : ""}
                </Text>
              </View>
            ))}
          </Card>
        )}
      </View>
    </View>
  );
}
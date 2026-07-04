import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation, toRoman } from "../templates/contacts";

/**
 * Academic — centered serif, Roman-numeraled sections, classic CV style.
 */
export function PDFAcademicTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const ink = "#111827";
  const accent = "#6B7280";
  const sub = "#4B5563";
  const border = "#9CA3AF";

  const Section = ({ label, number, children }: { label: string; number: number; children: React.ReactNode }) => (
    <View key={label} wrap style={{ marginTop: SPACING.sm }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", marginBottom: 4 }}>
        <Text style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: accent }}>
          {toRoman(number)}.
        </Text>
        <Text
          style={{
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: ink,
          }}
        >
          {label}
        </Text>
      </View>
      <View style={{ marginLeft: 20, borderLeft: `0.5pt solid ${border}`, paddingLeft: 10 }}>
        {children}
      </View>
    </View>
  );

  return (
    <View style={styles.column} wrap>
      {/* Header */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 19,
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
              color: ink,
              marginTop: 2,
              textAlign: "center",
            }}
          >
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
          color={sub}
          sepColor={border}
          fontSize={8.5}
        />
      </View>

      <View style={{ borderTop: `1pt solid ${border}`, marginVertical: SPACING.sm }} />

      <View style={{ marginLeft: 15 }}>
        {/* Build sections array */}
        {(() => {
          let sections: Array<{ label: string; node: React.ReactNode }> = [];
          if (personal.summary) {
            sections.push({
              label: "Profile",
              node: (
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
              ),
            });
          }
          if (experience.length > 0) {
            sections.push({
              label: "Appointments",
              node: (
                <>
                  {experience.map((exp) => (
                    <View key={exp.id} style={{ marginTop: 4, flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 700, color: ink, fontSize: 9.5 }}>
                          {exp.title || "Job Title"}
                        </Text>
                        <Text style={{ color: sub, fontSize: 9.5 }}>
                          {exp.company || "Company"}
                          {joinLocation(exp.city, exp.state) ? `, ${joinLocation(exp.city, exp.state)}` : ""}
                        </Text>
                        {exp.description && (
                          <Text style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>
                            {normalizeText(exp.description)}
                          </Text>
                        )}
                      </View>
                      <Text style={{ fontSize: 8.5, color: "#6B7280" }}>
                        {dateRange(exp.startDate, exp.endDate)}
                      </Text>
                    </View>
                  ))}
                </>
              ),
            });
          }
          if (education.length > 0) {
            sections.push({
              label: "Education",
              node: (
                <>
                  {education.map((edu) => (
                    <View key={edu.id} style={{ marginTop: 4, flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 700, color: ink, fontSize: 9.5 }}>
                          {edu.degree || "Degree"}
                        </Text>
                        <Text style={{ color: sub, fontSize: 9.5 }}>
                          {edu.school || "School"}
                          {edu.location ? `, ${edu.location}` : ""}
                          {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 8.5, color: "#6B7280" }}>
                        {dateRange(edu.startDate, edu.endDate)}
                      </Text>
                    </View>
                  ))}
                </>
              ),
            });
          }
          if (projects.length > 0) {
            sections.push({
              label: "Projects",
              node: (
                <>
                  {projects.map((proj) => (
                    <View key={proj.id} style={{ marginTop: 4 }}>
                      <Text style={{ fontWeight: 700, color: ink, fontSize: 9.5 }}>
                        {proj.title || "Project Title"}
                      </Text>
                      {proj.techStack && (
                        <Text style={{ color: sub, fontSize: 9.5 }}> · {proj.techStack}</Text>
                      )}
                      {proj.description && (
                        <Text style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>
                          {normalizeText(proj.description)}
                        </Text>
                      )}
                    </View>
                  ))}
                </>
              ),
            });
          }
          if (skillCategories.length > 0) {
            sections.push({
              label: "Skills",
              node: (
                <>
                  {skillCategories.map((cat) => (
                    <Text key={cat.id} style={{ fontSize: 9.5, marginTop: 3 }}>
                      <Text style={{ fontWeight: 700, color: ink }}>{cat.category}: </Text>
                      <Text style={{ color: sub }}>{cat.skills.join(", ")}</Text>
                    </Text>
                  ))}
                </>
              ),
            });
          }
          if (languages.length > 0) {
            sections.push({
              label: "Languages",
              node: (
                <Text style={{ fontSize: 9.5, marginTop: 4 }}>
                  {languages.map((l, i) => (
                    <Text key={l.id}>
                      {i > 0 && <Text> · </Text>}
                      <Text style={{ fontWeight: 700, color: ink }}>{l.language || "Language"}</Text>
                      <Text style={{ color: "#6B7280" }}> ({l.proficiency})</Text>
                    </Text>
                  ))}
                </Text>
              ),
            });
          }
          if (certifications.length > 0) {
            sections.push({
              label: "Certifications",
              node: (
                <>
                  {certifications.map((c) => (
                    <Text key={c.id} style={{ fontSize: 9.5, marginTop: 3 }}>
                      <Text style={{ fontWeight: 700, color: ink }}>{c.name || "Certification"}</Text>
                      <Text style={{ color: "#6B7280" }}> — {c.issuer}{c.date ? `, ${c.date}` : ""}</Text>
                    </Text>
                  ))}
                </>
              ),
            });
          }
          return sections.map((s, i) => <Section key={s.label} label={s.label} number={i + 1} children={s.node} />);
        })()}
      </View>
    </View>
  );
}
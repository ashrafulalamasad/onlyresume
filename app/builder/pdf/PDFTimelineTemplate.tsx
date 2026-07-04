import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Timeline — vertical rail with dots, teal accent. Experience & Education on rail.
 */
export function PDFTimelineTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const accent = "#0D9488";
  const ink = "#0F172A";
  const sub = "#64748B";

  const Heading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 9.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2.5,
        color: accent,
        marginTop: SPACING.md,
        marginBottom: SPACING.xs,
      }}
    >
      {children}
    </Text>
  );

  const RailItem = ({ children, date }: { children: React.ReactNode; date: string }) => (
    <View
      style={{
        flexDirection: "row",
        marginBottom: SPACING.md,
        position: "relative",
      }}
    >
      {/* Dot */}
      <View
        style={{
          position: "absolute",
          left: -18,
          top: 3,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: accent,
          borderWidth: 1.5,
          borderColor: "#FFFFFF",
        }}
      />
      <View style={{ flexDirection: "row", marginLeft: 12, flex: 1 }}>
        <View style={{ marginRight: SPACING.sm, minWidth: 60 }}>
          <Text style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: accent }}>
            {date}
          </Text>
        </View>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </View>
  );

  return (
    <View style={styles.column} wrap>
      {/* Header */}
      <View style={styles.rowBetween}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: 700, color: ink }}>
            {personal.fullName || "Your Name"}
          </Text>
          {personal.professionTitle && (
            <Text style={{ fontSize: 11, fontWeight: 600, color: accent, marginTop: 2 }}>
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
          color={sub}
          sepColor={accent}
          fontSize={8.5}
        />
      </View>

      <View style={{ borderTop: `1.5pt solid ${accent}`, marginTop: SPACING.sm, marginBottom: SPACING.sm }} />

      {personal.summary && (
        <View wrap>
          <Heading>Profile</Heading>
          <Text style={{ fontSize: 9.5, color: "#374151", lineHeight: 1.45 }}>
            {normalizeText(personal.summary)}
          </Text>
        </View>
      )}

      {experience.length > 0 && (
        <View wrap>
          <Heading>Experience</Heading>
          {experience.map((exp) => (
            <RailItem key={exp.id} date={dateRange(exp.startDate, exp.endDate)}>
              <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                {exp.title || "Job Title"}
              </Text>
              <Text style={{ fontSize: 9.5, color: sub }}>
                {exp.company || "Company"}
                {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ""}
              </Text>
              {exp.description && (
                <Text style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>
                  {normalizeText(exp.description)}
                </Text>
              )}
            </RailItem>
          ))}
        </View>
      )}

      {education.length > 0 && (
        <View wrap>
          <Heading>Education</Heading>
          {education.map((edu) => (
            <RailItem key={edu.id} date={dateRange(edu.startDate, edu.endDate)}>
              <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                {edu.degree || "Degree"}
              </Text>
              <Text style={{ fontSize: 9.5, color: sub }}>
                {edu.school || "School"}
                {edu.location ? ` · ${edu.location}` : ""}
                {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
              </Text>
            </RailItem>
          ))}
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
                    backgroundColor: "#0D948815",
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
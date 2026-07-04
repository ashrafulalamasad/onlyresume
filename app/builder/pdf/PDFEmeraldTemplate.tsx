import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactColumn, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Emerald — left green-tinted sidebar with content at right; emerald accent.
 */
export function PDFEmeraldTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const accent = "#059669";
  const ink = "#064E3B";
  const panel = "#ECFDF5";
  const sub = "#047857";

  const SideHeading = ({ children }: { children: string }) => (
    <Text
      style={{
        ...styles.sideHeadingText,
        fontSize: 8.5,
        color: accent,
        marginTop: SPACING.sm,
        letterSpacing: 2,
      }}
    >
      {children}
    </Text>
  );

  const MainHeading = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2,
        color: ink,
        paddingBottom: 3,
        marginBottom: SPACING.xs,
        marginTop: SPACING.md,
        borderBottom: `1.5pt solid #A7F3D0`,
      }}
    >
      {children}
    </Text>
  );

  return (
    <View style={styles.column} wrap>
      <View style={styles.panelContainer}>
        {/* Sidebar */}
        <View
          style={{
            ...styles.panelSidebar,
            backgroundColor: panel,
            width: 160,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: ink,
              marginBottom: 2,
            }}
          >
            {personal.fullName || "Your Name"}
          </Text>
          {personal.professionTitle && (
            <Text
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                color: accent,
                marginTop: 2,
              }}
            >
              {personal.professionTitle}
            </Text>
          )}

          <PdfContactColumn
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
            linkColor={accent}
            plainColor={ink}
            fontSize={8.5}
          />

          {personal.summary && (
            <View>
              <SideHeading>About</SideHeading>
              <Text style={{ fontSize: 8.5, color: ink, lineHeight: 1.4 }}>
                {normalizeText(personal.summary)}
              </Text>
            </View>
          )}

          {skillCategories.length > 0 && (
            <View>
              <SideHeading>Skills</SideHeading>
              {skillCategories.map((cat) => (
                <View key={cat.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: ink }}>
                    {cat.category}
                  </Text>
                  <Text style={{ fontSize: 8.5, color: sub }}>
                    {cat.skills.join(", ")}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {languages.length > 0 && (
            <View>
              <SideHeading>Languages</SideHeading>
              {languages.map((l) => (
                <View key={l.id} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 8.5, color: ink }}>{l.language || "Language"}</Text>
                  <Text style={{ fontSize: 8.5, color: accent }}>{l.proficiency}</Text>
                </View>
              ))}
            </View>
          )}

          {certifications.length > 0 && (
            <View>
              <SideHeading>Certifications</SideHeading>
              {certifications.map((c) => (
                <View key={c.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 8.5, fontWeight: 700, color: ink }}>
                    {c.name || "Certification"}
                  </Text>
                  <Text style={{ fontSize: 8, color: sub }}>
                    {c.issuer}
                    {c.date ? ` · ${c.date}` : ""}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main */}
        <View style={styles.panelMain}>
          {experience.length > 0 && (
            <View wrap>
              <MainHeading>Experience</MainHeading>
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginTop: SPACING.sm }} wrap>
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

          {projects.length > 0 && (
            <View wrap>
              <MainHeading>Projects</MainHeading>
              {projects.map((proj) => (
                <View key={proj.id} style={{ marginTop: SPACING.sm }} wrap>
                  <View style={styles.rowBetween}>
                    <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                      {proj.title || "Project Title"}
                    </Text>
                    {proj.liveLink && <Text style={{ fontSize: 9.5, color: accent }}>{proj.liveLink}</Text>}
                  </View>
                  {proj.techStack && <Text style={{ fontSize: 9.5, color: "#64748B" }}>{proj.techStack}</Text>}
                  {proj.description && (
                    <Text style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>
                      {normalizeText(proj.description)}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {education.length > 0 && (
            <View wrap>
              <MainHeading>Education</MainHeading>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginTop: SPACING.sm }} wrap>
                  <View style={styles.rowBetween}>
                    <View style={{ flex: 1, paddingRight: SPACING.md }}>
                      <Text style={{ fontSize: 11, fontWeight: 700, color: ink }}>
                        {edu.degree || "Degree"}
                      </Text>
                      <Text style={{ fontSize: 9.5, color: "#64748B" }}>
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
        </View>
      </View>
    </View>
  );
}
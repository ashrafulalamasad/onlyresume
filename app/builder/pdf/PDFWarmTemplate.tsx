import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactText, PdfContactRow, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Warm — terracotta/amber palette, tinted header band, two-column body with warm sidebar.
 */
export function PDFWarmTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const accent = "#C2410C";
  const ink = "#1C1917";
  const band = "#FFF7ED";
  const panel = "#FFFBEB";
  const border = "#D97706";
  const sub = "#78716C";
  const sideAccent = "#9A3412";

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
        borderBottom: `1pt solid #FED7AA`,
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
          borderLeftColor: border,
          paddingVertical: 14,
          paddingHorizontal: 20,
          marginBottom: SPACING.md,
        }}
      >
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
          color="#78716C"
          sepColor="#78716C"
          fontSize={8.5}
        />
      </View>

      <View style={styles.panelContainer}>
        {/* Main */}
        <View style={styles.panelMain}>
          {personal.summary && (
            <View wrap>
              <MainHeading>Profile</MainHeading>
              <Text style={{ fontSize: 9.5, color: "#44403C", lineHeight: 1.45 }}>
                {normalizeText(personal.summary)}
              </Text>
            </View>
          )}

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
                    <View
                      style={{
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        paddingVertical: 1.5,
                        backgroundColor: "#FED7AA",
                      }}
                    >
                      <Text style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: accent }}>
                        {dateRange(exp.startDate, exp.endDate)}
                      </Text>
                    </View>
                  </View>
                  {exp.description && (
                    <Text style={{ fontSize: 9.5, color: "#44403C", marginTop: 2, lineHeight: 1.45 }}>
                      {normalizeText(exp.description)}
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
                      <Text style={{ fontSize: 9.5, color: sub }}>
                        {edu.school || "School"}
                        {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 8.5, color: "#A8A29E" }}>
                      {dateRange(edu.startDate, edu.endDate)}
                    </Text>
                  </View>
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
                  {proj.techStack && <Text style={{ fontSize: 9.5, color: sub }}>{proj.techStack}</Text>}
                  {proj.description && (
                    <Text style={{ fontSize: 9.5, color: "#44403C", marginTop: 2, lineHeight: 1.45 }}>
                      {normalizeText(proj.description)}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Sidebar */}
        <View
          style={{
            ...styles.panelSidebar,
            backgroundColor: panel,
            width: 150,
          }}
        >
          {skillCategories.length > 0 && (
            <View>
              <SideHeading>Skills</SideHeading>
              {skillCategories.map((cat) => (
                <View key={cat.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: ink }}>
                    {cat.category}
                  </Text>
                  <Text style={{ fontSize: 8.5, color: sideAccent }}>
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
                  <Text style={{ fontSize: 8, color: sideAccent }}>
                    {c.issuer}
                    {c.date ? ` · ${c.date}` : ""}
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
import { View, Text } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING } from "./pdfConfig";
import { PdfContactColumn, normalizeText } from "./pdfHelpers";
import { dateRange, joinLocation } from "../templates/contacts";

/**
 * Executive — dark heading bar on top, soft cream sidebar at right with gold
 * accents. Body content lives at left, sidebar at right.
 */
export function PDFExecutiveTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const gold = "#B45309";
  const ink = "#111827";
  const panel = "#FAF5E6";
  const sub = "#6B7280";

  const SideHeading = ({ children }: { children: string }) => (
    <Text
      style={{
        ...styles.sideHeadingText,
        fontSize: 8.5,
        color: gold,
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
        paddingBottom: 2,
        marginBottom: SPACING.sm,
        marginTop: SPACING.md,
        borderBottom: `0.5pt solid #E5E7EB`,
      }}
    >
      {children}
    </Text>
  );

  return (
    <View style={styles.column} wrap>
      {/* Heading bar */}
      <View
        style={{
          backgroundColor: ink,
          paddingVertical: 14,
          paddingHorizontal: 18,
        }}
      >
        <Text
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          {personal.fullName || "Your Name"}
        </Text>
        {personal.professionTitle && (
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: gold,
              marginTop: 2,
            }}
          >
            {personal.professionTitle}
          </Text>
        )}
      </View>

      {/* Body */}
      <View style={styles.panelContainer}>
        {/* Main content */}
        <View style={styles.panelMain}>
          {personal.summary && (
            <View wrap>
              <MainHeading>Profile</MainHeading>
              <Text
                style={{
                  fontSize: 9.5,
                  color: "#374151",
                  lineHeight: 1.45,
                }}
              >
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
                      <Text
                        style={{ fontSize: 11, fontWeight: 700, color: ink }}
                      >
                        {exp.title || "Job Title"}
                      </Text>
                      <Text
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: gold,
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
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: sub,
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

          {education.length > 0 && (
            <View wrap>
              <MainHeading>Education</MainHeading>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginTop: SPACING.sm }} wrap>
                  <View style={styles.rowBetween}>
                    <View style={{ flex: 1, paddingRight: SPACING.md }}>
                      <Text
                        style={{ fontSize: 11, fontWeight: 700, color: ink }}
                      >
                        {edu.degree || "Degree"}
                      </Text>
                      <Text style={{ fontSize: 9, color: sub }}>
                        {edu.school || "School"}
                        {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 8.5, color: "#9CA3AF" }}>
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
                    {proj.liveLink && (
                      <Text style={{ fontSize: 9, color: gold }}>
                        {proj.liveLink}
                      </Text>
                    )}
                  </View>
                  {proj.techStack && (
                    <Text style={{ fontSize: 9, color: sub }}>{proj.techStack}</Text>
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
        </View>

        {/* Sidebar */}
        <View
          style={{
            ...styles.panelSidebar,
            backgroundColor: panel,
            width: 155,
          }}
        >
          <SideHeading>Contact</SideHeading>
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
            linkColor={ink}
            plainColor={ink}
            fontSize={8.5}
          />

          {skillCategories.length > 0 && (
            <View>
              <SideHeading>Skills</SideHeading>
              {skillCategories.map((cat) => (
                <View key={cat.id} style={{ marginBottom: 4 }}>
                  <Text
                    style={{
                      fontSize: 8.5,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: ink,
                    }}
                  >
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
                <View
                  key={l.id}
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Text style={{ fontSize: 8.5, color: ink }}>
                    {l.language || "Language"}
                  </Text>
                  <Text style={{ fontSize: 8.5, color: gold }}>{l.proficiency}</Text>
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
      </View>
    </View>
  );
}

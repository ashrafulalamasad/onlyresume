import { View, Text, Link } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING, COLORS } from "./pdfConfig";
import { getUrlDisplayText, getUrlHref } from "../urlUtils";

interface PDFCorporateTemplateProps {
  data: ResumeData;
}

export function PDFCorporateTemplate({ data }: PDFCorporateTemplateProps) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  return (
    <View style={styles.corporateContainer}>
      {/* Sidebar */}
      <View style={styles.corporateSidebar}>
        <Text style={styles.sidebarTitle}>
          {personal.fullName || "Your Name"}
        </Text>
        {personal.professionTitle && (
          <Text style={styles.sidebarSubtitle}>{personal.professionTitle}</Text>
        )}

        {/* Contact Info — at top, matching web layout */}
        <View style={{ marginBottom: SPACING.md }}>
          {personal.email && (
            <Link
              href={`mailto:${personal.email}`}
              style={{ textDecoration: "none" }}
            >
              <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>
                {personal.email}
              </Text>
            </Link>
          )}
          {personal.phone && (
            <Link
              href={`tel:${personal.phone}`}
              style={{ textDecoration: "none" }}
            >
              <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>
                {personal.phone}
              </Text>
            </Link>
          )}
          {personal.location && (
            <Text style={styles.sidebarText}>{personal.location}</Text>
          )}
          {personal.linkedinUrl && (
            <Link
              href={getUrlHref(personal.linkedinUrl)}
              style={{ textDecoration: "none" }}
            >
              <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>
                {getUrlDisplayText(personal.linkedinUrl)}
              </Text>
            </Link>
          )}
          {personal.githubUrl && (
            <Link
              href={getUrlHref(personal.githubUrl)}
              style={{ textDecoration: "none" }}
            >
              <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>
                {getUrlDisplayText(personal.githubUrl)}
              </Text>
            </Link>
          )}
          {personal.portfolioUrl && (
            <Link
              href={getUrlHref(personal.portfolioUrl)}
              style={{ textDecoration: "none" }}
            >
              <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>
                {getUrlDisplayText(personal.portfolioUrl)}
              </Text>
            </Link>
          )}
        </View>

        {/* Sidebar Summary */}
        {personal.summary && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>About</Text>
            <Text
              style={{
                ...styles.sidebarText,
                lineHeight: 1.4,
              }}
            >
              {personal.summary
                .replace(/\r/g, "")
                .replace(/([^\n])\n([^\n])/g, "$1 $2")}
            </Text>
          </View>
        )}

        {/* Skills — badge-style to match web */}
        {skillCategories.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Skills</Text>
            {skillCategories.map((cat) => (
              <View key={cat.id} style={{ marginBottom: SPACING.sm }}>
                <Text style={styles.sidebarText}>
                  <Text style={{ fontWeight: 600 }}>{cat.category}: </Text>
                  {cat.skills.join(", ")}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Languages</Text>
            {languages.map((lang) => (
              <View
                key={lang.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: SPACING.xs,
                }}
              >
                <Text style={{ ...styles.sidebarText, color: "#E2E8F0" }}>
                  {lang.language || "Language"}
                </Text>
                <Text
                  style={{ ...styles.sidebarText, color: COLORS.lightText }}
                >
                  {lang.proficiency}
                </Text>
              </View>
            ))}
          </View>
        )}

        {certifications.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={{ marginBottom: SPACING.sm }}>
                <Text
                  style={{
                    ...styles.sidebarText,
                    color: "#E2E8F0",
                    marginBottom: 1,
                  }}
                >
                  <Text style={{ fontWeight: 600 }}>
                    {cert.name || "Certification"}
                  </Text>
                </Text>
                {(cert.issuer || cert.date) && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.sidebarText,
                        color: "#CBD5E1",
                        marginBottom: 0,
                        flex: 1,
                        paddingRight: SPACING.xs,
                      }}
                    >
                      {cert.issuer || ""}
                    </Text>
                    {cert.date && (
                      <Text
                        style={{
                          ...styles.sidebarText,
                          color: COLORS.lightText,
                          marginBottom: 0,
                        }}
                      >
                        {cert.date}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.corporateContent}>
        {/* Experience */}
        {experience.length > 0 && (
          <View style={{ marginBottom: SPACING.md }}>
            <Text style={{ ...styles.sectionHeader, color: COLORS.primary }}>
              Experience
            </Text>
            {experience.map((exp, index) => (
              <View
                key={exp.id}
                style={{
                  marginBottom: SPACING.sm,
                  paddingBottom: SPACING.sm,
                  ...(index < experience.length - 1
                    ? { borderBottom: `0.5pt solid ${COLORS.border}` }
                    : {}),
                }}
              >
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.sectionTitle}>
                      {exp.title || "Job Title"}
                    </Text>
                    <Text style={styles.subTitle}>
                      {exp.company || "Company"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column" as const,
                      alignItems: "flex-end" as const,
                    }}
                  >
                    {(exp.city || exp.state) && (
                      <Text style={styles.subTitle}>
                        {[exp.city, exp.state].filter(Boolean).join(", ")}
                      </Text>
                    )}
                    <Text style={styles.smallText}>
                      {exp.startDate}
                      {exp.endDate ? ` — ${exp.endDate}` : ""}
                    </Text>
                  </View>
                </View>
                {exp.description && (
                  <Text style={{ ...styles.text, marginTop: SPACING.xs }}>
                    {exp.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={{ marginBottom: SPACING.md }}>
            <Text style={{ ...styles.sectionHeader, color: COLORS.primary }}>
              Projects
            </Text>
            {projects.map((proj, index) => (
              <View
                key={proj.id}
                style={{
                  marginBottom: SPACING.sm,
                  paddingBottom: SPACING.sm,
                  ...(index < projects.length - 1
                    ? { borderBottom: `0.5pt solid ${COLORS.border}` }
                    : {}),
                }}
              >
                <View style={styles.rowBetween}>
                  <Text style={styles.sectionTitle}>
                    {proj.title || "Project Title"}
                  </Text>
                  {proj.liveLink && (
                    <Text style={styles.link}>{proj.liveLink}</Text>
                  )}
                </View>
                {proj.techStack && (
                  <Text style={styles.subTitle}>{proj.techStack}</Text>
                )}
                {proj.description && (
                  <Text style={{ ...styles.text, marginTop: SPACING.xs }}>
                    {proj.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={{ marginBottom: SPACING.md }}>
            <Text style={{ ...styles.sectionHeader, color: COLORS.primary }}>
              Education
            </Text>
            {education.map((edu, index) => (
              <View
                key={edu.id}
                style={{
                  marginBottom: SPACING.sm,
                  paddingBottom: SPACING.sm,
                  ...(index < education.length - 1
                    ? { borderBottom: `0.5pt solid ${COLORS.border}` }
                    : {}),
                }}
              >
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.sectionTitle}>
                      {edu.degree || "Degree"}
                    </Text>
                    <Text style={styles.subTitle}>
                      {edu.school || "School"}
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column" as const,
                      alignItems: "flex-end" as const,
                    }}
                  >
                    {edu.location && (
                      <Text style={styles.subTitle}>{edu.location}</Text>
                    )}
                    <Text style={styles.smallText}>
                      {edu.startDate}
                      {edu.endDate ? ` — ${edu.endDate}` : ""}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

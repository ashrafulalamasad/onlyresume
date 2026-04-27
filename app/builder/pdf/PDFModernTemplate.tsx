import { View, Text, Link } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING, COLORS } from "./pdfConfig";
import { getUrlDisplayText, getUrlHref } from "../urlUtils";

interface PDFModernTemplateProps {
  data: ResumeData;
}

export function PDFModernTemplate({ data }: PDFModernTemplateProps) {
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
    <View style={styles.column}>
      {/* Header — includes summary, matching web layout */}
      <View style={styles.modernHeader}>
        <Text style={styles.modernName}>
          {personal.fullName || "Your Name"}
        </Text>
        {personal.professionTitle && (
          <Text style={styles.modernContactInfo}>
            {personal.professionTitle}
          </Text>
        )}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginTop: SPACING.sm,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: SPACING.xs,
            }}
          >
            {personal.email && (
              <Link
                href={`mailto:${personal.email}`}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.modernContactInfo}>{personal.email}</Text>
              </Link>
            )}
            {personal.phone && (
              <Link
                href={`tel:${personal.phone}`}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.modernContactInfo}>{personal.phone}</Text>
              </Link>
            )}
            {personal.location && (
              <Text
                style={{
                  ...styles.smallText,
                  color: "#CBD5E1",
                  marginRight: 0,
                }}
              >
                {personal.location}
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: SPACING.xs,
              marginTop: 2,
            }}
          >
            {personal.linkedinUrl && (
              <Link
                href={getUrlHref(personal.linkedinUrl)}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.modernContactInfo}>
                  {getUrlDisplayText(personal.linkedinUrl)}
                </Text>
              </Link>
            )}
            {personal.githubUrl && (
              <Link
                href={getUrlHref(personal.githubUrl)}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.modernContactInfo}>
                  {getUrlDisplayText(personal.githubUrl)}
                </Text>
              </Link>
            )}
            {personal.portfolioUrl && (
              <Link
                href={getUrlHref(personal.portfolioUrl)}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.modernContactInfo}>
                  {getUrlDisplayText(personal.portfolioUrl)}
                </Text>
              </Link>
            )}
          </View>
        </View>
        {personal.summary && (
          <Text
            style={{
              fontSize: 9,
              lineHeight: 1.5,
              color: "#CBD5E1",
              marginTop: SPACING.md,
              textAlign: "justify",
            }}
          >
            {personal.summary
              .replace(/\r/g, "")
              .replace(/([^\n])\n([^\n])/g, "$1 $2")}
          </Text>
        )}
      </View>

      {/* Body Content */}
      <View style={{ gap: 12 }}>
        {/* Experience */}
        {experience.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: SPACING.sm }}>
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

        {/* Education */}
        {education.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: SPACING.sm }}>
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

        {/* Skills — accent-tinted badges matching web */}
        {skillCategories.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Skills</Text>
            {skillCategories.map((cat) => (
              <View key={cat.id} style={{ marginBottom: SPACING.sm }}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 600 }}>{cat.category}: </Text>
                  {cat.skills.join(", ")}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: SPACING.sm }}>
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

        {/* Languages — accent-tinted badges */}
        {languages.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Languages</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: SPACING.xs,
                marginTop: SPACING.xs,
              }}
            >
              {languages.map((lang) => (
                <Text
                  key={lang.id}
                  style={{
                    backgroundColor: COLORS.accentLight,
                    color: COLORS.accent,
                    fontSize: 9,
                    fontWeight: 500,
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    borderRadius: 3,
                  }}
                >
                  {lang.language || "Language"} · {lang.proficiency}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Certifications</Text>
            {certifications.map((cert) => (
              <View
                key={cert.id}
                style={{ ...styles.rowBetween, marginBottom: SPACING.sm }}
              >
                <Text
                  style={{ ...styles.text, flex: 1, paddingRight: SPACING.md }}
                >
                  <Text style={{ fontWeight: 600 }}>
                    {cert.name || "Certification"}
                  </Text>
                  {cert.issuer && <Text> | {cert.issuer}</Text>}
                </Text>
                {cert.date && <Text style={styles.smallText}>{cert.date}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

import { View, Text, Link } from "@react-pdf/renderer";
import type { ResumeData } from "../types";
import { styles } from "./pdfStyles";
import { SPACING, COLORS } from "./pdfConfig";
import { getUrlDisplayText, getUrlHref } from "../urlUtils";
import { JSX } from "react";

interface PDFMinimalTemplateProps {
  data: ResumeData;
}

export function PDFMinimalTemplate({ data }: PDFMinimalTemplateProps) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const classicPrimaryItems: Array<{ key: string; node: JSX.Element }> = [];
  const classicSecondaryItems: Array<{ key: string; node: JSX.Element }> = [];

  if (personal.email) {
    classicPrimaryItems.push({
      key: "email",
      node: (
        <Link
          href={`mailto:${personal.email}`}
          style={{ textDecoration: "none" }}
        >
          <Text style={{ ...styles.contactInfo, marginRight: 0 }}>
            {personal.email}
          </Text>
        </Link>
      ),
    });
  }

  if (personal.phone) {
    classicPrimaryItems.push({
      key: "phone",
      node: (
        <Link href={`tel:${personal.phone}`} style={{ textDecoration: "none" }}>
          <Text style={{ ...styles.contactInfo, marginRight: 0 }}>
            {personal.phone}
          </Text>
        </Link>
      ),
    });
  }

  if (personal.location) {
    classicPrimaryItems.push({
      key: "location",
      node: (
        <Text style={{ ...styles.smallText, color: "#303030", marginRight: 0 }}>
          {personal.location}
        </Text>
      ),
    });
  }

  if (personal.linkedinUrl) {
    classicSecondaryItems.push({
      key: "linkedin",
      node: (
        <Link
          href={getUrlHref(personal.linkedinUrl)}
          style={{ textDecoration: "none" }}
        >
          <Text style={{ ...styles.contactInfo, marginRight: 0 }}>
            {getUrlDisplayText(personal.linkedinUrl)}
          </Text>
        </Link>
      ),
    });
  }

  if (personal.githubUrl) {
    classicSecondaryItems.push({
      key: "github",
      node: (
        <Link
          href={getUrlHref(personal.githubUrl)}
          style={{ textDecoration: "none" }}
        >
          <Text style={{ ...styles.contactInfo, marginRight: 0 }}>
            {getUrlDisplayText(personal.githubUrl)}
          </Text>
        </Link>
      ),
    });
  }

  if (personal.portfolioUrl) {
    classicSecondaryItems.push({
      key: "portfolio",
      node: (
        <Link
          href={getUrlHref(personal.portfolioUrl)}
          style={{ textDecoration: "none" }}
        >
          <Text style={{ ...styles.contactInfo, marginRight: 0 }}>
            {getUrlDisplayText(personal.portfolioUrl)}
          </Text>
        </Link>
      ),
    });
  }

  const hasClassicContact =
    classicPrimaryItems.length > 0 || classicSecondaryItems.length > 0;

  const renderClassicPdfRow = (
    items: Array<{ key: string; node: JSX.Element }>,
  ) =>
    items.map((item, index) => (
      <View
        key={item.key}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {index > 0 && (
          <Text
            style={{
              ...styles.smallText,
              color: COLORS.lightText,
              marginHorizontal: SPACING.xs,
            }}
          >
            |
          </Text>
        )}
        {item.node}
      </View>
    ));

  return (
    <View style={styles.column} wrap>
      {/* Header */}
      <View style={styles.minimalHeader}>
        <Text style={styles.minimalName}>
          {personal.fullName || "Your Name"}
        </Text>
        {personal.professionTitle && (
          <Text style={styles.minimalTitle}>{personal.professionTitle}</Text>
        )}
        {hasClassicContact && (
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
                minHeight: 10,
                alignItems: "center",
              }}
            >
              {renderClassicPdfRow(classicPrimaryItems)}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                minHeight: 10,
                alignItems: "center",
                marginTop: 2,
              }}
            >
              {renderClassicPdfRow(classicSecondaryItems)}
            </View>
          </View>
        )}
      </View>

      {/* Summary */}
      {personal.summary && (
        <View style={{ marginBottom: SPACING.md }} wrap>
          <Text style={styles.sectionHeader}>Summary</Text>
          <Text style={{ ...styles.text, textAlign: "justify" }}>
            {personal.summary
              .replace(/\r/g, "")
              .replace(/([^\n])\n([^\n])/g, "$1 $2")}
          </Text>
        </View>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <View style={{ marginBottom: SPACING.md }} wrap>
          <Text style={styles.sectionHeader}>Experience</Text>
          {experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: SPACING.sm }} wrap>
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
        <View style={{ marginBottom: SPACING.md }} wrap>
          <Text style={styles.sectionHeader}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={{ marginBottom: SPACING.sm }} wrap>
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

      {/* Skills */}
      {skillCategories.length > 0 && (
        <View style={{ marginBottom: SPACING.md }} wrap>
          <Text style={styles.sectionHeader}>Skills</Text>
          {skillCategories.map((cat) => (
            <View key={cat.id} style={{ marginBottom: SPACING.xs }} wrap>
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
        <>
          <Text style={styles.sectionHeader}>Projects</Text>
          {projects.map((proj, index) => (
            <View
              key={proj.id}
              style={{
                marginBottom:
                  index === projects.length - 1 ? SPACING.md : SPACING.sm,
              }}
              wrap
            >
              <View style={styles.rowBetween} wrap={false}>
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
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <View style={{ marginBottom: SPACING.md }} wrap>
          <Text style={styles.sectionHeader}>Languages</Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACING.xs }}
            wrap
          >
            {languages.map((lang) => (
              <Text key={lang.id} style={styles.badge}>
                {lang.language || "Language"} · {lang.proficiency}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <View style={{ marginBottom: SPACING.md }} wrap>
          <Text style={styles.sectionHeader}>Certifications</Text>
          {certifications.map((cert) => (
            <View
              key={cert.id}
              style={{ ...styles.rowBetween, marginBottom: SPACING.sm }}
              wrap
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
  );
}

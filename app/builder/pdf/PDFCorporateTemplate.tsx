import { View, Text } from '@react-pdf/renderer'
import type { ResumeData } from '../types'
import { styles } from './pdfStyles'
import { SPACING, COLORS } from './pdfConfig'

interface PDFCorporateTemplateProps {
  data: ResumeData
}

export function PDFCorporateTemplate({ data }: PDFCorporateTemplateProps) {
  const { personal, experience, education, skills, projects, languages, certifications } = data

  return (
    <View style={styles.corporateContainer}>
      {/* Sidebar */}
      <View style={styles.corporateSidebar}>
        <Text style={styles.sidebarTitle}>{personal.fullName || 'Your Name'}</Text>
        {personal.professionTitle && (
          <Text style={styles.sidebarSubtitle}>{personal.professionTitle}</Text>
        )}

        {/* Contact Info — at top, matching web layout */}
        <View style={{ marginBottom: SPACING.md }}>
          {personal.email && <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>{personal.email}</Text>}
          {personal.phone && <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>{personal.phone}</Text>}
          {personal.location && <Text style={styles.sidebarText}>{personal.location}</Text>}
          {personal.linkedinUrl && <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>{personal.linkedinUrl}</Text>}
          {personal.githubUrl && <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>{personal.githubUrl}</Text>}
          {personal.portfolioUrl && <Text style={{ ...styles.sidebarText, color: COLORS.accent }}>{personal.portfolioUrl}</Text>}
        </View>

        {/* Sidebar Summary */}
        {personal.summary && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>About</Text>
            <Text style={{ ...styles.sidebarText, lineHeight: 1.4 }}>{personal.summary}</Text>
          </View>
        )}

        {/* Skills — badge-style to match web */}
        {skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Skills</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs }}>
              {skills.map((skill, i) => (
                <Text key={i} style={{
                  backgroundColor: '#1E293B',
                  color: '#E2E8F0',
                  fontSize: 8,
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  borderRadius: 2,
                  marginBottom: SPACING.xs,
                }}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: SPACING.sm }}>
                <Text style={{ ...styles.sidebarText, fontWeight: 600 }}>
                  {edu.degree || 'Degree'}
                </Text>
                <Text style={styles.sidebarText}>
                  {edu.school || 'School'}
                  {edu.gpa && ` · GPA: ${edu.gpa}`}
                </Text>
                <Text style={{ ...styles.sidebarText, color: COLORS.lightText }}>
                  {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
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
              <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xs }}>
                <Text style={{ ...styles.sidebarText, color: '#E2E8F0' }}>
                  {lang.language || 'Language'}
                </Text>
                <Text style={{ ...styles.sidebarText, color: COLORS.lightText }}>
                  {lang.proficiency}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={{ marginBottom: SPACING.sm }}>
                <Text style={{ ...styles.sidebarText, fontWeight: 600 }}>
                  {cert.name || 'Certification'}
                </Text>
                <Text style={{ ...styles.sidebarText, color: COLORS.lightText }}>
                  {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                </Text>
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
            <Text style={{ ...styles.sectionHeader, color: COLORS.primary }}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={exp.id} style={{
                marginBottom: SPACING.sm,
                paddingBottom: SPACING.sm,
                ...(index < experience.length - 1 ? { borderBottom: `0.5pt solid ${COLORS.border}` } : {}),
              }}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.sectionTitle}>{exp.title || 'Job Title'}</Text>
                    <Text style={styles.subTitle}>
                      {exp.company || 'Company'}
                      {(exp.city || exp.state) && ` · ${[exp.city, exp.state].filter(Boolean).join(', ')}`}
                    </Text>
                  </View>
                  <Text style={styles.smallText}>
                    {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={{ ...styles.text, marginTop: SPACING.xs }}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={{ marginBottom: SPACING.md }}>
            <Text style={{ ...styles.sectionHeader, color: COLORS.primary }}>Projects</Text>
            {projects.map((proj, index) => (
              <View key={proj.id} style={{
                marginBottom: SPACING.sm,
                paddingBottom: SPACING.sm,
                ...(index < projects.length - 1 ? { borderBottom: `0.5pt solid ${COLORS.border}` } : {}),
              }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.sectionTitle}>{proj.title || 'Project Title'}</Text>
                  {proj.liveLink && <Text style={styles.link}>{proj.liveLink}</Text>}
                </View>
                {proj.techStack && (
                  <Text style={styles.subTitle}>{proj.techStack}</Text>
                )}
                {proj.description && (
                  <Text style={{ ...styles.text, marginTop: SPACING.xs }}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

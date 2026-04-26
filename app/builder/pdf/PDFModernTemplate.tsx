import { View, Text } from '@react-pdf/renderer'
import type { ResumeData } from '../types'
import { styles } from './pdfStyles'
import { SPACING, COLORS } from './pdfConfig'

interface PDFModernTemplateProps {
  data: ResumeData
}

export function PDFModernTemplate({ data }: PDFModernTemplateProps) {
  const { personal, experience, education, skills, projects, languages, certifications } = data

  return (
    <View style={styles.column}>
      {/* Header — includes summary, matching web layout */}
      <View style={styles.modernHeader}>
        <Text style={styles.modernName}>{personal.fullName || 'Your Name'}</Text>
        {personal.professionTitle && (
          <Text style={styles.modernContactInfo}>{personal.professionTitle}</Text>
        )}
        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: SPACING.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: SPACING.xs }}>
            {personal.email && <Text style={styles.modernContactInfo}>{personal.email}</Text>}
            {personal.phone && <Text style={styles.modernContactInfo}>{personal.phone}</Text>}
            {personal.location && <Text style={{ ...styles.smallText, color: '#CBD5E1', marginRight: 0 }}>
              {personal.location}
            </Text>}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: SPACING.xs, marginTop: 2 }}>
            {personal.linkedinUrl && <Text style={styles.modernContactInfo}>{personal.linkedinUrl}</Text>}
            {personal.githubUrl && <Text style={styles.modernContactInfo}>{personal.githubUrl}</Text>}
            {personal.portfolioUrl && <Text style={styles.modernContactInfo}>{personal.portfolioUrl}</Text>}
          </View>
        </View>
        {personal.summary && (
          <Text style={{ fontSize: 9, lineHeight: 1.5, color: '#CBD5E1', marginTop: SPACING.md, textAlign: 'center', width: '100%' }}>
            {personal.summary}
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

        {/* Education */}
        {education.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: SPACING.sm }}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.sectionTitle}>{edu.degree || 'Degree'}</Text>
                    <Text style={styles.subTitle}>
                      {edu.school || 'School'}
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </Text>
                  </View>
                  <Text style={styles.smallText}>
                    {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills — accent-tinted badges matching web */}
        {skills.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Skills</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginTop: SPACING.xs }}>
              {skills.map((skill, i) => (
                <Text key={i} style={{
                  backgroundColor: COLORS.accentLight,
                  color: COLORS.accent,
                  fontSize: 9,
                  fontWeight: 500,
                  paddingVertical: 3,
                  paddingHorizontal: 6,
                  borderRadius: 3,
                }}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: SPACING.sm }}>
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

        {/* Languages — accent-tinted badges */}
        {languages.length > 0 && (
          <View>
            <Text style={styles.modernSectionHeader}>Languages</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginTop: SPACING.xs }}>
              {languages.map((lang) => (
                <Text key={lang.id} style={{
                  backgroundColor: COLORS.accentLight,
                  color: COLORS.accent,
                  fontSize: 9,
                  fontWeight: 500,
                  paddingVertical: 3,
                  paddingHorizontal: 6,
                  borderRadius: 3,
                }}>
                  {lang.language || 'Language'} · {lang.proficiency}
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
              <View key={cert.id} style={{ ...styles.rowBetween, marginBottom: SPACING.sm }}>
                <View>
                  <Text style={styles.sectionTitle}>{cert.name || 'Certification'}</Text>
                  {cert.issuer && <Text style={styles.subTitle}>{cert.issuer}</Text>}
                </View>
                {cert.date && <Text style={styles.smallText}>{cert.date}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

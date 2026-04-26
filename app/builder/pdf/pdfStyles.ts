import { StyleSheet } from '@react-pdf/renderer'
import { A4, COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from './pdfConfig'

export const styles = StyleSheet.create({
  // Layout
  page: {
    padding: A4.margin,
    fontFamily: 'Helvetica',
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
  },

  container: {
    flex: 1,
  },

  // Typography
  header: {
    fontSize: FONT_SIZES._2xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center' as const,
  },

  sectionHeader: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.accent,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
  },

  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },

  subTitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.secondary,
    marginBottom: SPACING.xs,
  },

  text: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    lineHeight: 1.5,
  },

  smallText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.lightText,
  },

  // Spacing
  spacer: {
    height: SPACING.sm,
  },

  spacerLg: {
    height: SPACING.md,
  },

  // Flex layouts
  row: {
    flexDirection: 'row' as const,
    display: 'flex',
  },

  rowBetween: {
    flexDirection: 'row' as const,
    display: 'flex',
    justifyContent: 'space-between' as const,
  },

  rowCenter: {
    flexDirection: 'row' as const,
    display: 'flex',
    alignItems: 'center' as const,
  },

  column: {
    flexDirection: 'column' as const,
    display: 'flex',
  },

  // Minimal template specific
  minimalHeader: {
    borderBottom: `2pt solid ${COLORS.accent}`,
    paddingBottom: SPACING.sm,
    marginBottom: SPACING.md,
    textAlign: 'center' as const,
  },

  minimalName: {
    fontSize: FONT_SIZES._2xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },

  minimalTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    marginBottom: SPACING.xs,
  },

  contactInfo: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accent,
    marginRight: SPACING.xs,
  },

  // Corporate template specific
  corporateContainer: {
    flexDirection: 'row' as const,
    display: 'flex',
  },

  corporateSidebar: {
    width: 175,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 18,
    flexDirection: 'column' as const,
    display: 'flex',
  },

  corporateContent: {
    flex: 1,
    flexDirection: 'column' as const,
    display: 'flex',
    paddingLeft: 12,
  },

  sidebarTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
    textAlign: 'center' as const,
  },

  sidebarSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accent,
    marginBottom: SPACING.sm,
    textAlign: 'center' as const,
  },

  sidebarSection: {
    marginBottom: SPACING.md,
  },

  sidebarSectionTitle: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.accent,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
  },

  sidebarText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    marginBottom: SPACING.xs,
    lineHeight: 1.2,
  },

  // Modern template specific
  modernHeader: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 27,
    marginBottom: SPACING.md,
  },

  modernName: {
    fontSize: FONT_SIZES._2xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
    textAlign: 'center' as const,
  },

  modernContactInfo: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accent,
    textAlign: 'center' as const,
    marginRight: SPACING.xs,
  },

  modernSection: {
    marginBottom: 12,
  },

  modernSectionHeader: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.accent,
    borderBottom: `2pt solid ${COLORS.accent}`,
    paddingBottom: SPACING.xs,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
  },

  // Common elements
  bullet: {
    marginLeft: SPACING.md,
    marginBottom: SPACING.xs,
  },

  bulletText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    lineHeight: 1.5,
  },

  badge: {
    backgroundColor: COLORS.light,
    color: COLORS.text,
    padding: `${SPACING.xs}pt ${SPACING.sm}pt` as any,
    borderRadius: 3,
    fontSize: FONT_SIZES.xs,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },

  link: {
    color: COLORS.accent,
    textDecoration: 'underline',
    fontSize: FONT_SIZES.xs,
  },

  divider: {
    borderTop: `1pt solid ${COLORS.border}`,
    marginVertical: SPACING.sm,
  },
})

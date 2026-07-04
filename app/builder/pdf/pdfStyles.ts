import { StyleSheet } from "@react-pdf/renderer";
import { A4, COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from "./pdfConfig";

export const styles = StyleSheet.create({
  // Layout
  page: {
    padding: A4.margin,
    fontFamily: "Helvetica",
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
    textAlign: "center" as const,
  },

  sectionHeader: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.accent,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
    textTransform: "uppercase" as const,
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
    flexDirection: "row" as const,
    display: "flex",
  },

  rowBetween: {
    flexDirection: "row" as const,
    display: "flex",
    justifyContent: "space-between" as const,
  },

  rowCenter: {
    flexDirection: "row" as const,
    display: "flex",
    alignItems: "center" as const,
  },

  column: {
    flexDirection: "column" as const,
    display: "flex",
    width: "100%",
  },

  // Minimal template specific
  minimalHeader: {
    borderBottom: `2pt solid ${COLORS.accent}`,
    paddingBottom: SPACING.sm,
    marginBottom: SPACING.md,
    textAlign: "center" as const,
  },

  minimalName: {
    fontSize: FONT_SIZES._2xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },

  minimalTitle: {
    fontSize: FONT_SIZES.sm,
    color: "#303030",
    marginBottom: SPACING.xs,
  },

  contactInfo: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accent,
    marginRight: SPACING.xs,
    cursor: "pointer",
    textDecoration: "none",
  },

  // Corporate template specific
  corporateContainer: {
    flexDirection: "row" as const,
    display: "flex",
  },

  corporateSidebar: {
    width: 180,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 13,
    flexDirection: "column" as const,
    display: "flex",
  },

  corporateContent: {
    flex: 1,
    flexDirection: "column" as const,
    display: "flex",
    paddingLeft: 12,
  },

  sidebarTitle: {
    fontSize: 15,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
    textAlign: "center" as const,
  },

  sidebarSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accent,
    marginBottom: SPACING.sm,
    textAlign: "center" as const,
  },

  sidebarSection: {
    marginBottom: SPACING.md,
  },

  sidebarSectionTitle: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.accent,
    marginBottom: SPACING.xs,
    textTransform: "uppercase" as const,
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
    textAlign: "center" as const,
  },

  modernContactInfo: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accent,
    textAlign: "center" as const,
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
    textTransform: "uppercase" as const,
    letterSpacing: 2,
  },

  // Common sidebar shell shared by the two-column templates (Executive,
  // Technical, Emerald, SidebarRight, Warm). Each template sets its own
  // `backgroundColor`/`width` via inline style overrides.
  panelContainer: {
    flexDirection: "row" as const,
    display: "flex",
    width: "100%",
  },

  panelSidebar: {
    width: 165,
    padding: 12,
    flexDirection: "column" as const,
    display: "flex",
    borderRadius: 4,
  },

  panelMain: {
    flex: 1,
    flexDirection: "column" as const,
    display: "flex",
    paddingLeft: 10,
  },

  // Section heading used by sidebar templates (Executive, Technical, Emerald,
  // SidebarRight, Warm). The visual variant is achieved with an inline color.
  sideHeading: {
    fontSize: 8.5,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.accent,
    textTransform: "uppercase" as const,
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  sideHeadingText: {
    fontSize: 8.5,
    fontWeight: FONT_WEIGHTS.bold,
    textTransform: "uppercase" as const,
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  sidePanelText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    marginBottom: SPACING.xs,
    lineHeight: 1.25,
  },

  sidePanelTextInk: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    lineHeight: 1.25,
  },

  mainHeading: {
    fontSize: 10,
    fontWeight: FONT_WEIGHTS.bold,
    textTransform: "uppercase" as const,
    letterSpacing: 1.5,
    paddingBottom: 3,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
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
    textDecoration: "none",
    fontSize: FONT_SIZES.xs,
    cursor: "pointer",
  },

  divider: {
    borderTop: `1pt solid ${COLORS.border}`,
    marginVertical: SPACING.sm,
  },
});

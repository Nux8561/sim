/**
 * Base styles for all email templates.
 * Colors are derived from globals.css light mode tokens.
 */

/** Color tokens from globals.css (light mode) - Attio-inspired */
export const colors = {
  /** Main canvas background - clean white */
  bgOuter: '#ffffff',
  /** Card/container background - pure white */
  bgCard: '#ffffff',
  /** Primary text color - softer black */
  textPrimary: '#1a1a1a',
  /** Secondary text color - warm gray */
  textSecondary: '#374151',
  /** Tertiary text color */
  textTertiary: '#6b7280',
  /** Muted text (footer) */
  textMuted: '#9ca3af',
  /** Brand primary - introFlow blue */
  brandPrimary: '#2563eb',
  /** Brand button - Attio-style dark */
  brandButton: '#1a1a1a',
  /** Brand tertiary - kept for backwards compatibility */
  brandTertiary: '#1a1a1a',
  /** Link color - golden accent like Attio */
  linkColor: '#d97706',
  /** Border/divider color - very subtle */
  divider: '#f3f4f6',
  /** Footer background - light gray */
  footerBg: '#f9fafb',
}

/** Typography settings - Attio-inspired */
export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif",
  fontSize: {
    body: '16px',
    small: '14px',
    caption: '13px',
    heading: '20px',
  },
  lineHeight: {
    body: '26px',
    caption: '20px',
    heading: '28px',
  },
}

/** Spacing values - More whitespace like Attio */
export const spacing = {
  containerWidth: 580,
  gutter: 48,
  sectionGap: 32,
  paragraphGap: 20,
  /** Logo width in pixels */
  logoWidth: 100,
  /** Hero image margin */
  heroMargin: 32,
}

export const baseStyles = {
  fontFamily: typography.fontFamily,

  /** Main body wrapper with outer background - Attio-style clean white */
  main: {
    backgroundColor: colors.bgOuter,
    fontFamily: typography.fontFamily,
    padding: '48px 0',
  },

  /** Center wrapper for email content */
  wrapper: {
    maxWidth: `${spacing.containerWidth}px`,
    margin: '0 auto',
  },

  /** Main card container - Attio-style minimal, no visible border */
  container: {
    maxWidth: `${spacing.containerWidth}px`,
    margin: '0 auto',
    backgroundColor: colors.bgCard,
    borderRadius: '0',
    overflow: 'hidden',
  },

  /** Header section with logo - More padding like Attio */
  header: {
    padding: `40px ${spacing.gutter}px 24px ${spacing.gutter}px`,
    textAlign: 'center' as const,
  },

  /** Main content area with horizontal padding - More spacious */
  content: {
    padding: `0 ${spacing.gutter}px 48px ${spacing.gutter}px`,
  },

  /** Standard paragraph text - Warmer, more readable */
  paragraph: {
    fontSize: typography.fontSize.body,
    lineHeight: typography.lineHeight.body,
    color: colors.textSecondary,
    fontWeight: 400,
    fontFamily: typography.fontFamily,
    margin: `0 0 ${spacing.paragraphGap}px 0`,
  },

  /** Bold label text (e.g., "Platform:", "Time:") */
  label: {
    fontSize: typography.fontSize.body,
    lineHeight: typography.lineHeight.body,
    color: colors.textPrimary,
    fontWeight: 600 as const,
    fontFamily: typography.fontFamily,
    margin: 0,
    display: 'inline',
  },

  /** Primary CTA button - Attio-style dark, prominent */
  button: {
    display: 'inline-block',
    backgroundColor: colors.brandButton,
    color: '#ffffff',
    fontWeight: 500,
    fontSize: '16px',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    margin: '24px 0',
    fontFamily: typography.fontFamily,
  },

  /** Link text style - Golden accent like Attio */
  link: {
    color: colors.linkColor,
    fontWeight: 500 as const,
    textDecoration: 'underline',
  },

  /** Horizontal divider - More subtle */
  divider: {
    borderTop: `1px solid ${colors.divider}`,
    margin: `32px 0`,
  },

  /** Footer container - Attio-style minimal */
  footer: {
    maxWidth: `${spacing.containerWidth}px`,
    margin: '0 auto',
    padding: `48px ${spacing.gutter}px`,
    textAlign: 'center' as const,
  },

  /** Footer text style - Subtle and minimal */
  footerText: {
    fontSize: typography.fontSize.caption,
    lineHeight: typography.lineHeight.caption,
    color: colors.textMuted,
    fontFamily: typography.fontFamily,
    margin: '0 0 8px 0',
  },

  /** Code/OTP container - Clean design */
  codeContainer: {
    margin: '24px 0',
    padding: '16px 20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: 'none',
    textAlign: 'center' as const,
  },

  /** Code/OTP text */
  code: {
    fontSize: '28px',
    fontWeight: 600 as const,
    letterSpacing: '4px',
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    margin: 0,
  },

  /** Code block text (for JSON/code display) */
  codeBlock: {
    fontSize: typography.fontSize.caption,
    lineHeight: typography.lineHeight.caption,
    color: colors.textSecondary,
    fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
    whiteSpace: 'pre-wrap' as const,
    wordWrap: 'break-word' as const,
    margin: 0,
  },

  /** Highlighted info box - Attio-style subtle */
  infoBox: {
    backgroundColor: '#f9fafb',
    padding: '20px 24px',
    borderRadius: '8px',
    margin: '24px 0',
    border: 'none',
  },

  /** Info box title */
  infoBoxTitle: {
    fontSize: typography.fontSize.body,
    lineHeight: typography.lineHeight.body,
    fontWeight: 600,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    margin: '0 0 12px 0',
  },

  /** Info box list content */
  infoBoxList: {
    fontSize: typography.fontSize.body,
    lineHeight: '1.7',
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    margin: 0,
  },

  /** Section borders - hidden for Attio-style */
  sectionsBorders: {
    width: '100%',
    display: 'none',
  },

  sectionBorder: {
    borderBottom: 'none',
    width: '0',
  },

  sectionCenter: {
    borderBottom: 'none',
    width: '0',
  },

  /** Spacer row for vertical spacing in tables */
  spacer: {
    border: 0,
    margin: 0,
    padding: 0,
    fontSize: '1px',
    lineHeight: '1px',
  },

  /** Gutter cell for horizontal padding in tables */
  gutter: {
    border: 0,
    margin: 0,
    padding: 0,
    fontSize: '1px',
    lineHeight: '1px',
    width: `${spacing.gutter}px`,
  },

  /** Info row (e.g., Platform, Device location, Time) */
  infoRow: {
    fontSize: typography.fontSize.body,
    lineHeight: typography.lineHeight.body,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    margin: '12px 0',
  },

  /** Hero image container - Attio-style centered illustration */
  hero: {
    textAlign: 'center' as const,
    margin: `0 auto ${spacing.heroMargin}px auto`,
    padding: '0 20px',
  },

  /** Heading text - Larger for emphasis */
  heading: {
    fontSize: typography.fontSize.heading,
    lineHeight: typography.lineHeight.heading,
    fontWeight: 600,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    margin: '0 0 16px 0',
  },

  /** Secondary button - Outlined style */
  buttonSecondary: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: colors.textPrimary,
    fontWeight: 500,
    fontSize: '14px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: `1px solid ${colors.divider}`,
    textDecoration: 'none',
    textAlign: 'center' as const,
    margin: '8px 0',
    fontFamily: typography.fontFamily,
  },
}

/**
 * Attio-inspired email styles
 * Clean, minimal design with focus on whitespace and typography
 */

import { colors, spacing, typography } from './base'

/** Attio-specific color palette */
export const attioColors = {
  /** Primary button background - dark, prominent */
  buttonPrimary: '#1a1a1a',
  /** Link color - warm golden accent */
  link: '#d97706',
  /** Link hover - slightly darker */
  linkHover: '#b45309',
  /** Success state */
  success: '#059669',
  /** Warning state */
  warning: '#d97706',
  /** Error state */
  error: '#dc2626',
  /** Info state */
  info: '#2563eb',
  /** Subtle background for cards/boxes */
  bgSubtle: '#f9fafb',
  /** Border for subtle elements */
  borderSubtle: '#e5e7eb',
}

/** Attio-specific typography styles */
export const attioTypography = {
  /** Greeting text style */
  greeting: {
    fontSize: '16px',
    lineHeight: '26px',
    color: colors.textSecondary,
    fontWeight: 400,
    fontFamily: typography.fontFamily,
    margin: '0 0 20px 0',
  },
  /** Emphasis text - slightly bolder */
  emphasis: {
    fontSize: '16px',
    lineHeight: '26px',
    color: colors.textPrimary,
    fontWeight: 500,
    fontFamily: typography.fontFamily,
    margin: '0 0 20px 0',
  },
  /** Small meta text */
  meta: {
    fontSize: '13px',
    lineHeight: '20px',
    color: colors.textMuted,
    fontWeight: 400,
    fontFamily: typography.fontFamily,
    margin: '0',
  },
}

/** Attio-style component styles */
export const attioStyles = {
  /** Primary CTA button - Dark, prominent like Attio */
  button: {
    display: 'inline-block',
    backgroundColor: attioColors.buttonPrimary,
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

  /** Secondary button - Ghost/outlined */
  buttonSecondary: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: colors.textPrimary,
    fontWeight: 500,
    fontSize: '14px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: `1px solid ${attioColors.borderSubtle}`,
    textDecoration: 'none',
    textAlign: 'center' as const,
    margin: '8px 0',
    fontFamily: typography.fontFamily,
  },

  /** Paragraph with Attio spacing */
  paragraph: {
    fontSize: '16px',
    lineHeight: '26px',
    color: colors.textSecondary,
    fontWeight: 400,
    fontFamily: typography.fontFamily,
    margin: '0 0 20px 0',
  },

  /** Link style - Golden underline */
  link: {
    color: attioColors.link,
    fontWeight: 500,
    textDecoration: 'underline',
  },

  /** Hero illustration container */
  heroContainer: {
    textAlign: 'center' as const,
    margin: '0 auto 32px auto',
    padding: '0 24px',
  },

  /** Hero image style */
  heroImage: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    height: 'auto',
  },

  /** Content container with more padding */
  container: {
    maxWidth: `${spacing.containerWidth}px`,
    margin: '0 auto',
    padding: '48px 48px',
  },

  /** Header with centered logo */
  header: {
    textAlign: 'center' as const,
    padding: '40px 0 24px 0',
  },

  /** Footer - minimal and centered */
  footer: {
    textAlign: 'center' as const,
    padding: '48px 48px',
    borderTop: `1px solid ${attioColors.borderSubtle}`,
    marginTop: '32px',
  },

  /** Divider - very subtle */
  divider: {
    borderTop: `1px solid ${attioColors.borderSubtle}`,
    margin: '32px 0',
  },

  /** Info card - subtle background */
  infoCard: {
    backgroundColor: attioColors.bgSubtle,
    padding: '20px 24px',
    borderRadius: '8px',
    margin: '24px 0',
  },

  /** Success badge */
  badgeSuccess: {
    display: 'inline-block',
    backgroundColor: '#d1fae5',
    color: attioColors.success,
    fontSize: '13px',
    fontWeight: 500,
    padding: '4px 12px',
    borderRadius: '4px',
  },

  /** Warning badge */
  badgeWarning: {
    display: 'inline-block',
    backgroundColor: '#fef3c7',
    color: attioColors.warning,
    fontSize: '13px',
    fontWeight: 500,
    padding: '4px 12px',
    borderRadius: '4px',
  },

  /** Error badge */
  badgeError: {
    display: 'inline-block',
    backgroundColor: '#fee2e2',
    color: attioColors.error,
    fontSize: '13px',
    fontWeight: 500,
    padding: '4px 12px',
    borderRadius: '4px',
  },

  /** List item with bullet */
  listItem: {
    fontSize: '16px',
    lineHeight: '26px',
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    margin: '0 0 8px 0',
    paddingLeft: '20px',
  },

  /** Stat/metric display */
  stat: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 600,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    margin: '0',
  },

  /** Stat label */
  statLabel: {
    fontSize: '13px',
    lineHeight: '20px',
    color: colors.textMuted,
    fontWeight: 400,
    fontFamily: typography.fontFamily,
    margin: '4px 0 0 0',
  },
}

export default attioStyles

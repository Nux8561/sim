import { Container, Link, Section, Text } from '@react-email/components'
import { baseStyles, colors, spacing, typography } from '@/components/emails/_styles'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface UnsubscribeOptions {
  unsubscribeToken?: string
  email?: string
}

interface EmailFooterProps {
  baseUrl?: string
  unsubscribe?: UnsubscribeOptions
  messageId?: string
}

/**
 * Email footer component - Attio-inspired minimal design.
 * Clean, centered, with essential links only.
 */
export function EmailFooter({ baseUrl = getBaseUrl(), unsubscribe, messageId }: EmailFooterProps) {
  const brand = getBrandConfig()

  const footerLinkStyle = {
    color: colors.textMuted,
    textDecoration: 'underline',
    fontWeight: 400 as const,
    fontFamily: typography.fontFamily,
    fontSize: '13px',
  }

  const footerTextStyle = {
    ...baseStyles.footerText,
    textAlign: 'center' as const,
  }

  return (
    <Section
      style={{
        backgroundColor: 'transparent',
        width: '100%',
        borderTop: `1px solid ${colors.divider}`,
        marginTop: '32px',
      }}
    >
      <Container
        style={{
          maxWidth: `${spacing.containerWidth}px`,
          margin: '0 auto',
          padding: '40px 48px',
        }}
      >
        {/* Company name */}
        <Text style={footerTextStyle}>{brand.name}</Text>

        {/* Contact - minimal */}
        <Text style={{ ...footerTextStyle, marginTop: '8px' }}>
          Questions?{' '}
          <Link href={`mailto:${brand.supportEmail}`} style={footerLinkStyle}>
            {brand.supportEmail}
          </Link>
        </Text>

        {/* Message ID - optional */}
        {messageId && (
          <Text style={{ ...footerTextStyle, marginTop: '8px', fontSize: '12px' }}>
            Reference: {messageId}
          </Text>
        )}

        {/* Links row - minimal separator */}
        <Text style={{ ...footerTextStyle, marginTop: '16px' }}>
          <Link href={`${baseUrl}/privacy`} style={footerLinkStyle} rel="noopener noreferrer">
            Privacy
          </Link>
          {'  ·  '}
          <Link href={`${baseUrl}/terms`} style={footerLinkStyle} rel="noopener noreferrer">
            Terms
          </Link>
          {'  ·  '}
          <Link
            href={
              unsubscribe?.unsubscribeToken && unsubscribe?.email
                ? `${baseUrl}/unsubscribe?token=${unsubscribe.unsubscribeToken}&email=${encodeURIComponent(unsubscribe.email)}`
                : `mailto:${brand.supportEmail}?subject=Unsubscribe%20Request&body=Please%20unsubscribe%20me%20from%20all%20emails.`
            }
            style={footerLinkStyle}
            rel="noopener noreferrer"
          >
            Unsubscribe
          </Link>
        </Text>

        {/* Copyright - subtle */}
        <Text
          style={{
            ...footerTextStyle,
            marginTop: '24px',
            fontSize: '12px',
            color: '#d1d5db',
          }}
        >
          © {new Date().getFullYear()} {brand.name}
        </Text>
      </Container>
    </Section>
  )
}

export default EmailFooter

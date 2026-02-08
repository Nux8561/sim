import { Link, Text } from '@react-email/components'
import { baseStyles, attioStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface WelcomeEmailProps {
  userName?: string
  loginUrl?: string
  videoDemoUrl?: string
}

/**
 * Welcome email - Attio-style onboarding Day 0.
 * Sent immediately after user signs up.
 */
export function WelcomeEmail({
  userName,
  loginUrl,
  videoDemoUrl = 'https://introflow.ai/demo',
}: WelcomeEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()
  const cta = loginUrl || `${baseUrl}/login`

  const previewText = `Willkommen bei ${brand.name}!`

  return (
    <EmailLayout
      preview={previewText}
      heroImage={`${baseUrl}/email-assets/welcome-illustration.svg`}
      heroAlt="Willkommen"
    >
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Hi {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Thanks for checking out <strong>{brand.name}</strong>!
      </Text>

      <Text style={baseStyles.paragraph}>
        Here's a{' '}
        <Link href={videoDemoUrl} style={baseStyles.link}>
          quick video demo
        </Link>{' '}
        that walks you through {brand.name}'s top features and how easy it is to get started.
      </Text>

      <Link href={cta} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Create your account</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Questions? Just reply to this email - we read every message.
      </Text>
    </EmailLayout>
  )
}

export default WelcomeEmail

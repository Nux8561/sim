import { Link, Section, Text } from '@react-email/components'
import { baseStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface Day4IntegrationEmailProps {
  userName?: string
  gmailConnected?: boolean
  calendarConnected?: boolean
}

/**
 * Day 4 onboarding email - Integration setup.
 * Sent 3 days after signup.
 */
export function Day4IntegrationEmail({
  userName,
  gmailConnected = false,
  calendarConnected = false,
}: Day4IntegrationEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()

  const previewText = `Verbinde ${brand.name} mit deinen wichtigsten Tools`

  return (
    <EmailLayout
      preview={previewText}
      heroImage={`${baseUrl}/email-assets/integration-illustration.svg`}
      heroAlt="Integrationen"
    >
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Hi {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Die Kraft von {brand.name} entfaltet sich erst richtig, wenn du deine wichtigsten Tools
        verbindest. Das dauert nur 2 Minuten.
      </Text>

      {/* Gmail Integration */}
      <Section
        style={{
          ...baseStyles.infoBox,
          borderLeft: gmailConnected ? '3px solid #10b981' : '3px solid #d97706',
        }}
      >
        <Text style={baseStyles.infoBoxTitle}>
          {gmailConnected ? '✓ ' : ''}Gmail verbinden
        </Text>
        <Text style={baseStyles.infoBoxList}>
          E-Mails automatisch zu Leads zuordnen. Verfolge Öffnungen und Antworten.
        </Text>
        {!gmailConnected && (
          <Link href={`${baseUrl}/settings/integrations/gmail`} style={baseStyles.link}>
            Gmail verbinden →
          </Link>
        )}
      </Section>

      {/* Calendar Integration */}
      <Section
        style={{
          ...baseStyles.infoBox,
          borderLeft: calendarConnected ? '3px solid #10b981' : '3px solid #d97706',
        }}
      >
        <Text style={baseStyles.infoBoxTitle}>
          {calendarConnected ? '✓ ' : ''}Kalender synchronisieren
        </Text>
        <Text style={baseStyles.infoBoxList}>
          Meetings automatisch als Aktivitäten loggen. Erinnerungen vor wichtigen Calls.
        </Text>
        {!calendarConnected && (
          <Link href={`${baseUrl}/settings/integrations/calendar`} style={baseStyles.link}>
            Kalender verbinden →
          </Link>
        )}
      </Section>

      {/* More Integrations */}
      <Section style={baseStyles.infoBox}>
        <Text style={baseStyles.infoBoxTitle}>Weitere Integrationen</Text>
        <Text style={baseStyles.infoBoxList}>
          LinkedIn, Slack, Zapier und 50+ weitere Tools. Automatisiere deinen gesamten Workflow.
        </Text>
        <Link href={`${baseUrl}/marketplace`} style={baseStyles.link}>
          Alle Integrationen →
        </Link>
      </Section>

      <Link href={`${baseUrl}/settings/integrations`} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Integrationen einrichten</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Brauchst du Hilfe? Antworte einfach auf diese E-Mail.
      </Text>
    </EmailLayout>
  )
}

export default Day4IntegrationEmail

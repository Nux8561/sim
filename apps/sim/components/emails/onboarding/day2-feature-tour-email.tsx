import { Link, Section, Text } from '@react-email/components'
import { baseStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface Day2FeatureTourEmailProps {
  userName?: string
  pipelineUrl?: string
  contactsUrl?: string
  dashboardUrl?: string
}

/**
 * Day 2 onboarding email - Feature tour overview.
 * Sent 1 day after signup.
 */
export function Day2FeatureTourEmail({
  userName,
  pipelineUrl,
  contactsUrl,
  dashboardUrl,
}: Day2FeatureTourEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()
  const pipeline = pipelineUrl || `${baseUrl}/pipeline`
  const contacts = contactsUrl || `${baseUrl}/contacts`
  const dashboard = dashboardUrl || `${baseUrl}/dashboard`

  const previewText = `Entdecke die wichtigsten Features von ${brand.name}`

  return (
    <EmailLayout
      preview={previewText}
      heroImage={`${baseUrl}/email-assets/feature-tour-illustration.svg`}
      heroAlt="Feature Tour"
    >
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Hi {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Du hast jetzt einen Tag mit {brand.name} verbracht. Lass uns die drei wichtigsten Bereiche
        erkunden:
      </Text>

      {/* Feature Cards */}
      <Section style={baseStyles.infoBox}>
        <Text style={baseStyles.infoBoxTitle}>1. Pipeline</Text>
        <Text style={baseStyles.infoBoxList}>
          Visualisiere deine Deals in Kanban-Ansicht. Drag & Drop, um Deals zwischen Stages zu
          verschieben.
        </Text>
        <Link href={pipeline} style={baseStyles.link}>
          Pipeline öffnen →
        </Link>
      </Section>

      <Section style={baseStyles.infoBox}>
        <Text style={baseStyles.infoBoxTitle}>2. Contacts</Text>
        <Text style={baseStyles.infoBoxList}>
          Alle deine Leads und Kontakte an einem Ort. Mit Timeline, Notes und Tags.
        </Text>
        <Link href={contacts} style={baseStyles.link}>
          Contacts öffnen →
        </Link>
      </Section>

      <Section style={baseStyles.infoBox}>
        <Text style={baseStyles.infoBoxTitle}>3. Dashboard</Text>
        <Text style={baseStyles.infoBoxList}>
          Dein persönliches Cockpit mit KPIs, Tasks und den wichtigsten Metriken.
        </Text>
        <Link href={dashboard} style={baseStyles.link}>
          Dashboard öffnen →
        </Link>
      </Section>

      <Link href={`${baseUrl}/login`} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Jetzt starten</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Morgen zeigen wir dir, wie du deine erste Integration einrichtest.
      </Text>
    </EmailLayout>
  )
}

export default Day2FeatureTourEmail

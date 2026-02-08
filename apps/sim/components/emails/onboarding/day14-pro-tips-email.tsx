import { Link, Section, Text } from '@react-email/components'
import { baseStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface Day14ProTipsEmailProps {
  userName?: string
  workflowsUrl?: string
  automationsUrl?: string
  analyticsUrl?: string
}

/**
 * Day 14 onboarding email - Pro tips and advanced features.
 * Sent 13 days after signup.
 */
export function Day14ProTipsEmail({
  userName,
  workflowsUrl,
  automationsUrl,
  analyticsUrl,
}: Day14ProTipsEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()
  const workflows = workflowsUrl || `${baseUrl}/workflows`
  const automations = automationsUrl || `${baseUrl}/automations`
  const analytics = analyticsUrl || `${baseUrl}/analytics`

  const previewText = `Pro-Tipps für ${brand.name} - Automatisiere deinen Sales`

  return (
    <EmailLayout preview={previewText}>
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Hi {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Zwei Wochen mit {brand.name}! Zeit für die Profi-Features. Diese drei Tipps nutzen unsere
        erfolgreichsten Teams:
      </Text>

      {/* Pro Tip 1: Workflows */}
      <Section
        style={{
          ...baseStyles.infoBox,
          borderLeft: '3px solid #8b5cf6',
        }}
      >
        <Text style={baseStyles.infoBoxTitle}>🚀 Tipp 1: Workflows automatisieren</Text>
        <Text style={baseStyles.infoBoxList}>
          Erstelle automatisierte Workflows für wiederkehrende Aufgaben. Beispiel: Automatische
          Follow-up E-Mail 3 Tage nach einem Call.
        </Text>
        <Link href={workflows} style={baseStyles.link}>
          Workflow erstellen →
        </Link>
      </Section>

      {/* Pro Tip 2: Lead Scoring */}
      <Section
        style={{
          ...baseStyles.infoBox,
          borderLeft: '3px solid #10b981',
        }}
      >
        <Text style={baseStyles.infoBoxTitle}>📊 Tipp 2: Lead Scoring nutzen</Text>
        <Text style={baseStyles.infoBoxList}>
          Lass AI deine Leads nach Kaufwahrscheinlichkeit bewerten. Fokussiere dich auf die heißen
          Leads.
        </Text>
        <Link href={`${baseUrl}/settings/lead-scoring`} style={baseStyles.link}>
          Lead Scoring einrichten →
        </Link>
      </Section>

      {/* Pro Tip 3: Email Templates */}
      <Section
        style={{
          ...baseStyles.infoBox,
          borderLeft: '3px solid #2563eb',
        }}
      >
        <Text style={baseStyles.infoBoxTitle}>✉️ Tipp 3: E-Mail Templates</Text>
        <Text style={baseStyles.infoBoxList}>
          Speichere deine besten E-Mails als Templates. Nutze Variablen wie {'{{lead.name}}'} für
          personalisierte Massen-E-Mails.
        </Text>
        <Link href={`${baseUrl}/settings/templates`} style={baseStyles.link}>
          Templates erstellen →
        </Link>
      </Section>

      {/* Pro Tip 4: Analytics */}
      <Section
        style={{
          ...baseStyles.infoBox,
          borderLeft: '3px solid #d97706',
        }}
      >
        <Text style={baseStyles.infoBoxTitle}>📈 Tipp 4: Analytics Dashboard</Text>
        <Text style={baseStyles.infoBoxList}>
          Verstehe deine Pipeline-Performance. Welche Stage hat die längste Verweildauer? Wo
          verlierst du Deals?
        </Text>
        <Link href={analytics} style={baseStyles.link}>
          Analytics öffnen →
        </Link>
      </Section>

      <Link href={`${baseUrl}/login`} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Jetzt ausprobieren</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={baseStyles.paragraph}>
        <strong>Bereit für mehr?</strong> Schau dir unsere{' '}
        <Link href={`${baseUrl}/docs`} style={baseStyles.link}>
          Dokumentation
        </Link>{' '}
        an oder{' '}
        <Link href={`${baseUrl}/team`} style={baseStyles.link}>
          buche einen Call
        </Link>{' '}
        mit unserem Team.
      </Text>

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Das war die letzte E-Mail unserer Onboarding-Sequenz. Du erhältst jetzt nur noch wichtige
        Produkt-Updates.
      </Text>
    </EmailLayout>
  )
}

export default Day14ProTipsEmail

import { Link, Section, Text } from '@react-email/components'
import { baseStyles, colors, attioStyles } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface Day7CheckinEmailProps {
  userName?: string
  leadsCreated?: number
  dealsCreated?: number
  callsMade?: number
  scheduleCallUrl?: string
}

/**
 * Day 7 onboarding email - Week 1 check-in.
 * Sent 6 days after signup.
 */
export function Day7CheckinEmail({
  userName,
  leadsCreated = 0,
  dealsCreated = 0,
  callsMade = 0,
  scheduleCallUrl,
}: Day7CheckinEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()
  const callUrl = scheduleCallUrl || `${baseUrl}/team`

  const previewText = `Deine erste Woche mit ${brand.name} - Check-in`

  const hasActivity = leadsCreated > 0 || dealsCreated > 0 || callsMade > 0

  return (
    <EmailLayout preview={previewText}>
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Hi {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Eine Woche mit {brand.name} liegt hinter dir! Hier ist dein Fortschritt:
      </Text>

      {/* Stats Section */}
      <Section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '24px 0',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  width: '33%',
                }}
              >
                <Text style={attioStyles.stat}>{leadsCreated}</Text>
                <Text style={attioStyles.statLabel}>Leads</Text>
              </td>
              <td style={{ width: '8px' }}></td>
              <td
                style={{
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  width: '33%',
                }}
              >
                <Text style={attioStyles.stat}>{dealsCreated}</Text>
                <Text style={attioStyles.statLabel}>Deals</Text>
              </td>
              <td style={{ width: '8px' }}></td>
              <td
                style={{
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  width: '33%',
                }}
              >
                <Text style={attioStyles.stat}>{callsMade}</Text>
                <Text style={attioStyles.statLabel}>Calls</Text>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      {hasActivity ? (
        <Text style={baseStyles.paragraph}>
          Starker Start! Du nutzt {brand.name} bereits aktiv. Hast du Fragen oder Feedback?
        </Text>
      ) : (
        <Text style={baseStyles.paragraph}>
          Noch keine Aktivität? Kein Problem! Manchmal braucht der Start etwas Zeit. Wir helfen dir
          gerne dabei, das Beste aus {brand.name} herauszuholen.
        </Text>
      )}

      {/* Support Options */}
      <Section style={baseStyles.infoBox}>
        <Text style={baseStyles.infoBoxTitle}>Wie können wir dir helfen?</Text>
        <Text style={{ ...baseStyles.infoBoxList, marginBottom: '8px' }}>
          • <strong>1:1 Onboarding Call</strong> - 15 Min. Setup-Hilfe
        </Text>
        <Text style={{ ...baseStyles.infoBoxList, marginBottom: '8px' }}>
          • <strong>Live Demo</strong> - Wir zeigen dir Best Practices
        </Text>
        <Text style={baseStyles.infoBoxList}>
          • <strong>Support Chat</strong> - Schnelle Antworten auf deine Fragen
        </Text>
      </Section>

      <Link href={callUrl} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Call buchen</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        In einer Woche zeigen wir dir die erweiterten Features und Automatisierungen.
      </Text>
    </EmailLayout>
  )
}

export default Day7CheckinEmail

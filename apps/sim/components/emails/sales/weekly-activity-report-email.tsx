import { Link, Section, Text } from '@react-email/components'
import { baseStyles, attioStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface WeeklyActivityReportEmailProps {
  userName?: string
  weekNumber: number
  stats: {
    leadsCreated: number
    leadsContacted: number
    callsMade: number
    emailsSent: number
    meetingsScheduled: number
    dealsCreated: number
    dealsWon: number
    dealsLost: number
    revenueWon: number
  }
  comparison?: {
    leadsCreatedChange: number
    callsChange: number
    dealsWonChange: number
  }
  topPerformingLead?: {
    name: string
    company?: string
    score: number
  }
}

/**
 * Weekly activity report email.
 * Sent every Monday morning with the previous week's summary.
 */
export function WeeklyActivityReportEmail({
  userName,
  weekNumber,
  stats,
  comparison,
  topPerformingLead,
}: WeeklyActivityReportEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()

  const previewText = `Woche ${weekNumber}: ${stats.callsMade} Calls, ${stats.dealsWon} Deals gewonnen`

  const formatChange = (change: number) => {
    if (change > 0) return `+${change}%`
    if (change < 0) return `${change}%`
    return '±0%'
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return '#10b981'
    if (change < 0) return '#ef4444'
    return colors.textMuted
  }

  return (
    <EmailLayout preview={previewText}>
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Hi {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Hier ist dein Weekly Report für <strong>KW {weekNumber}</strong>:
      </Text>

      {/* Main Stats Grid */}
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '8px' }}>
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center' as const,
                width: '50%',
              }}
            >
              <Text style={attioStyles.stat}>{stats.callsMade}</Text>
              <Text style={attioStyles.statLabel}>Calls</Text>
              {comparison && (
                <Text
                  style={{
                    ...attioStyles.statLabel,
                    color: getChangeColor(comparison.callsChange),
                    marginTop: '4px',
                  }}
                >
                  {formatChange(comparison.callsChange)} vs. Vorwoche
                </Text>
              )}
            </td>
            <td
              style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center' as const,
                width: '50%',
              }}
            >
              <Text style={attioStyles.stat}>{stats.emailsSent}</Text>
              <Text style={attioStyles.statLabel}>E-Mails</Text>
            </td>
          </tr>
          <tr>
            <td
              style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center' as const,
              }}
            >
              <Text style={attioStyles.stat}>{stats.leadsCreated}</Text>
              <Text style={attioStyles.statLabel}>Neue Leads</Text>
              {comparison && (
                <Text
                  style={{
                    ...attioStyles.statLabel,
                    color: getChangeColor(comparison.leadsCreatedChange),
                    marginTop: '4px',
                  }}
                >
                  {formatChange(comparison.leadsCreatedChange)}
                </Text>
              )}
            </td>
            <td
              style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center' as const,
              }}
            >
              <Text style={attioStyles.stat}>{stats.meetingsScheduled}</Text>
              <Text style={attioStyles.statLabel}>Meetings</Text>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Deals Section */}
      <Section
        style={{
          marginTop: '24px',
          borderTop: `1px solid ${colors.divider}`,
          paddingTop: '24px',
        }}
      >
        <Text style={baseStyles.infoBoxTitle}>Pipeline Performance</Text>

        <table style={{ width: '100%', marginTop: '12px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <Text style={{ ...baseStyles.paragraph, margin: 0 }}>Deals erstellt</Text>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Text style={{ ...baseStyles.paragraph, margin: 0, fontWeight: 600 }}>
                  {stats.dealsCreated}
                </Text>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <Text style={{ ...baseStyles.paragraph, margin: 0, color: '#10b981' }}>
                  ✓ Deals gewonnen
                </Text>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Text style={{ ...baseStyles.paragraph, margin: 0, fontWeight: 600 }}>
                  {stats.dealsWon}
                  {comparison && (
                    <span style={{ color: getChangeColor(comparison.dealsWonChange), marginLeft: '8px' }}>
                      ({formatChange(comparison.dealsWonChange)})
                    </span>
                  )}
                </Text>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <Text style={{ ...baseStyles.paragraph, margin: 0, color: '#ef4444' }}>
                  ✗ Deals verloren
                </Text>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Text style={{ ...baseStyles.paragraph, margin: 0, fontWeight: 600 }}>
                  {stats.dealsLost}
                </Text>
              </td>
            </tr>
            {stats.revenueWon > 0 && (
              <tr>
                <td
                  style={{
                    padding: '12px 0 8px 0',
                    borderTop: `1px solid ${colors.divider}`,
                  }}
                >
                  <Text style={{ ...baseStyles.paragraph, margin: 0, fontWeight: 600 }}>
                    💰 Umsatz gewonnen
                  </Text>
                </td>
                <td
                  style={{
                    textAlign: 'right',
                    borderTop: `1px solid ${colors.divider}`,
                    padding: '12px 0 8px 0',
                  }}
                >
                  <Text
                    style={{
                      ...baseStyles.paragraph,
                      margin: 0,
                      fontWeight: 600,
                      color: '#10b981',
                    }}
                  >
                    €{stats.revenueWon.toLocaleString('de-DE')}
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* Top Lead */}
      {topPerformingLead && (
        <Section style={{ ...baseStyles.infoBox, borderLeft: '3px solid #10b981' }}>
          <Text style={baseStyles.infoBoxTitle}>🌟 Top Lead der Woche</Text>
          <Text style={baseStyles.infoBoxList}>
            <strong>{topPerformingLead.name}</strong>
            {topPerformingLead.company && ` (${topPerformingLead.company})`} - Lead Score:{' '}
            {topPerformingLead.score}/100
          </Text>
        </Section>
      )}

      <Link href={`${baseUrl}/analytics`} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Vollständige Analytics</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Du erhältst diesen Report jeden Montag.{' '}
        <Link href={`${baseUrl}/settings/notifications`} style={baseStyles.link}>
          Einstellungen ändern
        </Link>
      </Text>
    </EmailLayout>
  )
}

export default WeeklyActivityReportEmail

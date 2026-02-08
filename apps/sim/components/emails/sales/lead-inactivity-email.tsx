import { Link, Section, Text } from '@react-email/components'
import { baseStyles, attioStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface LeadInactivityEmailProps {
  userName?: string
  leads: Array<{
    id: string
    name: string
    company?: string
    lastContactDays: number
    leadUrl: string
  }>
}

/**
 * Lead inactivity reminder email.
 * Sent daily for leads without contact in 7+ days.
 */
export function LeadInactivityEmail({ userName, leads }: LeadInactivityEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()

  const previewText = `${leads.length} Lead${leads.length > 1 ? 's' : ''} warten auf dein Follow-up`

  return (
    <EmailLayout
      preview={previewText}
      heroImage={`${baseUrl}/email-assets/reminder-illustration.svg`}
      heroAlt="Erinnerung"
    >
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Hi {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Diese Leads haben seit über einer Woche nichts von dir gehört. Ein kurzes Follow-up kann den
        Unterschied machen:
      </Text>

      {/* Lead List */}
      {leads.slice(0, 5).map((lead, index) => (
        <Section
          key={lead.id}
          style={{
            ...baseStyles.infoBox,
            borderLeft: lead.lastContactDays > 14 ? '3px solid #ef4444' : '3px solid #d97706',
            marginBottom: '12px',
          }}
        >
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>
                  <Text
                    style={{
                      ...baseStyles.infoBoxTitle,
                      marginBottom: '4px',
                    }}
                  >
                    {lead.name}
                  </Text>
                  {lead.company && (
                    <Text
                      style={{
                        ...baseStyles.footerText,
                        textAlign: 'left',
                        margin: 0,
                      }}
                    >
                      {lead.company}
                    </Text>
                  )}
                </td>
                <td style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  <Text
                    style={{
                      ...attioStyles.badgeWarning,
                      ...(lead.lastContactDays > 14 ? attioStyles.badgeError : {}),
                    }}
                  >
                    {lead.lastContactDays} Tage
                  </Text>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ paddingTop: '8px' }}>
                  <Link href={lead.leadUrl} style={baseStyles.link}>
                    Lead öffnen →
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
      ))}

      {leads.length > 5 && (
        <Text style={{ ...baseStyles.footerText, textAlign: 'center' as const }}>
          + {leads.length - 5} weitere Leads
        </Text>
      )}

      <Link href={`${baseUrl}/contacts?filter=inactive`} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Alle inaktiven Leads anzeigen</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Tipp: Leads mit 14+ Tagen ohne Kontakt haben eine 50% geringere Conversion-Rate.
      </Text>
    </EmailLayout>
  )
}

export default LeadInactivityEmail

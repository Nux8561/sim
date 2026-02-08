import { Link, Section, Text } from '@react-email/components'
import { baseStyles, attioStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface DealWonEmailProps {
  userName?: string
  dealName: string
  company?: string
  value?: number
  daysInPipeline: number
  ownerName?: string
  dealUrl: string
}

/**
 * Deal won celebration email.
 * Sent immediately when a deal is marked as won.
 */
export function DealWonEmail({
  userName,
  dealName,
  company,
  value,
  daysInPipeline,
  ownerName,
  dealUrl,
}: DealWonEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()

  const previewText = value
    ? `🎉 Deal gewonnen: ${dealName} - €${value.toLocaleString('de-DE')}`
    : `🎉 Deal gewonnen: ${dealName}`

  return (
    <EmailLayout
      preview={previewText}
      heroImage={`${baseUrl}/email-assets/success-illustration.svg`}
      heroAlt="Erfolg!"
    >
      <Text
        style={{
          ...baseStyles.heading,
          textAlign: 'center' as const,
          marginTop: 0,
        }}
      >
        🎉 Glückwunsch!
      </Text>

      <Text style={{ ...baseStyles.paragraph, textAlign: 'center' as const }}>
        {userName ? `${userName}, du hast` : 'Du hast'} gerade einen Deal abgeschlossen!
      </Text>

      {/* Deal Card */}
      <Section
        style={{
          backgroundColor: '#ecfdf5',
          border: '2px solid #10b981',
          borderRadius: '12px',
          padding: '24px',
          margin: '24px 0',
          textAlign: 'center' as const,
        }}
      >
        <Text
          style={{
            ...baseStyles.infoBoxTitle,
            fontSize: '20px',
            color: '#065f46',
            marginBottom: '8px',
          }}
        >
          {dealName}
        </Text>

        {company && (
          <Text
            style={{
              ...baseStyles.paragraph,
              color: '#047857',
              margin: '0 0 16px 0',
            }}
          >
            {company}
          </Text>
        )}

        {value && (
          <Text
            style={{
              ...attioStyles.stat,
              color: '#059669',
              fontSize: '36px',
              margin: '8px 0',
            }}
          >
            €{value.toLocaleString('de-DE')}
          </Text>
        )}

        <table
          style={{
            width: '100%',
            marginTop: '16px',
            borderTop: '1px solid #a7f3d0',
            paddingTop: '16px',
          }}
        >
          <tbody>
            <tr>
              <td style={{ textAlign: 'center' }}>
                <Text style={{ ...attioStyles.stat, fontSize: '24px', color: '#047857' }}>
                  {daysInPipeline}
                </Text>
                <Text style={{ ...attioStyles.statLabel, color: '#065f46' }}>
                  Tage in Pipeline
                </Text>
              </td>
              {ownerName && (
                <td style={{ textAlign: 'center' }}>
                  <Text style={{ ...baseStyles.paragraph, fontWeight: 600, color: '#047857', margin: 0 }}>
                    {ownerName}
                  </Text>
                  <Text style={{ ...attioStyles.statLabel, color: '#065f46' }}>
                    Deal Owner
                  </Text>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </Section>

      <Link href={dealUrl} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Deal ansehen</Text>
      </Link>

      {/* Next Steps */}
      <Section style={{ marginTop: '32px' }}>
        <Text style={baseStyles.infoBoxTitle}>Nächste Schritte</Text>
        <Text style={baseStyles.infoBoxList}>
          • Onboarding-Prozess für den Kunden starten
          <br />• Handover an das Customer Success Team
          <br />• Follow-up E-Mail mit nächsten Schritten senden
        </Text>
      </Section>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Dieser Deal wird jetzt in deinen KPIs und Reports berücksichtigt.
      </Text>
    </EmailLayout>
  )
}

export default DealWonEmail

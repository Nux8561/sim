import { Link, Section, Text } from '@react-email/components'
import { baseStyles, attioStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface DealStageReminderEmailProps {
  userName?: string
  deals: Array<{
    id: string
    name: string
    company?: string
    stageName: string
    daysInStage: number
    value?: number
    dealUrl: string
  }>
}

/**
 * Deal stage reminder email.
 * Sent when deals are stuck in a stage for too long.
 */
export function DealStageReminderEmail({ userName, deals }: DealStageReminderEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()

  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0)
  const previewText = `${deals.length} Deal${deals.length > 1 ? 's' : ''} brauchen Aufmerksamkeit`

  return (
    <EmailLayout preview={previewText}>
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Hi {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Diese Deals sind länger als üblich in ihrer aktuellen Stage. Zeit für den nächsten Schritt:
      </Text>

      {/* Summary Stats */}
      <Section
        style={{
          backgroundColor: '#fef3c7',
          padding: '16px 20px',
          borderRadius: '8px',
          marginBottom: '24px',
          textAlign: 'center' as const,
        }}
      >
        <Text style={{ ...attioStyles.stat, color: '#d97706' }}>
          {totalValue > 0 ? `€${totalValue.toLocaleString('de-DE')}` : `${deals.length} Deals`}
        </Text>
        <Text style={{ ...attioStyles.statLabel, color: '#92400e' }}>
          Potential Value at Risk
        </Text>
      </Section>

      {/* Deal List */}
      {deals.slice(0, 5).map((deal) => (
        <Section
          key={deal.id}
          style={{
            ...baseStyles.infoBox,
            borderLeft:
              deal.daysInStage > 21
                ? '3px solid #ef4444'
                : deal.daysInStage > 14
                  ? '3px solid #d97706'
                  : '3px solid #2563eb',
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
                    {deal.name}
                  </Text>
                  {deal.company && (
                    <Text
                      style={{
                        ...baseStyles.footerText,
                        textAlign: 'left',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {deal.company}
                    </Text>
                  )}
                  <Text
                    style={{
                      ...baseStyles.footerText,
                      textAlign: 'left',
                      margin: 0,
                      color: colors.textTertiary,
                    }}
                  >
                    Stage: {deal.stageName}
                  </Text>
                </td>
                <td style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  {deal.value && (
                    <Text
                      style={{
                        ...baseStyles.infoBoxTitle,
                        marginBottom: '4px',
                      }}
                    >
                      €{deal.value.toLocaleString('de-DE')}
                    </Text>
                  )}
                  <Text
                    style={{
                      ...attioStyles.badgeWarning,
                      ...(deal.daysInStage > 21 ? attioStyles.badgeError : {}),
                    }}
                  >
                    {deal.daysInStage} Tage
                  </Text>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ paddingTop: '8px' }}>
                  <Link href={deal.dealUrl} style={baseStyles.link}>
                    Deal öffnen →
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
      ))}

      {deals.length > 5 && (
        <Text style={{ ...baseStyles.footerText, textAlign: 'center' as const }}>
          + {deals.length - 5} weitere Deals
        </Text>
      )}

      <Link href={`${baseUrl}/pipeline?filter=stuck`} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Pipeline öffnen</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Tipp: Deals, die mehr als 14 Tage in einer Stage verweilen, haben eine 35% höhere
        Verlust-Rate.
      </Text>
    </EmailLayout>
  )
}

export default DealStageReminderEmail

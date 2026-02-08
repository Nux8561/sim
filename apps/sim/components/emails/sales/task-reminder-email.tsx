import { Link, Section, Text } from '@react-email/components'
import { baseStyles, attioStyles, colors } from '@/components/emails/_styles'
import { EmailLayout } from '@/components/emails/components'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface TaskReminderEmailProps {
  userName?: string
  todayTasks: Array<{
    id: string
    title: string
    leadName?: string
    dueTime?: string
    taskUrl: string
  }>
  overdueTasks: Array<{
    id: string
    title: string
    leadName?: string
    daysOverdue: number
    taskUrl: string
  }>
}

/**
 * Daily task reminder email.
 * Sent in the morning with today's tasks and overdue items.
 */
export function TaskReminderEmail({
  userName,
  todayTasks = [],
  overdueTasks = [],
}: TaskReminderEmailProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()

  const totalTasks = todayTasks.length + overdueTasks.length
  const previewText =
    totalTasks > 0
      ? `${totalTasks} Task${totalTasks > 1 ? 's' : ''} für heute`
      : 'Deine tägliche Task-Übersicht'

  return (
    <EmailLayout preview={previewText}>
      <Text style={{ ...baseStyles.paragraph, marginTop: 0 }}>
        Guten Morgen {userName || 'there'},
      </Text>

      <Text style={baseStyles.paragraph}>
        Hier ist deine Task-Übersicht für heute:
      </Text>

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <>
          <Text
            style={{
              ...baseStyles.label,
              display: 'block',
              marginBottom: '12px',
              color: '#ef4444',
            }}
          >
            ⚠️ Überfällig ({overdueTasks.length})
          </Text>

          {overdueTasks.slice(0, 3).map((task) => (
            <Section
              key={task.id}
              style={{
                ...baseStyles.infoBox,
                borderLeft: '3px solid #ef4444',
                marginBottom: '8px',
                padding: '12px 16px',
              }}
            >
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <Text
                        style={{
                          ...baseStyles.paragraph,
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {task.title}
                      </Text>
                      {task.leadName && (
                        <Text
                          style={{
                            ...baseStyles.footerText,
                            textAlign: 'left',
                            margin: '4px 0 0 0',
                          }}
                        >
                          {task.leadName}
                        </Text>
                      )}
                    </td>
                    <td style={{ textAlign: 'right', verticalAlign: 'top' }}>
                      <Text style={attioStyles.badgeError}>{task.daysOverdue}d überfällig</Text>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>
          ))}

          {overdueTasks.length > 3 && (
            <Text
              style={{
                ...baseStyles.footerText,
                textAlign: 'left',
                marginBottom: '16px',
              }}
            >
              + {overdueTasks.length - 3} weitere überfällige Tasks
            </Text>
          )}
        </>
      )}

      {/* Today's Tasks */}
      {todayTasks.length > 0 && (
        <>
          <Text
            style={{
              ...baseStyles.label,
              display: 'block',
              marginBottom: '12px',
              marginTop: overdueTasks.length > 0 ? '24px' : '0',
            }}
          >
            📋 Heute ({todayTasks.length})
          </Text>

          {todayTasks.slice(0, 5).map((task) => (
            <Section
              key={task.id}
              style={{
                ...baseStyles.infoBox,
                borderLeft: '3px solid #2563eb',
                marginBottom: '8px',
                padding: '12px 16px',
              }}
            >
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <Text
                        style={{
                          ...baseStyles.paragraph,
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {task.title}
                      </Text>
                      {task.leadName && (
                        <Text
                          style={{
                            ...baseStyles.footerText,
                            textAlign: 'left',
                            margin: '4px 0 0 0',
                          }}
                        >
                          {task.leadName}
                        </Text>
                      )}
                    </td>
                    {task.dueTime && (
                      <td style={{ textAlign: 'right', verticalAlign: 'top' }}>
                        <Text style={attioStyles.badgeSuccess}>{task.dueTime}</Text>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </Section>
          ))}

          {todayTasks.length > 5 && (
            <Text style={{ ...baseStyles.footerText, textAlign: 'left' }}>
              + {todayTasks.length - 5} weitere Tasks
            </Text>
          )}
        </>
      )}

      {/* No Tasks */}
      {totalTasks === 0 && (
        <Section style={baseStyles.infoBox}>
          <Text style={{ ...baseStyles.paragraph, margin: 0, textAlign: 'center' as const }}>
            🎉 Keine Tasks für heute! Zeit für proaktive Outreach.
          </Text>
        </Section>
      )}

      <Link href={`${baseUrl}/tasks`} style={{ textDecoration: 'none' }}>
        <Text style={baseStyles.button}>Alle Tasks anzeigen</Text>
      </Link>

      {/* Divider */}
      <div style={baseStyles.divider} />

      <Text style={{ ...baseStyles.footerText, textAlign: 'left' as const }}>
        Du erhältst diese E-Mail jeden Morgen um 8:00 Uhr.{' '}
        <Link href={`${baseUrl}/settings/notifications`} style={baseStyles.link}>
          Anpassen
        </Link>
      </Text>
    </EmailLayout>
  )
}

export default TaskReminderEmail

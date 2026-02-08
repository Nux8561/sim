import { Body, Container, Head, Html, Img, Preview, Section } from '@react-email/components'
import { baseStyles, spacing } from '@/components/emails/_styles'
import { EmailFooter } from '@/components/emails/components/email-footer'
import { getBrandConfig } from '@/lib/branding/branding'
import { getBaseUrl } from '@/lib/core/utils/urls'

interface EmailLayoutProps {
  /** Preview text shown in email client list view */
  preview: string
  /** Email content to render inside the layout */
  children: React.ReactNode
  /** Optional: hide footer for internal emails */
  hideFooter?: boolean
  /** Optional: show hero illustration */
  heroImage?: string
  /** Optional: hero image alt text */
  heroAlt?: string
}

/**
 * Shared email layout wrapper providing consistent structure.
 * Attio-inspired design: clean, minimal, centered logo, generous whitespace.
 */
export function EmailLayout({
  preview,
  children,
  hideFooter = false,
  heroImage,
  heroAlt,
}: EmailLayoutProps) {
  const brand = getBrandConfig()
  const baseUrl = getBaseUrl()

  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={baseStyles.main}>
        {/* Main card container - Attio-style clean */}
        <Container style={baseStyles.container}>
          {/* Header with centered logo */}
          <Section style={baseStyles.header}>
            <Img
              src={brand.logoUrl || `${baseUrl}/brand/color/email/type.png`}
              width={spacing.logoWidth}
              alt={brand.name}
              style={{ display: 'block', margin: '0 auto' }}
            />
          </Section>

          {/* Optional Hero Illustration - Attio-style */}
          {heroImage && (
            <Section style={baseStyles.hero}>
              <Img
                src={heroImage}
                width={400}
                height={200}
                alt={heroAlt || 'Illustration'}
                style={{
                  display: 'block',
                  margin: '0 auto 32px auto',
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Section>
          )}

          {/* Content with generous padding */}
          <Section style={baseStyles.content}>{children}</Section>
        </Container>

        {/* Minimal footer */}
        {!hideFooter && <EmailFooter baseUrl={baseUrl} />}
      </Body>
    </Html>
  )
}

export default EmailLayout

import { Img, Section } from '@react-email/components'
import { baseStyles } from '@/components/emails/_styles'

interface EmailHeroProps {
  /** URL to the hero illustration */
  src: string
  /** Alt text for the image */
  alt?: string
  /** Image width (default: 400) */
  width?: number
  /** Image height (default: 200) */
  height?: number
}

/**
 * Hero illustration component for emails - Attio-style centered illustration.
 * Use for welcome emails, onboarding, success notifications.
 */
export function EmailHero({ src, alt = 'Illustration', width = 400, height = 200 }: EmailHeroProps) {
  return (
    <Section style={baseStyles.hero}>
      <Img
        src={src}
        width={width}
        height={height}
        alt={alt}
        style={{
          display: 'block',
          margin: '0 auto 32px auto',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </Section>
  )
}

export default EmailHero

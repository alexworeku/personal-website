import styles from './Button.module.css'

// Link styled as a button. `variant`: 'primary' | 'ghost'. External URLs
// (http…) open in a new tab with safe rel.
export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  ...rest
}) {
  const external = typeof href === 'string' && /^https?:/.test(href)
  const externalProps = external
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {}

  return (
    <a
      href={href}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...externalProps}
      {...rest}
    >
      {children}
    </a>
  )
}

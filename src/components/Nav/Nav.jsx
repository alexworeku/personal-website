import { useEffect, useState } from 'react'
import styles from './Nav.module.css'

export default function Nav({ profile, sections }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name}, home`}>
          <span className={styles.mark} aria-hidden="true">
            {profile.initials || profile.name.charAt(0)}
          </span>
          <span className={styles.brandName}>{profile.name}</span>
        </a>

        <nav
          className={`${styles.links} ${open ? styles.linksOpen : ''}`}
          aria-label="Sections"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setOpen(false)}
            >
              {section.label}
            </a>
          ))}
          {profile.resumeUrl && (
            <a
              className={styles.resumeMobile}
              href={profile.resumeUrl}
              onClick={() => setOpen(false)}
            >
              Résumé
            </a>
          )}
        </nav>

        <div className={styles.actions}>
          {profile.resumeUrl && (
            <a className={styles.resume} href={profile.resumeUrl}>
              Résumé
            </a>
          )}
          <button
            type="button"
            className={styles.burger}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open} />
          </button>
        </div>
      </div>
    </header>
  )
}

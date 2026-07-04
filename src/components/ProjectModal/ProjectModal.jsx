import { useEffect, useRef } from 'react'
import styles from './ProjectModal.module.css'

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const restoreRef = useRef(null)

  useEffect(() => {
    if (!project) return

    // Remember what had focus so we can return to it on close.
    restoreRef.current = document.activeElement

    const { body } = document
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    // Move focus into the dialog.
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // Keep focus inside the dialog.
      const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = prevOverflow
      restoreRef.current?.focus?.()
    }
  }, [project, onClose])

  if (!project) return null

  const {
    title,
    year,
    role,
    status,
    description,
    summary,
    highlights = [],
    metrics = [],
    tags = [],
    links = [],
  } = project

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.bar}>
          <div className={styles.barMeta}>
            {status && <span className={styles.status}>{status}</span>}
            <span className={styles.barText}>
              {[year, role].filter(Boolean).join('  ·  ')}
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close details"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <h2 id="project-title" className={styles.title}>
            {title}
          </h2>
          {summary && <p className={styles.summary}>{summary}</p>}

          {metrics.length > 0 && (
            <dl className={styles.metrics}>
              {metrics.map((metric) => (
                <div className={styles.metric} key={metric.label}>
                  <dt className={styles.metricValue}>{metric.value}</dt>
                  <dd className={styles.metricLabel}>{metric.label}</dd>
                </div>
              ))}
            </dl>
          )}

          {description && <p className={styles.body}>{description}</p>}

          {highlights.length > 0 && (
            <div className={styles.block}>
              <p className={styles.blockLabel}>Highlights</p>
              <ul className={styles.highlights}>
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tags.length > 0 && (
            <div className={styles.block}>
              <p className={styles.blockLabel}>Built with</p>
              <ul className={styles.tags}>
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          )}

          {links.length > 0 && (
            <div className={styles.links}>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className={styles.link}
                  target={/^https?:/.test(link.url) ? '_blank' : undefined}
                  rel="noreferrer noopener"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

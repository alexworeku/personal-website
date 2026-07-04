import styles from './ProjectCard.module.css'

// One project rendered as a consistent "specimen". Everything comes from the
// JSON entry, so an appended project produces a correctly-formed card for free.
export default function ProjectCard({ project, index, onOpen }) {
  const { title, year, role, status, summary, tags = [], metrics = [] } = project
  const featured = Boolean(project.featured)
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
    >
      <div className={styles.head}>
        <span className={styles.number}>{number}</span>
        {status && <span className={styles.status}>{status}</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>
          {[year, role].filter(Boolean).join('  ·  ')}
        </p>
        <p className={styles.summary}>{summary}</p>

        {featured && metrics.length > 0 && (
          <dl className={styles.metrics}>
            {metrics.map((metric) => (
              <div className={styles.metric} key={metric.label}>
                <dt className={styles.metricValue}>{metric.value}</dt>
                <dd className={styles.metricLabel}>{metric.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className={styles.foot}>
        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.slice(0, featured ? 6 : 4).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <div className={styles.actions}>
          {/* Stretched trigger — clicking anywhere on the card opens details. */}
          <button
            type="button"
            className={styles.trigger}
            onClick={() => onOpen(project)}
            aria-label={`View details for ${title}`}
          >
            View details
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </button>

          {project.links?.length > 0 && (
            <div className={styles.links}>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className={styles.link}
                  target={/^https?:/.test(link.url) ? '_blank' : undefined}
                  rel="noreferrer noopener"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

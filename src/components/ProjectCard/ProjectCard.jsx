import ProjectMedia from '../ProjectMedia/ProjectMedia.jsx'
import styles from './ProjectCard.module.css'

// One project as a consistent entry. Everything comes from the JSON block, so
// appending a project produces a correctly-formed card with no code changes.
export default function ProjectCard({ project, index }) {
  const { title, year, role, status, summary, tags = [], links = [] } = project
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <span className={styles.number}>{number}</span>
        {status && <span className={styles.status}>{status}</span>}
      </div>

      <ProjectMedia project={project} />

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.meta}>{[year, role].filter(Boolean).join('  ·  ')}</p>
      <p className={styles.summary}>{summary}</p>

      <div className={styles.foot}>
        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
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
    </article>
  )
}

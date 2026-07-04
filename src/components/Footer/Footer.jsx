import styles from './Footer.module.css'

export default function Footer({ profile }) {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.name}>{profile.name}</span>
          <span className={styles.copy}>© {year}</span>
        </div>

        <p className={styles.colophon}>
          Built with React &amp; Vite · Bricolage Grotesque, Inter &amp;
          JetBrains Mono
        </p>

        <a href="#top" className={styles.top}>
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}

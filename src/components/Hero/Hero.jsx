import styles from './Hero.module.css'

export default function Hero({ profile }) {
  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.inner}`}>
        {profile.availability && (
          <p className={`eyebrow ${styles.kicker}`}>
            {profile.available && (
              <span className={styles.dot} aria-hidden="true" />
            )}
            {profile.availability}
          </p>
        )}

        <h1 className={styles.title}>{profile.statement}</h1>

        <p className={styles.who}>
          {profile.name}, {profile.role}
          {profile.location ? `, based in ${profile.location}` : ''}
        </p>

        {profile.socials?.length > 0 && (
          <ul className={styles.links}>
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={/^https?:/.test(social.url) ? '_blank' : undefined}
                  rel="noreferrer noopener"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

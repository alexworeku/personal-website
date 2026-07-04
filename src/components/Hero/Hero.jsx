import Button from '../Button/Button.jsx'
import styles from './Hero.module.css'

export default function Hero({ profile, about }) {
  const highlights = about?.highlights ?? []

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.inner}`}>
        <div className={styles.lead}>
          {profile.availability && (
            <p className={`eyebrow ${styles.kicker}`}>
              {profile.available && (
                <span className={styles.dot} aria-hidden="true" />
              )}
              {profile.availability}
            </p>
          )}

          <h1 className={styles.title}>{profile.statement}</h1>

          <p className={styles.lede}>{profile.intro}</p>

          <p className={styles.who}>
            {profile.name} — {profile.role}
            {profile.location ? `, based in ${profile.location}` : ''}
          </p>

          <div className={styles.actions}>
            <Button href="#work">View selected work</Button>
            <Button href="#contact" variant="ghost">
              Get in touch
            </Button>
          </div>

          {profile.socials?.length > 0 && (
            <ul className={styles.socials}>
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={/^https?:/.test(social.url) ? '_blank' : undefined}
                    rel="noreferrer noopener"
                  >
                    <span className={styles.socialLabel}>{social.label}</span>
                    <span className={styles.socialHandle}>{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className={styles.card} aria-label="At a glance">
          <p className={`eyebrow ${styles.cardEyebrow}`}>At a glance</p>
          <dl className={styles.stats}>
            {highlights.map((item) => (
              <div className={styles.stat} key={item.label}>
                <dt className={styles.statValue}>{item.value}</dt>
                <dd className={styles.statLabel}>{item.label}</dd>
              </div>
            ))}
          </dl>
          {profile.available && (
            <p className={styles.cardNote}>
              <span className={styles.dot} aria-hidden="true" />
              Currently taking on new work
            </p>
          )}
        </aside>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Selected work</span>
        <span className={styles.scrollArrow} />
      </div>
    </section>
  )
}

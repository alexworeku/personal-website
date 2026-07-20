import Button from '../Button/Button.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import styles from './Contact.module.css'

export default function Contact({ profile }) {
  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <Reveal className={styles.panel}>
          <p className={`eyebrow ${styles.eyebrow}`}>
            <span className={styles.index}>06</span> Contact
          </p>

          <h2 className={styles.title}>Let's build something.</h2>
          <p className={styles.lead}>
            {profile.availability
              ? `${profile.availability}. The fastest way to reach me is email; I read everything and reply within a day.`
              : 'The fastest way to reach me is email; I read everything and reply within a day.'}
          </p>

          <div className={styles.actions}>
            {profile.email && (
              <Button href={`mailto:${profile.email}`}>
                {profile.email}
              </Button>
            )}
            {profile.resumeUrl && (
              <Button href={profile.resumeUrl} variant="ghost">
                Download résumé
              </Button>
            )}
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
                    {social.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  )
}

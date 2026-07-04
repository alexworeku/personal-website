import SectionHeader from '../SectionHeader/SectionHeader.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import styles from './Experience.module.css'

export default function Experience({ experience }) {
  return (
    <section className={styles.section} id="experience">
      <div className="container">
        <SectionHeader index="04" meta="Timeline" title="Where I've worked" />

        <ol className={styles.timeline}>
          {experience.map((item, i) => (
            <Reveal as="li" className={styles.entry} key={i} delay={i * 60}>
              <div className={styles.period}>
                <span className={styles.dot} data-current={!!item.current} aria-hidden="true" />
                {item.period}
                {item.current && <span className={styles.now}>Now</span>}
              </div>
              <div className={styles.detail}>
                <h3 className={styles.role}>
                  {item.role} <span className={styles.at}>·</span>{' '}
                  <span className={styles.org}>{item.org}</span>
                </h3>
                <p className={styles.summary}>{item.summary}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

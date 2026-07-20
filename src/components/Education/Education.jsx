import SectionHeader from '../SectionHeader/SectionHeader.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import styles from './Education.module.css'

export default function Education({ education }) {
  return (
    <section className={styles.section} id="education">
      <div className="container">
        <SectionHeader index="05" meta="Education" title="Where I studied" />

        <ol className={styles.list}>
          {education.map((item, i) => (
            <Reveal as="li" className={styles.entry} key={i} delay={i * 60}>
              <div className={styles.period}>{item.period}</div>
              <div className={styles.detail}>
                <h3 className={styles.degree}>
                  {item.degree} <span className={styles.at}>·</span>{' '}
                  <span className={styles.org}>{item.org}</span>
                </h3>
                {item.detail && <p className={styles.summary}>{item.detail}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

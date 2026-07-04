import SectionHeader from '../SectionHeader/SectionHeader.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import styles from './About.module.css'

export default function About({ about }) {
  return (
    <section className={styles.section} id="about">
      <div className="container">
        <SectionHeader index="02" meta="Background" title={about.heading} />
        <Reveal className={styles.body}>
          {about.body.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

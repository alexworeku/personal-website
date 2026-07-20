import SectionHeader from '../SectionHeader/SectionHeader.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import styles from './Stack.module.css'

export default function Stack({ stack }) {
  return (
    <section className={styles.section} id="stack">
      <div className="container">
        <SectionHeader
          index="03"
          meta="Skills"
          title="What I bring to the table"
          lead="System design, cloud infrastructure, and applied AI — the areas I work across, not just a list of tools."
        />

        <div className={styles.grid}>
          {stack.map((group, i) => (
            <Reveal className={styles.group} key={group.group} delay={i * 60}>
              <p className={styles.groupName}>{group.group}</p>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

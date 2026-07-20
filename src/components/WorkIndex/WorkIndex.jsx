import SectionHeader from '../SectionHeader/SectionHeader.jsx'
import ProjectCard from '../ProjectCard/ProjectCard.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import styles from './WorkIndex.module.css'

export default function WorkIndex({ projects }) {
  const count = String(projects.length).padStart(2, '0')

  return (
    <section className={styles.section} id="work">
      <div className="container">
        <SectionHeader
          index="01"
          meta={`${count} projects`}
          title="Things I've built"
          lead="A few side projects I've made to learn something new. Most started as 'can I build this?' and ended up on GitHub."
        />

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 80}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

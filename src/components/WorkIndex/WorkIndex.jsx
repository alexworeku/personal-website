import SectionHeader from '../SectionHeader/SectionHeader.jsx'
import ProjectCard from '../ProjectCard/ProjectCard.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import styles from './WorkIndex.module.css'

export default function WorkIndex({ projects, onOpen }) {
  const count = String(projects.length).padStart(2, '0')

  return (
    <section className={styles.section} id="work">
      <div className="container">
        <SectionHeader
          index="01"
          meta={`${count} projects`}
          title="Selected work"
          lead="A few things I've designed and shipped end to end. Open any project for the full story — the problem, the build, and what came of it."
        />

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 2) * 80}
              className={project.featured ? styles.featuredItem : ''}
            >
              <ProjectCard project={project} index={i} onOpen={onOpen} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'

import content from './lib/content.js'
import { useTheme } from './hooks/useTheme.js'

import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import WorkIndex from './components/WorkIndex/WorkIndex.jsx'
import About from './components/About/About.jsx'
import Stack from './components/Stack/Stack.jsx'
import Experience from './components/Experience/Experience.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import ProjectModal from './components/ProjectModal/ProjectModal.jsx'

export default function App() {
  const { theme, toggle } = useTheme()
  const { profile, about, stack, experience, projects, sections } = content

  // Which project's detail dialog is open (null = closed).
  const [activeProject, setActiveProject] = useState(null)

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to content
      </a>

      <Nav
        profile={profile}
        sections={sections}
        theme={theme}
        onToggleTheme={toggle}
      />

      <main>
        <Hero profile={profile} about={about} />

        {projects.length > 0 && (
          <WorkIndex projects={projects} onOpen={setActiveProject} />
        )}

        {about && <About about={about} />}
        {stack.length > 0 && <Stack stack={stack} />}
        {experience.length > 0 && <Experience experience={experience} />}
        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  )
}

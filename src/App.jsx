import content from './lib/content.js'

import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import WorkIndex from './components/WorkIndex/WorkIndex.jsx'
import About from './components/About/About.jsx'
import Stack from './components/Stack/Stack.jsx'
import Experience from './components/Experience/Experience.jsx'
import Education from './components/Education/Education.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'

export default function App() {
  const { profile, about, stack, experience, education, projects, sections } = content

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to content
      </a>

      <Nav profile={profile} sections={sections} />

      <main>
        <Hero profile={profile} />

        {projects.length > 0 && <WorkIndex projects={projects} />}

        {about && <About about={about} />}
        {stack.length > 0 && <Stack stack={stack} />}
        {experience.length > 0 && <Experience experience={experience} />}
        {education.length > 0 && <Education education={education} />}
        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />
    </>
  )
}

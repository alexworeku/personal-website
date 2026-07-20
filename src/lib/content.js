// Single boundary between the raw data file and the rendering layer.
// Components import from here (or receive props) and never touch the JSON
// directly — so the whole site is driven by editing src/data/projects.json.

import data from '../data/projects.json'
import { asset } from './asset.js'

// Resolve local asset paths (résumé) against the deploy base up front, so every
// consumer gets a ready-to-use URL.
export const profile = {
  ...data.profile,
  resumeUrl: asset(data.profile.resumeUrl),
}
export const about = data.about
export const stack = data.stack ?? []
export const experience = data.experience ?? []
export const education = data.education ?? []
export const projects = data.projects ?? []

// Sections are declared in one place so the nav and the page render from the
// same source of truth. Only sections that actually have content are shown.
export const sections = [
  { id: 'work', label: 'Work', enabled: projects.length > 0 },
  { id: 'about', label: 'About', enabled: Boolean(about) },
  { id: 'stack', label: 'Stack', enabled: stack.length > 0 },
  { id: 'experience', label: 'Experience', enabled: experience.length > 0 },
  { id: 'education', label: 'Education', enabled: education.length > 0 },
  { id: 'contact', label: 'Contact', enabled: Boolean(profile?.email) },
].filter((section) => section.enabled)

const content = { profile, about, stack, experience, education, projects, sections }
export default content

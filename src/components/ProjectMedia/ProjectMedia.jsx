import { useEffect, useRef, useState } from 'react'
import { asset } from '../../lib/asset.js'
import styles from './ProjectMedia.module.css'

const VIDEO_RE = /\.(mp4|webm|mov|m4v|ogv)$/i

// Accepts either a string ("/media/x.png") or an object
// ({ src, type?, alt?, poster?, label? }) and normalizes it, resolving local
// paths against the deploy base. A `{ type: 'link', url, label }` entry opens
// an external page (e.g. a hosted live demo) instead of displaying inline —
// it shows up alongside the media tabs but doesn't become the active preview.
function normalizeEntry(item) {
  if (!item) return null
  const raw = typeof item === 'string' ? { src: item } : item

  if (raw.type === 'link') {
    if (!raw.url) return null
    return { kind: 'link', url: raw.url, label: raw.label || 'Live Demo' }
  }

  if (!raw.src) return null
  const type = raw.type || (VIDEO_RE.test(raw.src) ? 'video' : 'image')
  return {
    kind: 'media',
    type,
    src: asset(raw.src),
    alt: raw.alt || '',
    poster: asset(raw.poster),
    label: raw.label || (type === 'video' ? 'Demo' : 'Architecture'),
  }
}

// `project.media` is a list of preview entries (e.g. a demo clip, an
// architecture diagram, a live-demo link); a bare object/string is treated as
// a single-item list.
function normalizeEntries(media) {
  const list = Array.isArray(media) ? media : media ? [media] : []
  return list.map(normalizeEntry).filter(Boolean)
}

// On-brand fallback shown when a project has no media (or it fails to load),
// so the grid stays visually consistent while you fill previews in over time.
function Placeholder({ project }) {
  const letter = (project.title || '?').charAt(0).toUpperCase()
  return (
    <div className={styles.placeholder} aria-hidden="true">
      <span className={styles.placeholderMark}>{letter}</span>
      <span className={styles.placeholderLabel}>{project.title}</span>
    </div>
  )
}

function Video({ media, onError }) {
  const ref = useRef(null)

  // Play muted-loop like a preview clip, but don't autoplay under reduced
  // motion; leave the poster/first frame in place instead.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) el.play().catch(() => {})
  }, [])

  return (
    <video
      ref={ref}
      className={styles.media}
      src={media.src}
      poster={media.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.alt || undefined}
      onError={onError}
    />
  )
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </g>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
      </g>
    </svg>
  )
}

export default function ProjectMedia({ project }) {
  const entries = normalizeEntries(project.media)
  const mediaItems = entries.filter((e) => e.kind === 'media')

  // Tag each media entry with its index into `mediaItems`, so tab buttons can
  // set `activeIndex` while link entries stay outside that indexing.
  let mediaCounter = -1
  const tabEntries = entries.map((entry) =>
    entry.kind === 'media' ? { ...entry, mediaIndex: ++mediaCounter } : entry,
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [failedIndex, setFailedIndex] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const dialogRef = useRef(null)

  const active = mediaItems[activeIndex]
  const showPlaceholder = !active || failedIndex === activeIndex

  const openExpanded = () => {
    setExpanded(true)
    dialogRef.current?.showModal()
  }
  const closeExpanded = () => dialogRef.current?.close()

  return (
    <figure className={styles.figure}>
      {showPlaceholder ? (
        <Placeholder project={project} />
      ) : active.type === 'video' ? (
        <Video media={active} onError={() => setFailedIndex(activeIndex)} />
      ) : (
        <img
          className={styles.media}
          src={active.src}
          alt={active.alt || `${project.title} preview`}
          loading="lazy"
          decoding="async"
          onError={() => setFailedIndex(activeIndex)}
        />
      )}

      {!showPlaceholder && (
        <button
          type="button"
          className={styles.expand}
          aria-label={`View ${project.title} ${active.label.toLowerCase()} full size`}
          onClick={openExpanded}
        >
          <ExpandIcon />
        </button>
      )}

      {tabEntries.length > 1 && (
        <div className={styles.tabs} role="tablist" aria-label={`${project.title} preview type`}>
          {tabEntries.map((entry, i) =>
            entry.kind === 'link' ? (
              <a
                key={entry.label + i}
                href={entry.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.tab}
              >
                {entry.label} ↗
              </a>
            ) : (
              <button
                key={entry.label + i}
                type="button"
                role="tab"
                aria-selected={entry.mediaIndex === activeIndex}
                data-active={entry.mediaIndex === activeIndex || undefined}
                className={styles.tab}
                onClick={() => setActiveIndex(entry.mediaIndex)}
              >
                {entry.label}
              </button>
            ),
          )}
        </div>
      )}

      {!showPlaceholder && (
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          onClose={() => setExpanded(false)}
          onClick={(e) => {
            if (e.target === dialogRef.current) closeExpanded()
          }}
        >
          <div className={styles.dialogInner}>
            <button
              type="button"
              className={styles.dialogClose}
              aria-label="Close"
              onClick={closeExpanded}
            >
              <CloseIcon />
            </button>
            {expanded &&
              (active.type === 'video' ? (
                <video
                  className={styles.dialogMedia}
                  src={active.src}
                  poster={active.poster}
                  controls
                  autoPlay
                  playsInline
                  aria-label={active.alt || undefined}
                />
              ) : (
                <img
                  className={styles.dialogMedia}
                  src={active.src}
                  alt={active.alt || `${project.title} full size`}
                />
              ))}
          </div>
        </dialog>
      )}
    </figure>
  )
}

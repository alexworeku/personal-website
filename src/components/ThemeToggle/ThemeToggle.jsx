import styles from './ThemeToggle.module.css'

// Swaps between the dark and light token sets. Labelled for screen readers;
// the icon is decorative.
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      <span className={styles.track} data-dark={isDark}>
        <span className={styles.thumb}>
          {isDark ? (
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path
                fill="currentColor"
                d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" />
              </g>
            </svg>
          )}
        </span>
      </span>
    </button>
  )
}

import styles from './SectionHeader.module.css'

// Consistent header for every major section. The index number encodes reading
// order down the page (a real sequence), not decoration.
export default function SectionHeader({ index, title, lead, meta }) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        {meta && <span className={styles.meta}>{meta}</span>}
      </div>
      <h2 className={styles.title}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  )
}

import styles from './ProjectOverview.module.css';

const FACTS = [
  { icon: "\u{1F5C3}", label: 'Dataset', value: 'Sonar (UCI)' },
  { icon: "\u{1F4CA}", label: 'Samples', value: '208' },
  { icon: "\u{1F522}", label: 'Features', value: '60' },
  { icon: "\u{1F3F7}", label: 'Classes', value: 'Rock \u00B7 Mine' },
  { icon: "\u{1F916}", label: 'Algorithm', value: 'Logistic Regression' },
  { icon: "\u{1F52C}", label: 'Validation', value: 'Train/Test Split + CV' },
];

export default function ProjectOverview() {
  return (
    <section id="overview" className={styles.section}>
      <div className="section">
        <p className={styles.eyebrow}>Project Overview</p>
        <h2 className="section-title">About This Project</h2>
        <p className="section-subtitle">A binary classification system trained on real sonar frequency data to distinguish underwater rocks from mines.</p>
        <div className={styles.grid}>
          {FACTS.map(f => (
            <div key={f.label} className={`glass-card ${styles.card}`}>
              <span className={styles.icon}>{f.icon}</span>
              <span className={styles.label}>{f.label}</span>
              <span className={styles.value}>{f.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.note}>
          <span className={styles.noteIcon}>{"\u2139\uFE0F"}</span>
          <p>The main prediction algorithm is <strong>Logistic Regression</strong>. Train/Test Split and Cross Validation are <em>evaluation techniques</em>, not separate models. PCA is used only for 2D visualisation, not prediction.</p>
        </div>
      </div>
    </section>
  );
}

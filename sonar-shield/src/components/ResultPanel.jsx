import styles from './ResultPanel.module.css';

export default function ResultPanel({ result }) {
  if (!result) return null;
  const isRock = result.prediction === 'R';
  return (
    <div className={`${styles.panel} ${isRock ? styles.rock : styles.mine} fade-in-up`}>
      <div className={styles.header}>
        <span className={styles.emoji}>{isRock ? "\u{1F9A8}" : "\u{1F4A3}"}</span>
        <div>
          <h3 className={styles.title}>{isRock ? 'ROCK DETECTED' : 'MINE DETECTED'}</h3>
          <p className={styles.desc}>
            {isRock ? 'The sonar signal pattern is classified as a Rock.' : 'The sonar signal pattern is classified as a Mine.'}
          </p>
        </div>
      </div>
      <div className={`${styles.badge} ${isRock ? styles.badgeRock : styles.badgeMine}`}>
        {isRock ? "\u2713 SAFE TO PROCEED" : "\u26A0\uFE0F HAZARD DETECTED"}
      </div>
      <div className={styles.probs}>
        <div className={styles.probRow}>
          <span className={styles.probLabel}>{"\u{1F9A8}"} Rock</span>
          <div className={styles.probBar}>
            <div className={styles.probFill} style={{ width: `${result.probRock}%`, background: 'linear-gradient(90deg,#16a34a,#4ade80)' }} />
          </div>
          <span className={styles.probValue}>{result.probRock.toFixed(1)}%</span>
        </div>
        <div className={styles.probRow}>
          <span className={styles.probLabel}>{"\u{1F4A3}"} Mine</span>
          <div className={styles.probBar}>
            <div className={styles.probFill} style={{ width: `${result.probMine}%`, background: 'linear-gradient(90deg,#b45309,#fbbf24)' }} />
          </div>
          <span className={styles.probValue}>{result.probMine.toFixed(1)}%</span>
        </div>
      </div>
      <div className={styles.meta}>
        <div className={styles.metaRow}><span className={styles.metaKey}>Classification</span><span className={styles.metaVal}>{isRock ? 'ROCK' : 'MINE'}</span></div>
        <div className={styles.metaRow}><span className={styles.metaKey}>Model</span><span className={styles.metaVal}>Logistic Regression</span></div>
        <div className={styles.metaRow}><span className={styles.metaKey}>Features Analyzed</span><span className={styles.metaVal}>60</span></div>
      </div>
    </div>
  );
}

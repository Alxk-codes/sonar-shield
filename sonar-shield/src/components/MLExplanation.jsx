import styles from './MLExplanation.module.css';

const FLOW = [
  { label: 'Sonar Data', icon: '🌊', desc: '208 sonar signal recordings' },
  { label: '60 Signal Features', icon: '🔢', desc: 'Frequency band energy values (0 — 1)' },
  { label: 'Data Preparation', icon: '⚙️', desc: 'Train (187) / Test (21) split, stratified' },
  { label: 'Logistic Regression', icon: '🤖', desc: 'Trained on training set' },
  { label: 'Prediction', icon: '◎', desc: 'P(Rock) = σ(wᵀx + b)' },
  { label: 'Rock / Mine', icon: '🎯', desc: 'Binary classification output' },
];

const EXPLANATIONS = [
  { term: 'Logistic Regression', detail: 'Chosen because this is a binary classification problem (Rock vs Mine). Uses a sigmoid function to output probabilities between 0 and 1.' },
  { term: 'Train / Test Split', detail: 'The model learns on 90% of data (187 samples) and is evaluated on the unseen 10% (21 samples). Stratified to preserve class balance.' },
  { term: 'Cross Validation (5-fold)', detail: 'The entire dataset is split into 5 folds and training/testing rotates — provides a more reliable accuracy estimate, especially for a small dataset.' },
  { term: 'PCA (Visualization Only)', detail: 'Reduces 60 features to 2 dimensions for plotting. PCA is NOT used in the actual prediction pipeline — only for the 2D scatter plot.' },
];

export default function MLExplanation() {
  return (
    <section id="model" className={styles.section}>
      <div className="section">
        <p className={styles.eyebrow}>How It Works</p>
        <h2 className="section-title">ML Pipeline</h2>
        <p className="section-subtitle">From raw sonar signals to a Rock or Mine prediction — the exact pipeline used in the notebook.</p>
        <div className={styles.layout}>
          <div className={styles.flow}>
            {FLOW.map((step, i) => (
              <div key={step.label}>
                <div className={`glass-card ${styles.step}`}>
                  <span className={styles.stepIcon}>{step.icon}</span>
                  <div>
                    <p className={styles.stepLabel}>{step.label}</p>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </div>
                {i < FLOW.length - 1 && <div className={styles.arrow}>↓</div>}
              </div>
            ))}
          </div>
          <div className={styles.explanations}>
            {EXPLANATIONS.map(e => (
              <div key={e.term} className={`glass-card ${styles.explCard}`}>
                <h4 className={styles.explTerm}>{e.term}</h4>
                <p className={styles.explDetail}>{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

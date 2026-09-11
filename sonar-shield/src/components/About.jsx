import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="section">
        <p className={styles.eyebrow}>About This Project</p>
        <h2 className="section-title">SONAR SHIELD</h2>
        <div className={styles.layout}>
          <div className={`glass-card ${styles.card}`}>
            <h3 className={styles.cardTitle}>{"\u{1F4E1}"} What Is This?</h3>
            <p className={styles.cardText}>This machine learning mini-project uses 60 sonar signal measurements to classify underwater objects as <strong>Rock</strong> or <strong>Mine</strong> using Logistic Regression. The model was trained on the UCI Sonar dataset containing 208 sonar returns bounced off metal cylinders (mines) and rocks.</p>
          </div>
          <div className={`glass-card ${styles.card}`}>
            <h3 className={styles.cardTitle}>{"\u{1F916}"} How Predictions Work</h3>
            <p className={styles.cardText}>The trained Logistic Regression model&apos;s coefficients and intercept are embedded directly in the browser. When you submit 60 values, the app computes <code>P(Rock) = \u03c3(w\u1d40x + b)</code> using the exact same parameters learned during training. No backend. No API calls.</p>
          </div>
          <div className={`glass-card ${styles.card}`}>
            <h3 className={styles.cardTitle}>{"\u{1F4CA}"} Verified Facts</h3>
            <ul className={styles.list}>
              <li>Dataset: UCI Sonar (208 samples, 60 features)</li>
              <li>Algorithm: Logistic Regression (sklearn defaults)</li>
              <li>Split: 90/10, stratified, random_state=1</li>
              <li>Training Accuracy: 83.42%</li>
              <li>Test Accuracy: 76.19%</li>
              <li>CV Mean (5-fold): 63.01% \u00b114.76%</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

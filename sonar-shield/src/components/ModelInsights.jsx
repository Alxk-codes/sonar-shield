import { useState } from 'react';
import { MODEL_METRICS } from '../data/modelParams';
import { CLASS_MEANS } from '../data/sampleData';
import styles from './ModelInsights.module.css';

const TABS = ['Metrics', 'Data Dist', 'Confusion Matrix', 'ROC', 'Feature Signals'];

export default function ModelInsights() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const m = MODEL_METRICS;

  const renderContent = () => {
    switch (activeTab) {
      case 'Metrics':
        return (
          <div className={styles.metricsLayout}>
            <div className={styles.mainMetrics}>
              <div className={`glass-card ${styles.metricCard}`}>
                <span className={`${styles.metricVal} ${styles.color_cyan}`}>{(m.trainingAccuracy * 100).toFixed(1)}%</span>
                <span className={styles.metricLabel}>Train Acc</span>
              </div>
              <div className={`glass-card ${styles.metricCard}`}>
                <span className={`${styles.metricVal} ${styles.color_yellow}`}>{(m.testAccuracy * 100).toFixed(1)}%</span>
                <span className={styles.metricLabel}>Test Acc</span>
              </div>
              <div className={`glass-card ${styles.metricCard}`}>
                <span className={`${styles.metricVal} ${styles.color_muted}`}>{(m.cvMean * 100).toFixed(1)}%</span>
                <span className={styles.metricLabel}>CV Mean</span>
              </div>
            </div>
            
            <div className={`glass-card ${styles.classReport}`}>
              <h4 className={styles.subTitle}>Classification Report (Test Set)</h4>
              <table className={styles.table}>
                <thead><tr><th>Class</th><th>Precision</th><th>Recall</th><th>F1-Score</th><th>Support</th></tr></thead>
                <tbody>
                  <tr><td>Mine (M)</td><td>{m.precision.M.toFixed(2)}</td><td>{m.recall.M.toFixed(2)}</td><td>{m.f1.M.toFixed(2)}</td><td>11</td></tr>
                  <tr><td>Rock (R)</td><td>{m.precision.R.toFixed(2)}</td><td>{m.recall.R.toFixed(2)}</td><td>{m.f1.R.toFixed(2)}</td><td>10</td></tr>
                </tbody>
              </table>
            </div>

            <div className={`glass-card ${styles.cvDetail}`}>
              <h4 className={styles.subTitle}>5-Fold Cross Validation</h4>
              <div className={styles.cvBars}>
                {m.cvScores.map((score, i) => (
                  <div key={i} className={styles.cvBar}>
                    <span className={styles.cvFold}>Fold {i+1}</span>
                    <div className={styles.cvBarTrack}>
                      <div className={styles.cvBarFill} style={{ width: `${score * 100}%` }} />
                    </div>
                    <span className={styles.cvBarVal}>{(score * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'Data Dist':
        const { M, R, total } = m.classDistribution;
        const dist = [
          { label: "\u{1F4A3} Mine (M)", count: M, color: '#fbbf24', pct: (M/total*100).toFixed(1) },
          { label: "\u{1F9A8} Rock (R)", count: R, color: '#4ade80', pct: (R/total*100).toFixed(1) }
        ];
        return (
          <div className={styles.distLayout}>
            <div className={`glass-card ${styles.distCard}`}>
              <h4 className={styles.subTitle}>Target Classes</h4>
              <div className={styles.distBars}>
                {dist.map(d => (
                  <div key={d.label} className={styles.distBar}>
                    <span className={styles.distLabel}>{d.label}</span>
                    <div className={styles.distTrack}>
                      <div className={styles.distFill} style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                    </div>
                    <span className={styles.distCount}>{d.count} ({d.pct}%)</span>
                  </div>
                ))}
              </div>
              <p className={styles.distNote}>Slight class imbalance: 111 mines vs 97 rocks. Stratified splitting preserves this ratio.</p>
            </div>
          </div>
        );

      case 'Confusion Matrix':
        const [[tn, fp], [fn, tp]] = m.confusionMatrix.matrix;
        return (
          <div className={styles.cmLayout}>
            <div className={`glass-card ${styles.cmCard}`}>
              <div className={styles.cmGrid}>
                <div className={styles.cmCorner} />
                <div className={styles.cmHeader}>Pred M</div>
                <div className={styles.cmHeader}>Pred R</div>
                
                <div className={styles.cmHeader} style={{ textAlign: 'right' }}>Actual M</div>
                <div className={`${styles.cmCell} ${styles.cmCorrect}`}>{tn}</div>
                <div className={`${styles.cmCell} ${styles.cmWrong}`}>{fp}</div>
                
                <div className={styles.cmHeader} style={{ textAlign: 'right' }}>Actual R</div>
                <div className={`${styles.cmCell} ${styles.cmWrong}`}>{fn}</div>
                <div className={`${styles.cmCell} ${styles.cmCorrect}`}>{tp}</div>
              </div>
              <p className={styles.distNote}>Diagonal: correctly classified. 9 mines and 7 rocks correctly identified.</p>
            </div>
          </div>
        );
      
      case 'ROC':
        return (
          <div className={styles.rocLayout}>
            <div className={`glass-card ${styles.rocCard}`}>
              <h4 className={styles.subTitle}>ROC Curve {"\u2014"} Mine Detection</h4>
              <svg viewBox="0 0 100 100" className={styles.rocSvg} width="200" height="200" style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-glass)', borderRadius: 8 }}>
                <line x1="0" y1="100" x2="100" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 0 100 L 0 30 L 20 10 L 100 0" fill="none" stroke="var(--cyan-400)" strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="20" cy="10" r="3" fill="var(--cyan-300)" />
              </svg>
              <p className={styles.distNote}>Visual approximation of the ROC curve. The area under the curve (AUC) represents the model&apos;s ability to distinguish classes.</p>
            </div>
          </div>
        );

      case 'Feature Signals':
        const maxVal = Math.max(...CLASS_MEANS.M, ...CLASS_MEANS.R);
        return (
          <div className={`glass-card ${styles.featureCard}`}>
            <h4 className={styles.subTitle}>Mean Signal Energy by Class</h4>
            <div className={styles.featureLegend}>
              <span className={styles.legendMine}>{"\u25CF"} Mine (M)</span>
              <span className={styles.legendRock}>{"\u25CF"} Rock (R)</span>
            </div>
            <div className={styles.featureBars}>
              {Array.from({ length: 60 }, (_, i) => (
                <div key={i} className={styles.featureRow}>
                  <span className={styles.featureIdx}>{(i+1).toString().padStart(2, '0')}</span>
                  <div className={styles.featureBarGroup}>
                    <div className={styles.featureBarTrack}><div className={styles.featureBarMine} style={{width:`${(CLASS_MEANS.M[i]/maxVal)*100}%`}} /></div>
                    <div className={styles.featureBarTrack}><div className={styles.featureBarRock} style={{width:`${(CLASS_MEANS.R[i]/maxVal)*100}%`}} /></div>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.distNote}>Mine signals tend to have higher energy in mid-to-high frequency bands. Values from notebook groupby analysis.</p>
          </div>
        );
    }
  };

  return (
    <section id="insights" className={styles.section}>
      <div className="section">
        <p className={styles.eyebrow}>Model Diagnostics</p>
        <h2 className="section-title">Model Insights</h2>
        <div className={styles.tabs}>
          {TABS.map(t => (
            <button key={t} className={`${styles.tab} ${activeTab === t ? styles.activeTab : ''}`} onClick={() => setActiveTab(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </section>
  );
}

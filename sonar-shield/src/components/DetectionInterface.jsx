import { useState, useCallback } from 'react';
import { predict } from '../utils/predict';
import { ROCK_SAMPLE, MINE_SAMPLE } from '../data/sampleData';
import SonarRadar from './SonarRadar';
import ResultPanel from './ResultPanel';
import styles from './DetectionInterface.module.css';

const GROUPS = [
  { label: 'Features 01 \u2014 20', start: 0, end: 20 },
  { label: 'Features 21 \u2014 40', start: 20, end: 40 },
  { label: 'Features 41 \u2014 60', start: 40, end: 60 },
];

const SCAN_STEPS = [
  { text: "\u{1F6A2} SONAR ACTIVE" },
  { text: "Scanning underwater signal..." },
  { text: "Extracting 60 signal features..." },
  { text: "Running Logistic Regression..." },
  { text: "\u{1F916} CLASSIFYING" },
];

export default function DetectionInterface() {
  const [values, setValues] = useState(Array(60).fill(''));
  const [scanState, setScanState] = useState('idle');
  const [scanStep, setScanStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [pasteText, setPasteText] = useState('');

  const handleChange = useCallback((idx, val) => {
    setValues(prev => { const n = [...prev]; n[idx] = val; return n; });
    setError('');
  }, []);

  const loadSample = useCallback((sample) => {
    setValues(sample.map(String));
    setResult(null); setScanState('idle'); setScanStep(-1); setError('');
  }, []);

  const clearAll = useCallback(() => {
    setValues(Array(60).fill(''));
    setPasteText('');
    setResult(null); setScanState('idle'); setScanStep(-1); setError('');
  }, []);

  const handlePaste = () => {
    if (!pasteText.trim()) return;
    const matches = pasteText.match(/-?\d+(\.\d+)?/g);
    if (!matches || matches.length < 60) {
      setError(`\u26A0\uFE0F Found only ${matches ? matches.length : 0} numbers in your pasted text. Expected 60.`);
      return;
    }
    const newVals = Array(60).fill('');
    for (let i = 0; i < 60; i++) {
      newVals[i] = matches[i];
    }
    setValues(newVals);
    setError('');
    setPasteText('');
  };

  const analyze = useCallback(async () => {
    const parsed = values.map(v => parseFloat(String(v).trim()));
    if (parsed.some(v => isNaN(v))) {
      setError('\u26A0\uFE0F Please fill in all 60 feature values with valid numbers before analyzing.');
      return;
    }
    setError(''); setResult(null); setScanState('scanning');
    for (let i = 0; i < SCAN_STEPS.length; i++) {
      setScanStep(i);
      await new Promise(r => setTimeout(r, 380));
    }
    const prediction = predict(parsed);
    setScanStep(-1);
    setScanState(prediction.prediction === 'R' ? 'rock' : 'mine');
    setResult(prediction);
  }, [values]);

  return (
    <section id="detection" className={styles.section}>
      <div className="section">
        <p className={styles.eyebrow}>Sonar Signal Analysis</p>
        <h2 className="section-title">{"\u{1F50D}"} Detection Interface</h2>
        <p className="section-subtitle">Enter 60 sonar signal values or load a sample. The model will classify using the trained Logistic Regression algorithm.</p>
        
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <SonarRadar state={scanState} />
            {scanState === 'scanning' && scanStep >= 0 && (
              <div className={styles.scanSteps}>
                {SCAN_STEPS.map((s, i) => (
                  <div key={i} className={`${styles.scanStep} ${i === scanStep ? styles.active : i < scanStep ? styles.done : ''}`}>
                    {i < scanStep ? "\u2713" : i === scanStep ? "\u203A" : "\u25CB"} {s.text}
                  </div>
                ))}
              </div>
            )}
            {result && <ResultPanel result={result} />}
          </div>
          
          <div className={styles.inputPanel}>
            <div className={`glass-card ${styles.pasteArea}`}>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>Quick Input (Paste Comma-Separated Values)</h4>
              <div className={styles.pasteControls}>
                <textarea 
                  className={styles.textarea} 
                  placeholder="Paste 60 values separated by commas or spaces..."
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handlePaste}>Use This Value</button>
              </div>
            </div>

            <div className={styles.actions}>
              <button className="btn btn-rock" onClick={() => loadSample(ROCK_SAMPLE)}>{"\u{1F9A8}"} Load Rock Sample</button>
              <button className="btn btn-mine" onClick={() => loadSample(MINE_SAMPLE)}>{"\u{1F4A3}"} Load Mine Sample</button>
              <button className="btn btn-ghost" onClick={clearAll}>{"\u2715"} Clear</button>
            </div>

            {GROUPS.map(({ label, start, end }) => (
              <div key={label} className={styles.group}>
                <h4 className={styles.groupLabel}>{label}</h4>
                <div className={styles.grid}>
                  {Array.from({ length: end - start }, (_, i) => {
                    const idx = start + i;
                    return (
                      <div key={idx} className={styles.field}>
                        <label className={styles.fieldLabel}>{String(idx + 1).padStart(2, '0')}</label>
                        <input
                          type="number" step="any"
                          value={values[idx]}
                          onChange={e => handleChange(idx, e.target.value)}
                          className={`${styles.input} ${values[idx] !== '' && isNaN(parseFloat(values[idx])) ? styles.invalid : ''}`}
                          placeholder="0.00"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {error && <p className={styles.error}>{error}</p>}
            <button className={`btn btn-primary ${styles.analyzeBtn}`} onClick={analyze} disabled={scanState === 'scanning'}>
              {scanState === 'scanning' ? "\u27F3 Analyzing..." : "\u25CE Analyze Signal"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

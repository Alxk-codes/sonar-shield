import styles from './Hero.module.css';

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 3) % 100}%`,
  top: `${(i * 13 + 7) % 45}%`,
  delay: `${(i * 0.3) % 4}s`,
  size: `${1 + (i % 3)}px`,
}));

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.ocean}>
        <div className={styles.sky} />
        <div className={styles.stars}>
          {STARS.map(s => (
            <span key={s.id} className={styles.star} style={{ left: s.left, top: s.top, animationDelay: s.delay, width: s.size, height: s.size }} />
          ))}
        </div>
        
        {/* Left Ship */}
        <div className={`${styles.shipContainer} ${styles.posLeft}`}>
          <div className={styles.ship}>
            <div className={styles.mast}><div className={styles.mastTop} /></div>
            <div className={styles.hull}>
              <div className={styles.bridge} />
              <div className={styles.deck} />
            </div>
          </div>
        </div>

        {/* Right Submarine */}
        <div className={`${styles.shipContainer} ${styles.posRight}`}>
          <div className={styles.submarine}>
            <div className={styles.subSail}><div className={styles.subPeriscope} /></div>
            <div className={styles.subHull} />
            <div className={styles.subPropeller} />
          </div>
        </div>

        <div className={styles.waterSurface}>
          <div className={styles.wave1} />
          <div className={styles.wave2} />
          <div className={styles.wave3} />
        </div>
        <div className={styles.underwater}>
          <div className={styles.sonarOrigin}>
            <div className={styles.sonarRing} style={{ animationDelay: '0s' }} />
            <div className={styles.sonarRing} style={{ animationDelay: '1.3s' }} />
            <div className={styles.sonarRing} style={{ animationDelay: '2.6s' }} />
          </div>
          {[10, 30, 50, 70, 20, 60, 80, 40].map((left, i) => (
            <div key={i} className={styles.particle} style={{ left: `${left}%`, top: `${20 + i * 8}%`, animationDelay: `${i * 0.6}s`, animationDuration: `${4 + i * 0.5}s` }} />
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.badge}><span className={styles.badgeDot} />AI-Powered Detection System</div>
        <h1 className={styles.title}>SONAR<span className={styles.titleAccent}> SHIELD</span></h1>
        <p className={styles.subtitle}>AI-Powered Rock vs Mine Detection</p>
        <p className={styles.description}>Analyze sonar signal patterns using machine learning to determine whether an underwater object is a Rock or a Mine.</p>
        <div className={styles.actions}>
          <a href="#detection" className="btn btn-primary">{"\u25CE"} Launch Detection</a>
          <a href="#insights" className="btn btn-ghost">View Model Insights</a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}><span className={styles.statVal}>208</span><span className={styles.statLabel}>Samples</span></div>
          <div className={styles.statDivider} />
          <div className={styles.stat}><span className={styles.statVal}>60</span><span className={styles.statLabel}>Features</span></div>
          <div className={styles.statDivider} />
          <div className={styles.stat}><span className={styles.statVal}>83.4%</span><span className={styles.statLabel}>Train Acc.</span></div>
        </div>
      </div>
    </section>
  );
}

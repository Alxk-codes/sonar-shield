import { useRef, useEffect } from 'react';
import styles from './SonarRadar.module.css';

export default function SonarRadar({ state = 'idle' }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const SIZE = canvas.width;
    const cx = SIZE / 2, cy = SIZE / 2;
    const R = SIZE / 2 - 8;
    const speed = state === 'scanning' ? 0.05 : 0.015;
    const ringColor = state === 'mine' ? '#fbbf24' : '#22d3ee';
    const detectionColor = state === 'mine' ? '#f59e0b' : '#4ade80';

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = 'rgba(2,8,18,0.95)';
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      [0.25, 0.5, 0.75, 1].forEach(f => {
        ctx.beginPath(); ctx.arc(cx, cy, R * f, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34,211,238,${f === 1 ? 0.4 : 0.12})`;
        ctx.lineWidth = f === 1 ? 1.5 : 1; ctx.stroke();
      });

      ctx.strokeStyle = 'rgba(34,211,238,0.1)'; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
      ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
      ctx.stroke();

      const angle = angleRef.current;
      ctx.save();
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R - 2, angle - 0.8, angle); ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      grad.addColorStop(0, 'rgba(34,211,238,0.0)');
      grad.addColorStop(0.5, 'rgba(34,211,238,0.15)');
      grad.addColorStop(1, 'rgba(34,211,238,0.35)');
      ctx.fillStyle = grad; ctx.fill(); ctx.restore();

      ctx.save();
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * (R - 2), cy + Math.sin(angle) * (R - 2));
      ctx.strokeStyle = ringColor; ctx.lineWidth = 2;
      ctx.shadowColor = ringColor; ctx.shadowBlur = 8; ctx.stroke(); ctx.restore();

      if (state === 'rock' || state === 'mine') {
        const dotAngle = 0.8, dotDist = R * 0.55;
        const dx = cx + Math.cos(dotAngle) * dotDist;
        const dy = cy + Math.sin(dotAngle) * dotDist;
        ctx.beginPath(); ctx.arc(dx, dy, 6, 0, Math.PI * 2);
        ctx.fillStyle = detectionColor; ctx.shadowColor = detectionColor; ctx.shadowBlur = 16; ctx.fill();
        const pulse = Math.abs(Math.sin(Date.now() / 600)) * 10;
        ctx.beginPath(); ctx.arc(dx, dy, 8 + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = detectionColor; ctx.globalAlpha = Math.max(0, 0.4 - pulse * 0.03);
        ctx.lineWidth = 1.5; ctx.stroke(); ctx.globalAlpha = 1;
      }

      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = ringColor; ctx.shadowColor = ringColor; ctx.shadowBlur = 10; ctx.fill();
      ctx.font = '10px monospace'; ctx.fillStyle = 'rgba(34,211,238,0.5)';
      ctx.textAlign = 'center'; ctx.shadowBlur = 0;
      ctx.fillText('SONAR ACTIVE', cx, SIZE - 10);

      angleRef.current += speed;
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [state]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={280} height={280}
        className={`${styles.canvas} ${state === 'scanning' ? styles.scanning : ''}`} />
      <div className={styles.statusRow}>
        <span className={`${styles.statusDot} ${state === 'mine' ? styles.dotMine : state === 'rock' ? styles.dotRock : styles.dotIdle}`} />
        <span className={styles.statusText}>
          {state === 'scanning' ? 'SCANNING...' :
           state === 'rock' ? 'OBJECT IDENTIFIED \u2014 ROCK' :
           state === 'mine' ? 'HAZARD DETECTED \u2014 MINE' : 'SYSTEM READY'}
        </span>
      </div>
    </div>
  );
}

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectOverview from './components/ProjectOverview';
import DetectionInterface from './components/DetectionInterface';
import MLExplanation from './components/MLExplanation';
import ModelInsights from './components/ModelInsights';
import About from './components/About';
import './index.css';

function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '32px 24px',
      borderTop: '1px solid var(--border-glass)',
      background: '#010812',
      color: 'var(--text-muted)',
      fontSize: '0.8rem',
      letterSpacing: '0.04em',
    }}>
      <p><span style={{ color: 'var(--cyan-400)', fontWeight: 700 }}>SONAR SHIELD</span> · AI-Powered Rock vs Mine Detection · Logistic Regression</p>
      <p style={{ marginTop: 6, opacity: 0.5 }}>208 samples · 60 features · Predictions computed locally in your browser</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProjectOverview />
      <DetectionInterface />
      <MLExplanation />
      <ModelInsights />
      <About />
      <Footer />
    </>
  );
}

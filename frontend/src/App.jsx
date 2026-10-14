import { useState, useEffect } from 'react';
import Scene3D from './components/3d/Scene3D';
import Navigation from './components/sections/Navigation';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ScheduleSection from './components/sections/ScheduleSection';
import SpeakersSection from './components/sections/SpeakersSection';
import HighlightsSection from './components/sections/HighlightsSection';
import LimitedSeats from './components/sections/LimitedSeats';
import RegistrationSection from './components/sections/RegistrationSection';
import FaqSection from './components/sections/FaqSection';
import FinalSection from './components/sections/FinalSection';
import Lenis from 'lenis';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetFocus, setTargetFocus] = useState(null);

  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Track scroll progress for 3D scene (0 to 1)
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navigation />

      {/* Persistent Background 3D Scene with camera focus choreography */}
      <Scene3D progress={scrollProgress} targetFocus={targetFocus} />

      {/* HTML Content Overlay */}
      <main className="content-overlay">
        <HeroSection />
        <AboutSection />
        <ScheduleSection onFocusSession={setTargetFocus} />
        <SpeakersSection />
        <HighlightsSection onSelectTheme={setTargetFocus} />
        <LimitedSeats />
        <RegistrationSection />
        <FaqSection />
        <FinalSection />
      </main>
    </>
  );
}

export default App;

import { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingButtons from './components/FloatingButtons';

// Code-split below-the-fold sections for instant FCP and LCP
const PromoBanner = lazy(() => import('./components/PromoBanner'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Destinations = lazy(() => import('./components/Destinations'));
const WhyUs = lazy(() => import('./components/WhyUs'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const TravelThemes = lazy(() => import('./components/TravelThemes'));
const DestinationPackages = lazy(() => import('./components/DestinationPackages'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const [activePackageSlug, setActivePackageSlug] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#packages-')) {
        return hash.replace('#packages-', '');
      }
    }
    return null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#packages-')) {
        setActivePackageSlug(hash.replace('#packages-', ''));
      } else {
        setActivePackageSlug(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '#destinations';
    setActivePackageSlug(null);
  };

  const handleSelectForInquiry = (destName) => {
    window.location.hash = '#contact';
    setActivePackageSlug(null);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('select-destination', {
          detail: { destinationName: destName },
        })
      );
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Dedicated Destination Packages View when any destination button is clicked
  if (activePackageSlug) {
    return (
      <>
        <Navbar />
        <main>
          <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading {activePackageSlug} packages...</div>}>
            <DestinationPackages
              slug={activePackageSlug}
              onBack={handleBackToHome}
              onSelectForInquiry={handleSelectForInquiry}
            />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <FloatingButtons />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <PromoBanner />
          <About />
          <Services />
          <Destinations />
          <WhyUs />
          <Testimonials />
          <Contact />
          <TravelThemes />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <FloatingButtons />
    </>
  );
}

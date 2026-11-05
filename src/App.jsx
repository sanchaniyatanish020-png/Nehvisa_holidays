import { lazy, Suspense } from 'react';
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
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
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
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <FloatingButtons />
    </>
  );
}

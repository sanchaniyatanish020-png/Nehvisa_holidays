import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Destinations from './components/Destinations';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import MobileActionBar from './components/MobileActionBar';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Destinations />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <MobileActionBar />
    </>
  );
}


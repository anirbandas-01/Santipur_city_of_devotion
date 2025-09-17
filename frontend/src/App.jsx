import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
//import Slideshow from './components/Slideshow'
import HeroSection from './components/HeroSection'
import HistorySection from './components/HistorySection'
import CultureSection from './components/CultureSection'
import SareeSection from './components/SareeSection'
import DevotionSection from './components/DevotionSection'
import Footer from './components/Footer'
import './App.css'
import SlideshowSection from './components/SlideshowSection'

function App() {

   useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions);
    
    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    });
    
    // Cleanup observer on component unmount
    return () => {
      observer.disconnect()
    }
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-gray-50">
      <Navbar scrollToSection={scrollToSection} />
      
    {/*   <div className='mb-12'>
      <Slideshow />
      </div> */}

      <HeroSection scrollToSection={scrollToSection} />
      <SlideshowSection scrollToSection={scrollToSection} />
      <HistorySection />
      <CultureSection />
      <SareeSection />
      <DevotionSection />
      <Footer />
    </div>
  )

}

export default App;

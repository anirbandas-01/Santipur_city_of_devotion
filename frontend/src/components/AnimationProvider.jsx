import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AnimationProvider() {
  const location = useLocation();

  useEffect(() => {
    // Reset all scroll-reveal elements first
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      el.classList.remove('visible')
    })

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);
    
    // Observe all scroll-reveal elements after a small delay
    setTimeout(() => {
      document.querySelectorAll(".scroll-reveal").forEach(el => {
        observer.observe(el)
      });
    }, 100);
    
    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything visible
}
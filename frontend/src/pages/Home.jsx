import HeroSection from '../components/HeroSection';
import HistorySection from '../components/HistorySection';
import CultureSection from '../components/CultureSection';
import SareeSection from '../components/SareeSection';
import DevotionSection from '../components/DevotionSection';
import SlideshowSection from '../components/SlideshowSection';


export default function Home(){
    

  return (

      <div className="bg-gray-50">
        <HeroSection />
        <SlideshowSection />
        <HistorySection />
        <CultureSection />
        <SareeSection />
        <DevotionSection />
        
      
       </div>
       
    )
}
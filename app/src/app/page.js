import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeHeaderSection from '../components/Home-HeaderSection';
import FeaturedPlaces from '../components/FeaturedPlaces';
import FAQSection from '../components/FAQSection';

export default function Home() {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/images/brand/VivaCOL_Pattern-Flat_RGB_Grey-Scale-Light.png')",
        backgroundSize: '1000px',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="relative z-10">
        <Header />
        
        <main>
          {/* HERO SECTION  */}
          <HomeHeaderSection />

          {/* FEATURED  */}
          <FeaturedPlaces />
          
          {/* FAQ  */}
          <FAQSection />

        </main>
        
        <Footer />
      </div>
    </div>
  );
}
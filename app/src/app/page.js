import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeHeaderSection from '../components/Home-HeaderSection';

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
          {/* HERO SECTION - Yellow from left and right edges */}
          <HomeHeaderSection />
          
          {/* COLOMBIA STATES SHOWCASE - Blue from left and right edges */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 0% 50%, rgba(49, 52, 103, 0.85) 0%, transparent 15%), radial-gradient(circle at 100% 50%, rgba(49, 52, 103, 0.85) 0%, transparent 15%)'
            }}></div>
            <h2 className="relative text-3xl font-bold text-[#272953] z-10 drop-shadow-lg">Colombia States Showcase Coming Soon</h2>
          </section>
          
          {/* FAQ SECTION - Red from left and right edges */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 0% 50%, rgba(216, 65, 58, 0.85) 0%, transparent 15%), radial-gradient(circle at 100% 50%, rgba(216, 65, 58, 0.85) 0%, transparent 15%)'
            }}></div>
            <h2 className="relative text-3xl font-bold text-[#272953] z-10 drop-shadow-lg">FAQ Section Coming Soon</h2>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
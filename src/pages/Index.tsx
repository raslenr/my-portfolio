import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <Portfolio />
      <Services />
      <Testimonials />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Raslen <span className="text-yellow-400">Lakrach</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Creative Professional • Graphic Designer • Social Media Marketing Expert
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500">
                © 2024 Raslen Lakrach. All rights reserved. | Designed with passion and precision.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
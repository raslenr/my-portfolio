import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rotate-45"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-yellow-400 rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-yellow-400 rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="block">Raslen</span>
            <span className="block text-yellow-400">Lakrach</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Creative Professional
          </p>
          
          <p className="text-lg text-gray-400 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            Graphic Designer • Social Media Marketing Expert
          </p>

          {/* About Me Brief */}
          <div className="max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <p className="text-gray-300 text-lg leading-relaxed">
              Passionate creative professional with expertise in visual storytelling and digital marketing. 
              I transform ideas into compelling designs and strategic social media campaigns that drive engagement and results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
            <Button 
              onClick={() => scrollToSection('portfolio')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              View My Work
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline" 
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 text-lg transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown 
              className="w-8 h-8 text-yellow-400 mx-auto cursor-pointer hover:text-yellow-300 transition-colors"
              onClick={() => scrollToSection('skills')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
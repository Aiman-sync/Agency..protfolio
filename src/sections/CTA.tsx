import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Clock, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      const elements = contentRef.current?.querySelectorAll('.animate-item');
      if (elements) {
        gsap.fromTo(elements,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Orbiting decorations
      const orbs = orbsRef.current?.querySelectorAll('.orbit-orb');
      if (orbs) {
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            rotation: 360,
            duration: 15 + i * 5,
            repeat: -1,
            ease: 'none',
            transformOrigin: 'center center'
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-gradient-brand overflow-hidden"
    >
      {/* Animated Background Orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="orbit-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full" />
        </div>
        <div className="orbit-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-brand-orange/30 rounded-full" />
        </div>
        <div className="orbit-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
          <div className="absolute top-1/4 right-0 w-3 h-3 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/50 via-transparent to-brand-blue-dark/50" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Create Something{' '}
            <span className="text-brand-orange">Amazing?</span>
          </h2>

          {/* Subheadline */}
          <p className="animate-item text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help transform your brand and drive real business results.
          </p>

          {/* CTA Buttons */}
          <div className="animate-item flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-blue font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              View Our Work
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-item flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">Free consultation</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Shield className="w-5 h-5" />
              <span className="text-sm">No commitment required</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Response within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

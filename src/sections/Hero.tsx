import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);
  const floatingShapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation - staggered lines
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        gsap.fromTo(headlineLines,
          { x: -80, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          { 
            x: 0, 
            opacity: 1, 
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.7, 
            stagger: 0.1,
            ease: 'expo.out',
            delay: 0.5
          }
        );
      }

      // Subheadline animation
      gsap.fromTo(subheadlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 1 }
      );

      // CTA button animation
      gsap.fromTo(ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', delay: 1.2 }
      );

      // Social proof animation
      gsap.fromTo(socialProofRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'smooth', delay: 1.4 }
      );

      // Floating shapes animation
      const shapes = floatingShapesRef.current?.querySelectorAll('.floating-shape');
      if (shapes) {
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: `${20 + i * 5}`,
            rotation: `${5 + i * 3}`,
            duration: `${5 + i}`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-brand"
    >
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue-light/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue-pale/10 rounded-full blur-3xl" />
      </div>

      {/* Dot Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating Shapes */}
      <div ref={floatingShapesRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-shape absolute top-20 right-20 w-16 h-16 border-2 border-white/20 rounded-full" />
        <div className="floating-shape absolute top-40 right-40 w-8 h-8 bg-brand-orange/40 rounded-lg rotate-45" />
        <div className="floating-shape absolute bottom-32 right-32 w-12 h-12 border-2 border-white/20 rounded-xl" />
        <div className="floating-shape absolute top-1/3 right-1/4 w-6 h-6 bg-white/20 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Headline */}
            <div ref={headlineRef} className="space-y-1">
              <h1 className="headline-line text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                We Create
              </h1>
              <h1 className="headline-line text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight pl-4 md:pl-8">
                Digital
              </h1>
              <h1 className="headline-line text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight pl-8 md:pl-16">
                Experiences
              </h1>
              <h1 className="headline-line text-5xl md:text-6xl lg:text-7xl font-bold leading-tight pl-12 md:pl-24">
                <span className="text-brand-orange">That Matter</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p 
              ref={subheadlineRef}
              className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
            >
              Award-winning creative agency crafting brands, websites, and campaigns 
              that captivate audiences and drive measurable results.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-primary group animate-pulse-glow"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn-secondary"
              >
                View Our Work
              </button>
            </div>

            {/* Social Proof */}
            <div ref={socialProofRef} className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/60 mb-4">Trusted by 500+ brands worldwide</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-white/40">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">TechCorp</span>
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">InnovateLab</span>
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">GrowthCo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Decorative Elements */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-lg">
              {/* Main decorative circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              </div>
              
              {/* Center content */}
              <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">150+</div>
                    <div className="text-sm text-white/60">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-orange mb-1">98%</div>
                    <div className="text-sm text-white/60">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">12</div>
                    <div className="text-sm text-white/60">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-orange mb-1">25+</div>
                    <div className="text-sm text-white/60">Industry Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;

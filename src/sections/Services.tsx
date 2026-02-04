import { useEffect, useRef } from 'react';
import { Lightbulb, Monitor, TrendingUp, Video, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Lightbulb,
    title: 'Brand Strategy',
    description: 'We craft compelling brand narratives that resonate with your audience and differentiate you from competitors.',
    features: ['Brand Positioning', 'Visual Identity', 'Messaging Framework'],
    gradient: 'bg-gradient-orange',
    link: 'Explore Branding'
  },
  {
    icon: Monitor,
    title: 'Web Design',
    description: 'Beautiful, functional websites that convert visitors into customers through intuitive user experiences.',
    features: ['UI/UX Design', 'Responsive Development', 'Performance Optimization'],
    gradient: 'bg-gradient-brand',
    link: 'See Our Work'
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that reach the right people at the right time with the right message.',
    features: ['SEO & Content', 'Paid Advertising', 'Social Media'],
    gradient: 'bg-gradient-green',
    link: 'Learn More'
  },
  {
    icon: Video,
    title: 'Creative Production',
    description: 'High-impact video, photography, and motion graphics that tell your story with cinematic flair.',
    features: ['Video Production', 'Motion Graphics', 'Photography'],
    gradient: 'bg-gradient-purple',
    link: 'View Reel'
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation with 3D effect
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        cards.forEach((card, i) => {
          const rotateY = i === 0 ? -25 : i === 1 ? -8 : i === 2 ? 8 : 25;
          const translateX = i === 0 ? -100 : i === 3 ? 100 : 0;
          const translateY = i === 1 || i === 2 ? -50 : 0;

          gsap.fromTo(card,
            { 
              rotateY, 
              rotateX: 10,
              x: translateX,
              y: translateY,
              opacity: 0 
            },
            {
              rotateY: 0,
              rotateX: 0,
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              },
              delay: 0.5 + i * 0.1
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-blue/5 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-title">Services That Drive Growth</h2>
          <p className="section-subtitle mx-auto">
            From strategy to execution, we deliver comprehensive solutions tailored to your unique challenges.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 perspective-1000"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-card transition-all duration-350 preserve-3d hover:shadow-elevated hover:-translate-y-3 hover:border-brand-blue/30"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${service.gradient} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li 
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-500 transition-all duration-300 group-hover:translate-x-1"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <a 
                href="#"
                className="inline-flex items-center gap-2 text-brand-blue font-semibold transition-all duration-300 group-hover:gap-3"
              >
                {service.link}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </a>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

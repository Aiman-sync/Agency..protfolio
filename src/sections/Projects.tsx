import { useEffect, useRef } from 'react';
import { ArrowRight, Award, TrendingUp, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    category: 'Brand Identity',
    title: 'Horizon Tech Rebrand',
    description: 'Complete brand transformation for a leading SaaS company, resulting in 40% increase in brand recognition.',
    image: '/project-1.jpg',
    stats: [
      { icon: TrendingUp, value: '40%', label: 'Brand Recognition' },
      { icon: Users, value: '2.5M', label: 'Impressions' },
      { icon: Award, value: 'Award', label: 'Winner' }
    ],
    cta: 'View Case Study'
  },
  {
    category: 'Web Design',
    title: 'Luxe Fashion E-commerce',
    description: 'Luxury shopping experience that increased conversions by 85% and average order value by 32%.',
    image: '/project-2.jpg',
    stats: [
      { icon: TrendingUp, value: '85%', label: 'Conversion Lift' },
      { icon: TrendingUp, value: '32%', label: 'AOV Increase' },
      { icon: Award, value: '4.9★', label: 'Rating' }
    ],
    cta: 'Explore Project'
  },
  {
    category: 'Digital Marketing',
    title: 'Green Energy Campaign',
    description: 'Integrated campaign that generated 10,000+ leads and established market leadership.',
    image: '/project-3.jpg',
    stats: [
      { icon: Users, value: '10K+', label: 'Leads' },
      { icon: TrendingUp, value: '500%', label: 'ROI' },
      { icon: Award, value: 'Viral', label: 'Reach' }
    ],
    cta: 'See Results'
  }
];

const Projects = () => {
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

      // Project cards animation
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card, i) => {
          const direction = i % 2 === 0 ? -1 : 1;
          
          gsap.fromTo(card,
            { 
              x: direction * 100,
              rotateY: direction * 15,
              opacity: 0 
            },
            {
              x: 0,
              rotateY: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          // Parallax effect for images
          const image = card.querySelector('.project-image');
          if (image) {
            gsap.to(image, {
              y: 60,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5
              }
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 bg-gray-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow text-brand-blue-pale">Our Work</span>
          <h2 className="section-title text-white">Projects That Inspire</h2>
          <p className="section-subtitle text-gray-400 mx-auto">
            Explore our portfolio of award-winning work across industries and disciplines.
          </p>
        </div>

        {/* Project Cards */}
        <div ref={cardsRef} className="space-y-16 lg:space-y-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center perspective-1000 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden rounded-2xl ${
                index % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                  <span className="text-sm font-medium text-white">{project.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-brand-blue-pale transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {project.stats.map((stat, i) => (
                    <div 
                      key={i}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                    >
                      <stat.icon className="w-5 h-5 text-brand-orange mx-auto mb-2" />
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-brand-blue-pale font-semibold transition-all duration-300 hover:gap-4 group/btn">
                  {project.cta}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { useEffect, useRef } from 'react';
import { Search, Map, Paintbrush, Rocket, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'We dive deep into your business, audience, and goals to uncover insights that drive strategy.',
    details: ['Stakeholder Interviews', 'Market Research', 'Competitive Analysis', 'User Insights'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Map,
    title: 'Strategize',
    description: 'We craft a comprehensive roadmap that aligns creative vision with business objectives.',
    details: ['Brand Positioning', 'Creative Direction', 'Project Planning', 'Success Metrics'],
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Paintbrush,
    title: 'Create',
    description: 'Our team brings concepts to life with meticulous attention to detail and craft.',
    details: ['Design Exploration', 'Content Creation', 'Development', 'Quality Assurance'],
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'We deploy with precision and provide ongoing support to ensure continued success.',
    details: ['Deployment', 'Performance Monitoring', 'Optimization', 'Growth Planning'],
    color: 'from-purple-500 to-purple-600'
  }
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
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

      // Timeline line draw animation
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Steps animation
      const stepElements = timelineRef.current?.querySelectorAll('.process-step');
      if (stepElements) {
        stepElements.forEach((step, i) => {
          const icon = step.querySelector('.step-icon');
          const content = step.querySelector('.step-content');
          const direction = i % 2 === 0 ? -1 : 1;

          // Icon pop animation
          gsap.fromTo(icon,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              },
              delay: 0.5 + i * 0.3
            }
          );

          // Content slide animation
          gsap.fromTo(content,
            { x: direction * 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              },
              delay: 0.6 + i * 0.3
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
      id="process"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-brand-blue/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-eyebrow">Our Process</span>
          <h2 className="section-title">How We Bring Ideas to Life</h2>
          <p className="section-subtitle mx-auto">
            A proven methodology that delivers exceptional results, every time.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block">
            <div 
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-blue-500 via-orange-500 to-purple-500 origin-top rounded-full"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`process-step relative grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Content */}
                <div 
                  className={`step-content space-y-4 ${
                    index % 2 === 1 ? 'lg:order-3 lg:text-left' : 'lg:text-right lg:order-1'
                  }`}
                >
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li 
                        key={i}
                        className={`flex items-center gap-2 text-sm text-gray-500 ${
                          index % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'
                        }`}
                      >
                        {index % 2 === 0 && <Check className="w-4 h-4 text-brand-blue" />}
                        {detail}
                        {index % 2 === 1 && <Check className="w-4 h-4 text-brand-blue" />}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Icon */}
                <div className="step-icon relative hidden lg:flex items-center justify-center order-2">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg z-10 transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  {/* Pulse Ring */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-30 animate-ping" style={{ animationDuration: '2s' }} />
                </div>

                {/* Mobile Icon */}
                <div className="flex lg:hidden items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>

                {/* Spacer for alternating layout */}
                <div className={`hidden lg:block ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-3'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

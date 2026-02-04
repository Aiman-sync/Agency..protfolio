import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Lumina transformed our brand from forgettable to unforgettable. Their strategic approach and creative execution exceeded every expectation.",
    author: "Sarah Chen",
    role: "CEO, Horizon Tech",
    avatar: "/avatar-1.jpg"
  },
  {
    quote: "The website Lumina created increased our conversions by 150%. They truly understand how to blend beauty with functionality.",
    author: "Michael Torres",
    role: "Marketing Director, Luxe Fashion",
    avatar: "/avatar-2.jpg"
  },
  {
    quote: "Working with Lumina felt like having an extension of our own team. They cared about our success as much as we do.",
    author: "Emily Watson",
    role: "Founder, Green Energy Co",
    avatar: "/avatar-3.jpg"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

      // Carousel animation
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.4
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const getSlideStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + testimonials.length) % testimonials.length);
    
    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) translateZ(100px) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 3
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -2) {
      return {
        transform: 'translateX(80%) translateZ(-100px) scale(0.8) rotateY(-25deg)',
        opacity: 0.5,
        zIndex: 1
      };
    } else {
      return {
        transform: 'translateX(-80%) translateZ(-100px) scale(0.8) rotateY(25deg)',
        opacity: 0.5,
        zIndex: 1
      };
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Background Quote Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Quote className="w-64 h-64 text-brand-blue/5 rotate-180" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle mx-auto">
            Don't just take our word for it — hear from the brands we've helped transform.
          </p>
        </div>

        {/* 3D Carousel */}
        <div 
          ref={carouselRef}
          className="relative max-w-4xl mx-auto perspective-1000"
        >
          {/* Slides Container */}
          <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="absolute w-full max-w-2xl px-4 transition-all duration-800 ease-expo-out preserve-3d"
                style={getSlideStyle(index)}
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-gray-100">
                  {/* Quote */}
                  <Quote className="w-10 h-10 text-brand-blue/20 mb-6" />
                  
                  <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-blue/20"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-gray-600 hover:text-brand-blue hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 800);
                    }
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-brand-blue' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-gray-600 hover:text-brand-blue hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

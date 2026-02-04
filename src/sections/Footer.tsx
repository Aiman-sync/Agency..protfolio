import { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Instagram, Dribbble, Send, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { label: 'Brand Strategy', href: '#services' },
    { label: 'Web Design', href: '#services' },
    { label: 'Digital Marketing', href: '#services' },
    { label: 'Creative Production', href: '#services' }
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Team', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' }
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'Case Studies', href: '#projects' },
    { label: 'Guides', href: '#' },
    { label: 'FAQ', href: '#' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' }
  ]
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Dribbble, href: '#', label: 'Dribbble' }
];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      const elements = footerRef.current?.querySelectorAll('.footer-animate');
      if (elements) {
        gsap.fromTo(elements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'smooth',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Social icons pop animation
      const socials = footerRef.current?.querySelectorAll('.social-icon');
      if (socials) {
        gsap.fromTo(socials,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: 0.5
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-white border-t border-gray-100"
    >
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-orange to-brand-purple" />

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 pb-12 border-b border-gray-100">
          {/* Logo & Description */}
          <div className="footer-animate space-y-4">
            <a href="#" className="inline-block">
              <span className="text-2xl font-bold text-brand-blue">Lumina</span>
            </a>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Crafting digital experiences that inspire and convert. We transform brands 
              through innovative design and strategic thinking.
            </p>
          </div>

          {/* Newsletter */}
          <div className="footer-animate">
            <h4 className="font-semibold text-gray-900 mb-2">Stay Updated</h4>
            <p className="text-sm text-gray-500 mb-4">
              Get the latest insights on design, marketing, and growth.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  disabled={subscribed}
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  subscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-brand-blue text-white hover:bg-brand-blue-dark hover:shadow-lg'
                }`}
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Services */}
          <div className="footer-animate">
            <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-brand-blue transition-colors duration-200 text-sm link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer-animate">
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-brand-blue transition-colors duration-200 text-sm link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-animate">
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-brand-blue transition-colors duration-200 text-sm link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-animate">
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-brand-blue transition-colors duration-200 text-sm link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100">
          {/* Copyright */}
          <p className="footer-animate text-sm text-gray-500">
            © {new Date().getFullYear()} Lumina Creative Agency. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="social-icon w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-blue hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

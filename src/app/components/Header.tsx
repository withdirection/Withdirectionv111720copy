import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import logo from 'figma:asset/a02051aa7920cb2e55f1c766df7d44da614c796c.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Trigger loading animation
    setIsLoaded(true);

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Escape closes the menu, and focus returns to the button that opened it —
  // otherwise keyboard users are stranded with focus on a hidden element.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 bg-[#14213D] backdrop-blur-sm shadow-lg z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-0'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center gap-3 transition-all duration-300 ${
          isScrolled ? 'h-20 md:h-28' : 'h-24 md:h-40'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`flex items-center group transform transition-all duration-500 ${
                isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}
              aria-label="WITHdirection home"
            >
              <img 
                src={logo} 
                alt="WITHdirection" 
                className={`w-auto max-w-[65vw] object-contain transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-110 ${
                  isScrolled ? 'h-16 md:h-28' : 'h-20 md:h-40'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-500 delay-100 ${
            isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}>
            <Link
              to="/about"
              className="text-white hover:text-[#00A9E0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#0078B4] after:transition-all hover:after:w-full"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-[#00A9E0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#0078B4] after:transition-all hover:after:w-full"
            >
              Services
            </Link>
            <Link
              to="/community"
              className="text-white hover:text-[#00A9E0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#0078B4] after:transition-all hover:after:w-full"
            >
              Community
            </Link>
            <Link
              to="/resources"
              className="text-white hover:text-[#00A9E0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#0078B4] after:transition-all hover:after:w-full"
            >
              Resources
            </Link>
            <Link
              to="/portal"
              className="text-white hover:text-[#00A9E0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#0078B4] after:transition-all hover:after:w-full"
            >
              Portal
            </Link>
            <Link
              to="/services"
              className="bg-[#0078B4] text-white px-4 py-2 rounded-md hover:bg-[#B52ADC] transition-all transform hover:scale-105 hover:shadow-lg max-w-[100px] text-center leading-tight"
            >
              Request Services
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className={`md:hidden flex-shrink-0 p-2 rounded-md text-white hover:bg-white/10 transition-all duration-500 delay-100 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-white/20 animate-in fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/about"
                className="text-white hover:text-[#00A9E0] transition-colors text-left hover:translate-x-2 transform duration-200"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-[#00A9E0] transition-colors text-left hover:translate-x-2 transform duration-200"
              >
                Services
              </Link>
              <Link
                to="/community"
                className="text-white hover:text-[#00A9E0] transition-colors text-left hover:translate-x-2 transform duration-200"
              >
                Community
              </Link>
              <Link
                to="/resources"
                className="text-white hover:text-[#00A9E0] transition-colors text-left hover:translate-x-2 transform duration-200"
              >
                Resources
              </Link>
              <Link
                to="/portal"
                className="text-white hover:text-[#00A9E0] transition-colors text-left hover:translate-x-2 transform duration-200"
              >
                Portal
              </Link>
              <Link
                to="/services"
                className="bg-[#0078B4] text-white px-4 py-2 rounded-md hover:bg-[#B52ADC] transition-all text-left transform hover:scale-105 max-w-[100px] text-center leading-tight"
              >
                Request Services
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
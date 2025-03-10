import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';


function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = ['COLLECTIONS', 'NEW ARRIVALS', 'GALLERY', 'BESTSELLERS', 'ABOUT'];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-slate-50">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-serif text-slate-800">ESSENCE</Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item}
                    to={item === 'GALLERY' ? '/gallery' : '#'}
                    className="text-slate-600 hover:text-slate-900 tracking-widest text-sm font-light transition-colors duration-200"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-full p-1"
                  aria-label="Open search"
                >
                  <Search className="w-6 h-6 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors duration-200" />
                </button>
                <ShoppingBag className="w-6 h-6 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors duration-200" />
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6 text-slate-600" />
                  ) : (
                    <Menu className="w-6 h-6 text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item}
                    to={item === 'GALLERY' ? '/gallery' : '#'}
                    className="block px-3 py-2 text-base font-light text-slate-600 hover:text-slate-900 tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Search Bar */}
        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={
            <div className="relative min-h-screen flex items-center">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-50 via-slate-50 to-rose-100 opacity-70"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-serif text-slate-800 mb-6 leading-tight">
                      Discover Your Signature Scent
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 font-light">
                      Curated fragrances for the modern individual
                    </p>
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-lg tracking-wider hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md">
                      EXPLORE
                    </button>
                  </div>
                  
                  <div className="hidden md:block">
                    <img
                      src="https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Luxury Perfume"
                      className="rounded-lg shadow-xl hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
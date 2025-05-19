
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-md w-full fixed top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1fcacf9f-c4be-4140-85d0-11491333b26d.png" 
              alt="Groovy Academia Logo" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-groovy font-medium">Home</Link>
            <Link to="/planos" className="text-white hover:text-groovy font-medium">Planos</Link>
            <Link to="/contato" className="text-white hover:text-groovy font-medium">Contato</Link>
            <Link to="/cliente/login">
              <Button className="bg-groovy hover:bg-groovy-dark text-white">
                Área do Cliente
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-groovy focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-groovy font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/planos" 
                className="text-white hover:text-groovy font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
              <Link 
                to="/contato" 
                className="text-white hover:text-groovy font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <Link 
                to="/cliente/login"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="bg-groovy hover:bg-groovy-dark text-white w-full">
                  Área do Cliente
                </Button>
              </Link>
              <div className="text-xs text-white/70 border-t border-white/20 pt-2 mt-2">
                <Link 
                  to="/admin/login" 
                  className="hover:text-groovy"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

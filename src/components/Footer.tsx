
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Groovy Academia</h3>
            <p className="text-gray-300 mb-4">
              Transforme seu corpo e sua vida em um ambiente energético e acolhedor.
            </p>
            <img 
              src="/lovable-uploads/3b284ef0-e51c-458d-b266-e14fb052e77b.png" 
              alt="Groovy Academia Logo" 
              className="h-16 w-auto"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/planos" className="text-gray-300 hover:text-white">Planos</Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white">Contato</Link>
              </li>
              <li>
                <Link to="/cliente/login" className="text-gray-300 hover:text-white">Área do Cliente</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <p className="text-gray-300">Rua da Academia, 123</p>
            <p className="text-gray-300">São Paulo - SP</p>
            <p className="text-gray-300 mt-2">contato@groovyacademia.com</p>
            <p className="text-gray-300">(11) 99999-9999</p>
            
            <div className="mt-4">
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-groovy hover:bg-groovy-dark text-white py-2 px-4 rounded-md transition-colors"
              >
                Fale conosco no WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Groovy Academia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

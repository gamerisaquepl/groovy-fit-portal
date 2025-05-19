
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background overlay with purple gradient */}
      <div 
        className="absolute inset-0 bg-black opacity-70 z-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(128,0,128,0.6) 0%, rgba(0,0,0,0.8) 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      {/* Background image (placeholder) */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-32 lg:py-40 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Transforme seu corpo na <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-groovy-light">Groovy Academia</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Um espaço moderno e energético para você alcançar seus objetivos fitness com equipamentos de alta qualidade e profissionais experientes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/planos">
              <Button size="lg" className="bg-groovy hover:bg-groovy-light text-white font-bold px-8">
                Ver Planos
              </Button>
            </Link>
            <Link to="/contato">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold px-8">
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

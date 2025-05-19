
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 groovy-gradient text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Venha transformar seu corpo com a gente!
        </h2>
        
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Não deixe para amanhã o que você pode começar hoje. 
          Sua jornada fitness começa na Groovy Academia.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contato">
            <Button size="lg" className="bg-white text-groovy hover:bg-gray-100 font-bold px-8">
              Começar Agora
            </Button>
          </Link>
          
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noreferrer"
          >
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold px-8">
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;

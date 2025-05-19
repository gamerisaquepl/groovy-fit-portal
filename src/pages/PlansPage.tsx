
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Plans from '@/components/Plans';
import CTA from '@/components/CTA';

const PlansPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="mt-16 pt-10">
        <div className="bg-gradient-to-r from-groovy-dark to-groovy text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Planos e Preços
            </h1>
            <p className="text-xl text-center max-w-2xl mx-auto">
              Escolha o plano ideal para o seu estilo de vida e comece já a sua transformação.
            </p>
          </div>
        </div>
        <Plans />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Posso trocar de plano?</h3>
                  <p className="text-gray-700">
                    Sim, você pode atualizar seu plano a qualquer momento, pagando a diferença proporcional ao tempo restante.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Qual a política de cancelamento?</h3>
                  <p className="text-gray-700">
                    Você pode cancelar seu plano com 30 dias de antecedência. Em caso de cancelamento, o valor é proporcional ao período utilizado.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">O treino personalizado está incluído em todos os planos?</h3>
                  <p className="text-gray-700">
                    Sim, todos os nossos planos incluem uma avaliação física e um treino personalizado desenvolvido por nossos professores.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Como faço para começar?</h3>
                  <p className="text-gray-700">
                    Basta escolher um plano e entrar em contato conosco. Marcaremos sua avaliação física e você já poderá começar a treinar no mesmo dia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default PlansPage;

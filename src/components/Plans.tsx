
import React from 'react';
import PlanCard from './PlanCard';

const Plans = () => {
  return (
    <section id="planos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Nossos Planos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta às suas necessidades e comece a transformação.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlanCard 
            duration="1 mês"
            price={150}
          />
          
          <PlanCard 
            duration="3 meses"
            price={140}
            discount="10"
          />
          
          <PlanCard 
            duration="6 meses"
            price={130}
            discount="20"
            featured={true}
          />
          
          <PlanCard 
            duration="1 ano"
            price={120}
            discount="30"
          />
        </div>
      </div>
    </section>
  );
};

export default Plans;

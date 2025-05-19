
import React from 'react';

const features = [
  {
    title: "Equipamentos Modernos",
    description: "Aparelhos de última geração para um treino eficiente e seguro."
  },
  {
    title: "Professores Qualificados",
    description: "Equipe de profissionais experientes prontos para te auxiliar."
  },
  {
    title: "Ambiente Energético",
    description: "Um espaço que motiva você a dar o seu melhor em cada treino."
  },
  {
    title: "Planos Flexíveis",
    description: "Opções que se adaptam à sua rotina e ao seu bolso."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Por que escolher a Groovy Academia?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Proporcionamos uma experiência única para você conquistar seus objetivos fitness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-groovy mb-4 flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

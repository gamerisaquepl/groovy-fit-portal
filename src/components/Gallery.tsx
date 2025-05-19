
import React from 'react';

const images = [
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    alt: "Academia moderna com equipamentos de musculação"
  },
  {
    url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    alt: "Área de peso livre com halteres"
  },
  {
    url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    alt: "Área de cardio com esteiras e elípticos"
  },
  {
    url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    alt: "Área para aulas coletivas"
  },
  {
    url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    alt: "Área de descanso e convivência"
  },
  {
    url: "https://images.unsplash.com/photo-1535743686920-55e4145369b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    alt: "Vestiários modernos e limpos"
  }
];

const Gallery = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Conheça Nossa Estrutura</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Um ambiente completo e moderno para você alcançar seus objetivos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg group h-64"
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

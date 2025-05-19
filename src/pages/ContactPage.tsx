
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="mt-16 flex-grow">
        <div className="bg-gradient-to-r from-groovy-dark to-groovy text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Entre em Contato
            </h1>
            <p className="text-xl text-center max-w-2xl mx-auto">
              Estamos aqui para responder suas dúvidas e ajudá-lo a começar sua jornada fitness.
            </p>
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Fale Conosco</h2>
                
                <p className="text-gray-700 mb-8">
                  Preencha o formulário ao lado e entraremos em contato o mais breve possível. 
                  Você também pode nos contatar diretamente pelos canais abaixo.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-groovy-light/20 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-groovy" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Endereço</h3>
                      <address className="not-italic text-gray-600">
                        Rua da Academia, 123<br />
                        São Paulo - SP<br />
                        CEP: 01234-567
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-groovy-light/20 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-groovy" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Telefone</h3>
                      <p className="text-gray-600">(11) 99999-9999</p>
                      <p className="text-gray-600">(11) 3333-3333</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-groovy-light/20 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-groovy" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">E-mail</h3>
                      <p className="text-gray-600">contato@groovyacademia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-groovy-light/20 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-groovy" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Horário de Funcionamento</h3>
                      <p className="text-gray-600">Segunda a Sexta: 06:00 - 22:00</p>
                      <p className="text-gray-600">Sábados: 08:00 - 18:00</p>
                      <p className="text-gray-600">Domingos e Feriados: 08:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Como Chegar</h2>
            <div className="bg-gray-300 w-full h-[400px] rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Mapa será inserido aqui</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

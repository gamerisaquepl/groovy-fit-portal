
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

const ClientLogin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="mt-16 flex-grow flex items-center py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <LoginForm type="client" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientLogin;

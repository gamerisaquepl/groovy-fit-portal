
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <Link to="/" className="mb-8">
        <img 
          src="/lovable-uploads/1fcacf9f-c4be-4140-85d0-11491333b26d.png" 
          alt="Groovy Academia Logo" 
          className="h-16 w-auto"
        />
      </Link>
      
      <LoginForm type="admin" />
      
      <div className="mt-8">
        <Link to="/" className="text-white hover:text-groovy transition-colors">
          ← Voltar para o site
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;

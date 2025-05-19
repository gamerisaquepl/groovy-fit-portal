
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <Link to="/" className="mb-8">
        <img 
          src="/lovable-uploads/3b284ef0-e51c-458d-b266-e14fb052e77b.png" 
          alt="Groovy Academia Logo" 
          className="h-16 w-auto"
        />
      </Link>
      
      <LoginForm type="admin" />
      
      <div className="mt-8">
        <Link to="/" className="text-groovy hover:text-groovy-dark transition-colors">
          ← Voltar para o site
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;

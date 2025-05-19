
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface PlanCardProps {
  duration: string;
  price: number;
  featured?: boolean;
  discount?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  duration,
  price,
  featured = false,
  discount
}) => {
  return (
    <div 
      className={`rounded-xl overflow-hidden transition-all duration-300 card-hover
        ${featured 
          ? 'border-2 border-groovy shadow-lg' 
          : 'border border-gray-200 shadow-md'}`}
    >
      {/* Card Header */}
      <div 
        className={`p-6 text-center 
          ${featured 
            ? 'bg-groovy text-white' 
            : 'bg-gray-100 text-gray-800'}`}
      >
        <h3 className="text-xl font-bold">{duration}</h3>
      </div>
      
      {/* Card Body */}
      <div className="p-6 bg-white">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 line-through mb-1">
            {discount ? `R$${(price + parseInt(discount)).toFixed(0)}/mês` : ''}
          </p>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">R${price}</span>
            <span className="text-gray-600 ml-1">/mês</span>
          </div>
          {discount && (
            <p className="text-green-600 font-medium text-sm mt-1">
              Economize R${discount}/mês
            </p>
          )}
        </div>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Acesso total à academia</span>
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Avaliação física</span>
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Treino personalizado</span>
          </li>
          {featured && (
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="font-medium">Acesso a aulas coletivas</span>
            </li>
          )}
        </ul>
        
        <Link 
          to={`/contato?plano=${encodeURIComponent(duration)}`}
          className="block"
        >
          <Button 
            className={`w-full ${featured
              ? 'bg-groovy hover:bg-groovy-dark text-white' 
              : 'bg-gray-800 hover:bg-gray-900 text-white'}`}
          >
            Tenho Interesse
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;

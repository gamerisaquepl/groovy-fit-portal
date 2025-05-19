
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  type: 'admin' | 'client';
}

const LoginForm: React.FC<LoginFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (type === 'admin') {
        // Demo admin credentials
        if (formData.username === 'admin' && formData.password === 'admin123') {
          toast({
            title: "Login bem-sucedido",
            description: "Bem-vindo ao painel administrativo.",
          });
          navigate('/admin/dashboard');
        } else {
          toast({
            title: "Erro de login",
            description: "Usuário ou senha incorretos.",
            variant: "destructive",
          });
        }
      } else {
        // For client login, we'll just accept any input for demo
        if (formData.username.trim()) {
          toast({
            title: "Login bem-sucedido",
            description: "Bem-vindo à sua área de cliente.",
          });
          navigate('/cliente/dashboard');
        } else {
          toast({
            title: "Erro de login",
            description: "Por favor, digite seu número de cadastro.",
            variant: "destructive",
          });
        }
      }
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {type === 'admin' ? 'Login Administrativo' : 'Área do Cliente'}
        </CardTitle>
        <CardDescription>
          {type === 'admin' 
            ? 'Acesse o painel administrativo da Groovy Academia.' 
            : 'Digite seu número de cadastro para acessar sua área.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">
                {type === 'admin' ? 'Usuário' : 'Número de Cadastro'}
              </Label>
              <Input 
                id="username"
                name="username"
                placeholder={type === 'admin' ? 'Digite seu usuário' : 'Digite seu número de cadastro'} 
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            {type === 'admin' && (
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password"
                  name="password"
                  type="password" 
                  placeholder="Digite sua senha" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="bg-groovy hover:bg-groovy-dark w-full mt-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Carregando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        {type === 'admin' ? (
          <p className="text-sm text-gray-500">
            Use admin/admin123 para demonstração
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            Use qualquer valor para demonstração
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

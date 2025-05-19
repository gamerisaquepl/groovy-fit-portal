
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: searchParams.get('plano') || '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Effect to set the plan from URL parameter
  useEffect(() => {
    if (searchParams.get('plano')) {
      setFormData(prev => ({
        ...prev,
        plan: searchParams.get('plano') || ''
      }));
    }
  }, [searchParams]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePlanChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      plan: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Responderemos em breve.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        plan: '',
        message: ''
      });
    }, 1500);
  };
  
  if (formSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Obrigado pelo contato!</CardTitle>
          <CardDescription className="text-center">
            Sua mensagem foi enviada com sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">
            Entraremos em contato o mais breve possível para discutir seu interesse na Groovy Academia.
          </p>
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block bg-groovy hover:bg-groovy-dark text-white py-3 px-6 rounded-md transition-colors"
          >
            Fale conosco no WhatsApp
          </a>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Entre em Contato</CardTitle>
        <CardDescription>
          Preencha o formulário abaixo e entraremos em contato o mais breve possível.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input 
                id="name"
                name="name"
                placeholder="Digite seu nome completo" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="Digite seu e-mail" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone"
                name="phone"
                placeholder="(00) 00000-0000" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="plan">Plano de interesse</Label>
              <Select 
                value={formData.plan} 
                onValueChange={handlePlanChange}
              >
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 mês">1 mês - R$150/mês</SelectItem>
                  <SelectItem value="3 meses">3 meses - R$140/mês</SelectItem>
                  <SelectItem value="6 meses">6 meses - R$130/mês</SelectItem>
                  <SelectItem value="1 ano">1 ano - R$120/mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <Textarea 
                id="message"
                name="message"
                placeholder="Digite sua mensagem" 
                value={formData.message}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-groovy hover:bg-groovy-dark w-full mt-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;

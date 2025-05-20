
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface ClientData {
  id: string;
  name: string;
  plan: string;
  startDate: string;
  endDate: string;
  age?: number;
  objective?: string;
  preExistingConditions?: string;
  injuries?: string;
  frequencyGoal?: string;
  email?: string;
  phone?: string;
}

interface EditClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: ClientData;
  onSave: (clientData: ClientData) => void;
}

const EditClientDialog = ({ isOpen, onClose, clientData, onSave }: EditClientDialogProps) => {
  const [formData, setFormData] = useState<ClientData>(clientData);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    
    toast({
      title: "Cliente atualizado",
      description: "Os dados do cliente foram atualizados com sucesso.",
      duration: 3000
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="id">Número de cadastro</Label>
              <Input
                id="id"
                value={formData.id}
                readOnly
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                value={formData.age || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="plan">Plano</Label>
              <Select 
                value={formData.plan} 
                onValueChange={(value) => handleSelectChange('plan', value)}
              >
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Selecione o plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 mês">1 mês</SelectItem>
                  <SelectItem value="3 meses">3 meses</SelectItem>
                  <SelectItem value="6 meses">6 meses</SelectItem>
                  <SelectItem value="1 ano">1 ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Data início</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Data fim</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="objective">Objetivo</Label>
            <Select 
              value={formData.objective || ''} 
              onValueChange={(value) => handleSelectChange('objective', value)}
            >
              <SelectTrigger id="objective">
                <SelectValue placeholder="Selecione o objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Perda de peso">Perda de peso</SelectItem>
                <SelectItem value="Ganho de massa muscular">Ganho de massa muscular</SelectItem>
                <SelectItem value="Condicionamento físico">Condicionamento físico</SelectItem>
                <SelectItem value="Melhora de flexibilidade">Melhora de flexibilidade</SelectItem>
                <SelectItem value="Reabilitação">Reabilitação</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preExistingConditions">Condições pré-existentes</Label>
            <Textarea
              id="preExistingConditions"
              name="preExistingConditions"
              value={formData.preExistingConditions || ''}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="injuries">Lesões atuais</Label>
            <Textarea
              id="injuries"
              name="injuries"
              value={formData.injuries || ''}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="frequencyGoal">Frequência pretendida</Label>
            <Select 
              value={formData.frequencyGoal || ''} 
              onValueChange={(value) => handleSelectChange('frequencyGoal', value)}
            >
              <SelectTrigger id="frequencyGoal">
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2 vezes por semana">1-2 vezes por semana</SelectItem>
                <SelectItem value="3-4 vezes por semana">3-4 vezes por semana</SelectItem>
                <SelectItem value="4 vezes por semana">4 vezes por semana</SelectItem>
                <SelectItem value="5 ou mais vezes por semana">5 ou mais vezes por semana</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="bg-groovy hover:bg-groovy-dark">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientDialog;

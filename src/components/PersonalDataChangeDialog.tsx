
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface PersonalDataChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: {
    name: string;
    age: number;
    objective: string;
    preExistingConditions: string;
    injuries: string;
    frequencyGoal: string;
  };
}

const PersonalDataChangeDialog = ({ isOpen, onClose, clientData }: PersonalDataChangeDialogProps) => {
  const [formData, setFormData] = useState({
    field: '',
    currentValue: '',
    newValue: '',
    reason: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the request to the server
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de alteração de dados foi enviada com sucesso!",
      duration: 3000
    });
    
    setFormData({ field: '', currentValue: '', newValue: '', reason: '' });
    onClose();
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.value;
    let currentValue = '';
    
    switch(field) {
      case 'name':
        currentValue = clientData.name;
        break;
      case 'objective':
        currentValue = clientData.objective;
        break;
      case 'preExistingConditions':
        currentValue = clientData.preExistingConditions;
        break;
      case 'injuries':
        currentValue = clientData.injuries;
        break;
      case 'frequencyGoal':
        currentValue = clientData.frequencyGoal;
        break;
      default:
        currentValue = '';
    }
    
    setFormData({
      ...formData,
      field,
      currentValue,
      newValue: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Alteração de Dados</DialogTitle>
          <DialogDescription>
            Informe qual dado você deseja alterar e o motivo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="field">Campo a alterar:</Label>
            <select 
              id="field"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={formData.field}
              onChange={handleFieldChange}
              required
            >
              <option value="">Selecione o campo</option>
              <option value="name">Nome completo</option>
              <option value="objective">Objetivo</option>
              <option value="preExistingConditions">Condições pré-existentes</option>
              <option value="injuries">Lesões</option>
              <option value="frequencyGoal">Frequência pretendida</option>
            </select>
          </div>
          
          {formData.field && (
            <>
              <div>
                <Label htmlFor="currentValue">Valor atual:</Label>
                <Input 
                  id="currentValue"
                  value={formData.currentValue}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <Label htmlFor="newValue">Novo valor:</Label>
                <Input 
                  id="newValue"
                  value={formData.newValue}
                  onChange={(e) => setFormData({...formData, newValue: e.target.value})}
                  required
                />
              </div>
            </>
          )}
          
          <div>
            <Label htmlFor="reason">Motivo da alteração:</Label>
            <Textarea 
              id="reason"
              placeholder="Por favor, descreva o motivo para alteração..."
              className="resize-none min-h-[80px]"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="bg-groovy hover:bg-groovy-dark">Enviar Solicitação</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalDataChangeDialog;

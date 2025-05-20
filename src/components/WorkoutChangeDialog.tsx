
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface WorkoutChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentWorkout: string;
}

const WorkoutChangeDialog = ({ isOpen, onClose, currentWorkout }: WorkoutChangeDialogProps) => {
  const [reason, setReason] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [changeType, setChangeType] = useState('modify');
  const [specificExercise, setSpecificExercise] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the request to the server
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de alteração de treino foi enviada com sucesso!",
      duration: 3000
    });
    
    setReason('');
    setPreferredDate('');
    setChangeType('modify');
    setSpecificExercise('');
    onClose();
  };

  const renderAdditionalFields = () => {
    switch (changeType) {
      case 'modify':
        return (
          <div>
            <Label htmlFor="exercise" className="text-sm font-medium mb-2 block">Exercício específico (opcional):</Label>
            <Input
              id="exercise"
              placeholder="Ex: Supino reto"
              value={specificExercise}
              onChange={(e) => setSpecificExercise(e.target.value)}
            />
          </div>
        );
      case 'swap':
        return (
          <div>
            <Label htmlFor="exercise" className="text-sm font-medium mb-2 block">Exercício a substituir:</Label>
            <Input
              id="exercise"
              placeholder="Ex: Supino reto"
              value={specificExercise}
              onChange={(e) => setSpecificExercise(e.target.value)}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Alteração de Treino</DialogTitle>
          <DialogDescription>
            Informe o motivo para a solicitação de alteração do treino.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="current-workout" className="text-sm font-medium mb-2">Treino atual:</Label>
            <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100">{currentWorkout}</p>
          </div>
          
          <div>
            <Label htmlFor="change-type" className="text-sm font-medium mb-2">Tipo de alteração:</Label>
            <Select value={changeType} onValueChange={setChangeType} required>
              <SelectTrigger id="change-type">
                <SelectValue placeholder="Selecione o tipo de alteração" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modify">Modificar intensidade/séries/repetições</SelectItem>
                <SelectItem value="swap">Substituir exercício</SelectItem>
                <SelectItem value="new">Solicitar novo treino completo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {renderAdditionalFields()}
          
          <div>
            <Label htmlFor="preferred-date" className="text-sm font-medium mb-2">Data preferencial para mudança:</Label>
            <Input
              id="preferred-date"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="reason" className="text-sm font-medium mb-2">Motivo da alteração:</Label>
            <Textarea 
              id="reason"
              placeholder="Por favor, descreva o motivo para alteração do seu treino atual..."
              className="resize-none min-h-[120px]"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
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

export default WorkoutChangeDialog;

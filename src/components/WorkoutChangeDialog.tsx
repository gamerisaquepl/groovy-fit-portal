
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface WorkoutChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentWorkout: string;
}

const WorkoutChangeDialog = ({ isOpen, onClose, currentWorkout }: WorkoutChangeDialogProps) => {
  const [reason, setReason] = useState('');
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
    onClose();
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
            <p className="text-sm font-medium mb-2">Treino atual:</p>
            <p className="text-sm bg-gray-50 p-2 rounded">{currentWorkout}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Motivo da alteração:</p>
            <Textarea 
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

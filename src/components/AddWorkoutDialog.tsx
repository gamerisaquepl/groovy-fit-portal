
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

interface Workout {
  id: number;
  title: string;
  exercises: Exercise[];
}

interface AddWorkoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (workout: Workout) => void;
}

const AddWorkoutDialog = ({ isOpen, onClose, onAdd }: AddWorkoutDialogProps) => {
  const [workout, setWorkout] = useState<Workout>({
    id: Date.now(),
    title: '',
    exercises: []
  });
  
  const { toast } = useToast();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, title: e.target.value });
  };

  const handleAddExercise = () => {
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { name: '', sets: '', reps: '' }]
    });
  };

  const handleRemoveExercise = (index: number) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises.splice(index, 1);
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises[index][field] = value;
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the new workout with unique ID
    onAdd({
      ...workout,
      id: Date.now()
    });
    
    toast({
      title: "Treino adicionado",
      description: "O novo treino foi adicionado com sucesso.",
      duration: 3000
    });
    
    // Reset form
    setWorkout({
      id: Date.now(),
      title: '',
      exercises: []
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Treino</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nome do treino</Label>
            <Input
              id="title"
              value={workout.title}
              onChange={handleTitleChange}
              placeholder="Ex: Treino A - Peito e Tríceps"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Exercícios</Label>
              <Button 
                type="button"
                onClick={handleAddExercise}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Adicionar exercício
              </Button>
            </div>
            
            <div className="space-y-3 mt-2">
              {workout.exercises.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Nenhum exercício adicionado ainda</p>
              ) : (
                workout.exercises.map((exercise, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2">
                        <Label htmlFor={`exercise-${index}`} className="text-xs mb-1 block">
                          Nome do exercício
                        </Label>
                        <Input
                          id={`exercise-${index}`}
                          value={exercise.name}
                          onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                          placeholder="Ex: Supino reto"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`sets-${index}`} className="text-xs mb-1 block">
                          Séries
                        </Label>
                        <Input
                          id={`sets-${index}`}
                          value={exercise.sets}
                          onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                          placeholder="Ex: 4"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Label htmlFor={`reps-${index}`} className="text-xs mb-1 block">
                          Repetições
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`reps-${index}`}
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                            placeholder="Ex: 12"
                            required
                          />
                          <Button
                            type="button"
                            onClick={() => handleRemoveExercise(index)}
                            variant="ghost"
                            size="sm"
                            className="h-10 text-destructive hover:text-destructive/90"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button 
              type="submit" 
              className="bg-groovy hover:bg-groovy-dark"
              disabled={workout.title.trim() === '' || workout.exercises.length === 0}
            >
              Adicionar Treino
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkoutDialog;

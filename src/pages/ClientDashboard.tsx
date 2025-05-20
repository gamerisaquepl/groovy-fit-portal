
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import WorkoutChangeDialog from '@/components/WorkoutChangeDialog';
import PersonalDataChangeDialog from '@/components/PersonalDataChangeDialog';
import { useToast } from '@/components/ui/use-toast';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeWorkout, setActiveWorkout] = useState(0);
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState(false);
  const [isDataDialogOpen, setIsDataDialogOpen] = useState(false);
  
  // Mock data for demonstration
  const clientData = {
    name: "João Silva",
    id: "GYM12345",
    plan: "6 meses",
    planExpiry: "2023-12-31",
    age: 28,
    objective: "Ganho de massa muscular",
    preExistingConditions: "Nenhuma",
    injuries: "Nenhuma",
    frequencyGoal: "4 vezes por semana"
  };

  const workoutData = [
    {
      name: "Treino A - Peitoral e Tríceps",
      exercises: [
        { name: "Supino reto", sets: "4", reps: "12" },
        { name: "Supino inclinado", sets: "3", reps: "12" },
        { name: "Crucifixo", sets: "3", reps: "15" },
        { name: "Tríceps corda", sets: "4", reps: "15" },
        { name: "Tríceps francês", sets: "3", reps: "12" },
        { name: "Mergulho no banco", sets: "3", reps: "Falha" },
      ]
    },
    {
      name: "Treino B - Costas e Bíceps",
      exercises: [
        { name: "Puxada frontal", sets: "4", reps: "12" },
        { name: "Remada curvada", sets: "3", reps: "12" },
        { name: "Puxada alta", sets: "3", reps: "10" },
        { name: "Rosca direta", sets: "3", reps: "12" },
        { name: "Rosca martelo", sets: "3", reps: "12" },
        { name: "Rosca concentrada", sets: "3", reps: "10" },
      ]
    },
    {
      name: "Treino C - Pernas e Ombros",
      exercises: [
        { name: "Agachamento", sets: "4", reps: "12" },
        { name: "Leg press", sets: "4", reps: "12" },
        { name: "Cadeira extensora", sets: "3", reps: "15" },
        { name: "Desenvolvimento", sets: "4", reps: "12" },
        { name: "Elevação lateral", sets: "3", reps: "12" },
        { name: "Panturrilha em pé", sets: "4", reps: "20" },
      ]
    }
  ];

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seu arquivo PDF está sendo gerado e será baixado automaticamente.",
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="mt-16 flex-grow py-10">
        <div className="bg-gradient-to-r from-groovy-dark to-groovy text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Olá, {clientData.name}!</h1>
                <p>Bem-vindo à sua área de cliente</p>
              </div>
              <Button 
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => navigate('/cliente/login')}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto md:grid-cols-2">
              <TabsTrigger value="info">Meus Dados</TabsTrigger>
              <TabsTrigger value="workout">Meus Treinos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                  <CardDescription>
                    Seus dados cadastrados na Groovy Academia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Nome completo</p>
                        <p className="font-medium">{clientData.name}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Número de cadastro</p>
                        <p className="font-medium">{clientData.id}</p>
                      </div>
                    </div>
                    
                    <div className="groovy-gradient p-4 rounded-md text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Plano Atual: {clientData.plan}</p>
                          <p className="text-sm">Válido até: {clientData.planExpiry}</p>
                        </div>
                        <div className="bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                          Ativo
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Idade</p>
                        <p className="font-medium">{clientData.age} anos</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Objetivo</p>
                        <p className="font-medium">{clientData.objective}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Condições pré-existentes</p>
                        <p className="font-medium">{clientData.preExistingConditions}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Lesões atuais</p>
                        <p className="font-medium">{clientData.injuries}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md col-span-full">
                        <p className="text-sm text-gray-500">Frequência pretendida</p>
                        <p className="font-medium">{clientData.frequencyGoal}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsDataDialogOpen(true)}
                      >
                        Solicitar Alteração de Dados
                      </Button>
                      <Button 
                        className="bg-groovy hover:bg-groovy-dark flex-1"
                        onClick={handleExport}
                      >
                        Exportar Dados (PDF)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="workout" className="mt-6">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {workoutData.map((workout, index) => (
                    <Button
                      key={index}
                      variant={activeWorkout === index ? "default" : "outline"}
                      onClick={() => setActiveWorkout(index)}
                      className={activeWorkout === index ? "bg-groovy hover:bg-groovy-dark" : ""}
                    >
                      {workout.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>{workoutData[activeWorkout].name}</CardTitle>
                  <CardDescription>
                    Seu treino personalizado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-3 px-4 border-b text-left">Exercício</th>
                            <th className="py-3 px-4 border-b text-center">Séries</th>
                            <th className="py-3 px-4 border-b text-center">Repetições</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workoutData[activeWorkout].exercises.map((exercise, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="py-3 px-4 border-b">{exercise.name}</td>
                              <td className="py-3 px-4 border-b text-center">{exercise.sets}</td>
                              <td className="py-3 px-4 border-b text-center">{exercise.reps}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-bold mb-2">Observações:</p>
                      <p className="text-gray-700">
                        Descanso entre séries: 45-60 segundos. Faça aquecimento adequado antes de começar.
                        Respiração controlada durante os exercícios.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsWorkoutDialogOpen(true)}
                      >
                        Solicitar Alteração de Treino
                      </Button>
                      <Button 
                        className="bg-groovy hover:bg-groovy-dark flex-1" 
                        onClick={handleExport}
                      >
                        Exportar Treino (PDF)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      
      {/* Dialogs */}
      <WorkoutChangeDialog
        isOpen={isWorkoutDialogOpen}
        onClose={() => setIsWorkoutDialogOpen(false)}
        currentWorkout={workoutData[activeWorkout].name}
      />
      
      <PersonalDataChangeDialog
        isOpen={isDataDialogOpen}
        onClose={() => setIsDataDialogOpen(false)}
        clientData={clientData}
      />
    </div>
  );
};

export default ClientDashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Plus, 
  FileText,
  Search,
  LogOut,
  Eye,
  Edit,
  Trash,
  Calendar
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      title: "Treino A - Peitoral e Tríceps",
      exercises: [
        { name: "Supino reto", sets: "4", reps: "12" },
        { name: "Supino inclinado", sets: "3", reps: "12" },
        { name: "Crucifixo", sets: "3", reps: "15" }
      ]
    }
  ]);
  
  // Mock data for demonstration
  const clients = [
    { id: "GYM12345", name: "João Silva", plan: "6 meses", startDate: "2023-07-01", endDate: "2023-12-31" },
    { id: "GYM12346", name: "Maria Santos", plan: "1 ano", startDate: "2023-06-15", endDate: "2024-06-15" },
    { id: "GYM12347", name: "Pedro Lima", plan: "3 meses", startDate: "2023-08-01", endDate: "2023-11-01" },
    { id: "GYM12348", name: "Ana Oliveira", plan: "1 mês", startDate: "2023-09-01", endDate: "2023-10-01" },
    { id: "GYM12349", name: "Carlos Souza", plan: "1 ano", startDate: "2023-05-15", endDate: "2024-05-15" },
  ];
  
  const clientWorkouts = {
    "GYM12345": [
      {
        id: 1,
        title: "Treino A - Peito e Tríceps",
        exercises: [
          { name: "Supino reto", sets: "4", reps: "12" },
          { name: "Supino inclinado", sets: "3", reps: "12" },
          { name: "Crucifixo", sets: "3", reps: "15" },
        ]
      },
      {
        id: 2,
        title: "Treino B - Costas e Bíceps",
        exercises: [
          { name: "Puxada frontal", sets: "4", reps: "12" },
          { name: "Remada curvada", sets: "3", reps: "12" },
          { name: "Rosca direta", sets: "3", reps: "15" },
        ]
      }
    ]
  };
  
  const handleAddWorkout = () => {
    setWorkouts([
      ...workouts,
      {
        id: workouts.length + 1,
        title: `Novo Treino ${workouts.length + 1}`,
        exercises: []
      }
    ]);
    
    toast({
      title: "Treino adicionado",
      description: "Um novo treino foi adicionado. Adicione exercícios a ele.",
      duration: 3000
    });
  };
  
  const handleAddExercise = (workoutIndex) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[workoutIndex].exercises.push({
      name: "",
      sets: "",
      reps: ""
    });
    setWorkouts(updatedWorkouts);
  };
  
  const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[workoutIndex].exercises.splice(exerciseIndex, 1);
    setWorkouts(updatedWorkouts);
  };
  
  const handleRemoveWorkout = (workoutIndex) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(workoutIndex, 1);
    setWorkouts(updatedWorkouts);
    
    toast({
      title: "Treino removido",
      description: "O treino foi removido com sucesso.",
      duration: 3000
    });
  };
  
  const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[workoutIndex].exercises[exerciseIndex][field] = value;
    setWorkouts(updatedWorkouts);
  };
  
  const handleWorkoutTitleChange = (workoutIndex, value) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[workoutIndex].title = value;
    setWorkouts(updatedWorkouts);
  };
  
  const handleViewWorkout = (clientId) => {
    setSelectedClient(clientId);
    setActiveTab('view-workouts');
  };
  
  const handleLogout = () => {
    navigate('/admin/login');
  };
  
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block">
        <div className="p-6">
          <img 
            src="/lovable-uploads/1fcacf9f-c4be-4140-85d0-11491333b26d.png" 
            alt="Groovy Academia Logo" 
            className="h-10 w-auto mx-auto mb-6"
          />
          <h2 className="text-xl font-bold text-center">Painel Admin</h2>
        </div>
        
        <nav className="mt-6">
          <div 
            className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${activeTab === 'clients' ? 'bg-groovy text-white' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('clients')}
          >
            <Users size={20} className="mr-3" />
            <span>Clientes</span>
          </div>
          
          <div 
            className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${activeTab === 'new-client' ? 'bg-groovy text-white' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('new-client')}
          >
            <Plus size={20} className="mr-3" />
            <span>Novo Cliente</span>
          </div>
          
          <div 
            className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${activeTab === 'workouts' ? 'bg-groovy text-white' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('workouts')}
          >
            <FileText size={20} className="mr-3" />
            <span>Cadastrar Treino</span>
          </div>
          
          {selectedClient && (
            <div 
              className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${activeTab === 'view-workouts' ? 'bg-groovy text-white' : 'hover:bg-gray-800'}`}
              onClick={() => setActiveTab('view-workouts')}
            >
              <Calendar size={20} className="mr-3" />
              <span>Ver Treinos</span>
            </div>
          )}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button 
            variant="outline" 
            className="w-full justify-start bg-transparent border-white/20 text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            <span>Sair</span>
          </Button>
        </div>
      </aside>
      
      {/* Mobile Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="flex justify-around">
          <button 
            className={`flex flex-col items-center py-3 px-5 ${activeTab === 'clients' ? 'text-groovy' : 'text-gray-500'}`}
            onClick={() => setActiveTab('clients')}
          >
            <Users size={20} />
            <span className="text-xs mt-1">Clientes</span>
          </button>
          
          <button 
            className={`flex flex-col items-center py-3 px-5 ${activeTab === 'new-client' ? 'text-groovy' : 'text-gray-500'}`}
            onClick={() => setActiveTab('new-client')}
          >
            <Plus size={20} />
            <span className="text-xs mt-1">Novo</span>
          </button>
          
          <button 
            className={`flex flex-col items-center py-3 px-5 ${activeTab === 'workouts' ? 'text-groovy' : 'text-gray-500'}`}
            onClick={() => setActiveTab('workouts')}
          >
            <FileText size={20} />
            <span className="text-xs mt-1">Treinos</span>
          </button>
          
          <button 
            className="flex flex-col items-center py-3 px-5 text-gray-500"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Sair</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow p-6 pb-20 md:pb-6 overflow-y-auto">
        {activeTab === 'clients' && (
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Gerenciamento de Clientes</h1>
                <p className="text-gray-600">Visualize e gerencie todos os clientes da Groovy Academia.</p>
              </div>
              
              <div className="w-full md:w-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Buscar cliente..." 
                  className="pl-10 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nº Cadastro</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Data Início</TableHead>
                        <TableHead>Data Fim</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients
                        .filter(client => 
                          client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.id.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.id}</TableCell>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.plan}</TableCell>
                          <TableCell>{client.startDate}</TableCell>
                          <TableCell>{client.endDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit size={16} className="mr-1" />
                                Editar
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleViewWorkout(client.id)}
                              >
                                <Eye size={16} className="mr-1" />
                                Ver Treinos
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'new-client' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Cadastrar Novo Cliente</h1>
              <p className="text-gray-600">Preencha os dados para registrar um novo cliente na academia.</p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" placeholder="Digite o nome completo" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="email@exemplo.com" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="birthdate">Data de nascimento</Label>
                      <Input id="birthdate" type="date" />
                    </div>
                    
                    <div className="grid gap-2 col-span-full">
                      <Label htmlFor="objective">Objetivo na academia</Label>
                      <Select>
                        <SelectTrigger id="objective">
                          <SelectValue placeholder="Selecione o objetivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weight-loss">Perda de peso</SelectItem>
                          <SelectItem value="muscle-gain">Ganho de massa muscular</SelectItem>
                          <SelectItem value="conditioning">Condicionamento físico</SelectItem>
                          <SelectItem value="flexibility">Melhora de flexibilidade</SelectItem>
                          <SelectItem value="rehabilitation">Reabilitação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="diseases">Doenças pré-existentes</Label>
                      <Textarea id="diseases" placeholder="Informe se há alguma doença pré-existente" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="injuries">Lesões atuais</Label>
                      <Textarea id="injuries" placeholder="Informe se há alguma lesão atual" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Já praticou exercícios antes?</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input type="radio" id="exercise-yes" name="exercised-before" className="mr-2" />
                          <Label htmlFor="exercise-yes">Sim</Label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="exercise-no" name="exercised-before" className="mr-2" />
                          <Label htmlFor="exercise-no">Não</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="frequency">Frequência pretendida</Label>
                      <Select>
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 vezes por semana</SelectItem>
                          <SelectItem value="3-4">3-4 vezes por semana</SelectItem>
                          <SelectItem value="5+">5 ou mais vezes por semana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="plan">Plano escolhido</Label>
                      <Select>
                        <SelectTrigger id="plan">
                          <SelectValue placeholder="Selecione o plano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-month">1 mês</SelectItem>
                          <SelectItem value="3-months">3 meses</SelectItem>
                          <SelectItem value="6-months">6 meses</SelectItem>
                          <SelectItem value="1-year">1 ano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-groovy hover:bg-groovy-dark">Cadastrar Cliente</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'workouts' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Cadastrar Treino</h1>
              <p className="text-gray-600">Crie e atribua treinos personalizados para os clientes.</p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="client-id">Número de cadastro do cliente</Label>
                    <Input id="client-id" placeholder="Digite o número de cadastro do cliente" />
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-lg font-medium">Treinos</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddWorkout}
                    >
                      <Plus size={16} className="mr-1" /> 
                      Adicionar treino
                    </Button>
                  </div>
                  
                  {workouts.map((workout, workoutIndex) => (
                    <Card key={workout.id} className="mb-8 border-2 border-gray-200">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <Input 
                              value={workout.title} 
                              onChange={(e) => handleWorkoutTitleChange(workoutIndex, e.target.value)}
                              className="font-bold text-lg" 
                              placeholder="Nome do treino"
                            />
                          </div>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveWorkout(workoutIndex)}
                            className="ml-2"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <Label>Exercícios</Label>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAddExercise(workoutIndex)}
                            >
                              <Plus size={16} className="mr-1" /> 
                              Adicionar exercício
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            {workout.exercises.map((exercise, exerciseIndex) => (
                              <div className="bg-gray-50 p-4 rounded-md" key={exerciseIndex}>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div className="col-span-2">
                                    <Label htmlFor={`exercise-${workoutIndex}-${exerciseIndex}`} className="text-sm">Nome do exercício</Label>
                                    <Input 
                                      id={`exercise-${workoutIndex}-${exerciseIndex}`} 
                                      placeholder="Ex: Supino reto" 
                                      className="mt-1"
                                      value={exercise.name}
                                      onChange={(e) => handleExerciseChange(workoutIndex, exerciseIndex, 'name', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`sets-${workoutIndex}-${exerciseIndex}`} className="text-sm">Séries</Label>
                                    <Input 
                                      id={`sets-${workoutIndex}-${exerciseIndex}`} 
                                      placeholder="Ex: 4" 
                                      className="mt-1"
                                      value={exercise.sets}
                                      onChange={(e) => handleExerciseChange(workoutIndex, exerciseIndex, 'sets', e.target.value)}
                                    />
                                  </div>
                                  <div className="relative">
                                    <Label htmlFor={`reps-${workoutIndex}-${exerciseIndex}`} className="text-sm">Repetições</Label>
                                    <div className="flex items-center">
                                      <Input 
                                        id={`reps-${workoutIndex}-${exerciseIndex}`} 
                                        placeholder="Ex: 12" 
                                        className="mt-1"
                                        value={exercise.reps}
                                        onChange={(e) => handleExerciseChange(workoutIndex, exerciseIndex, 'reps', e.target.value)}
                                      />
                                      <Button 
                                        type="button" 
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveExercise(workoutIndex, exerciseIndex)}
                                        className="ml-2 mt-1 h-10 text-destructive hover:text-destructive/90"
                                      >
                                        <Trash size={16} />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Ex: Descanso entre séries de 45-60 segundos. Faça aquecimento adequado antes de começar."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button type="button" variant="outline">
                      Visualizar Treino
                    </Button>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline">
                        Exportar (PDF)
                      </Button>
                      <Button className="bg-groovy hover:bg-groovy-dark">
                        Salvar Treino
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'view-workouts' && selectedClient && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveTab('clients')}
                  className="mb-2"
                >
                  <span className="mr-1">←</span> Voltar
                </Button>
              </div>
              <h1 className="text-2xl font-bold">Treinos do Cliente</h1>
              <p className="text-gray-600">
                Cliente: {clients.find(c => c.id === selectedClient)?.name} ({selectedClient})
              </p>
            </div>
            
            {clientWorkouts[selectedClient] ? (
              <div className="space-y-6">
                {clientWorkouts[selectedClient].map((workout, index) => (
                  <Card key={index} className="mb-6">
                    <CardHeader>
                      <CardTitle>{workout.title}</CardTitle>
                      <CardDescription>
                        {workout.exercises.length} exercícios
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Exercício</TableHead>
                            <TableHead>Séries</TableHead>
                            <TableHead>Repetições</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {workout.exercises.map((exercise, i) => (
                            <TableRow key={i}>
                              <TableCell>{exercise.name}</TableCell>
                              <TableCell>{exercise.sets}</TableCell>
                              <TableCell>{exercise.reps}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit size={16} className="mr-2" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Exportar (PDF)
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <div className="flex justify-end">
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Adicionar Novo Treino
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Este cliente ainda não possui treinos cadastrados.</p>
                    <Button className="mt-4">
                      <Plus size={16} className="mr-2" />
                      Cadastrar Novo Treino
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

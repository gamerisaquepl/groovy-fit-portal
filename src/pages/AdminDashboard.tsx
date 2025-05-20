import React, { useState, useEffect } from 'react';
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
  Calendar,
  BellRing
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import EditClientDialog from '@/components/EditClientDialog';
import EditWorkoutDialog from '@/components/EditWorkoutDialog';
import AddWorkoutDialog from '@/components/AddWorkoutDialog';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [sortByDaysLeft, setSortByDaysLeft] = useState(false);
  
  // Dialog states
  const [isEditClientDialogOpen, setIsEditClientDialogOpen] = useState(false);
  const [isEditWorkoutDialogOpen, setIsEditWorkoutDialogOpen] = useState(false);
  const [isAddWorkoutDialogOpen, setIsAddWorkoutDialogOpen] = useState(false);
  const [currentEditingClient, setCurrentEditingClient] = useState(null);
  const [currentEditingWorkout, setCurrentEditingWorkout] = useState(null);
  
  // Notifications state
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'workout_change', 
      clientId: 'GYM12345', 
      clientName: 'João Silva',
      message: 'João Silva solicitou alteração de treino', 
      reason: 'Dor no ombro direito', 
      date: '2023-10-01',
      read: false
    },
    { 
      id: 2, 
      type: 'data_change', 
      clientId: 'GYM12346', 
      clientName: 'Maria Santos',
      message: 'Maria Santos solicitou alteração de dados pessoais', 
      field: 'objective',
      currentValue: 'Perda de peso',
      newValue: 'Ganho de massa muscular',
      reason: 'Mudança de objetivos',
      date: '2023-10-02',
      read: false
    }
  ]);
  
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
  const [clients, setClients] = useState([
    { id: "GYM12345", name: "João Silva", plan: "6 meses", startDate: "2023-07-01", endDate: "2023-12-31" },
    { id: "GYM12346", name: "Maria Santos", plan: "1 ano", startDate: "2023-06-15", endDate: "2024-06-15" },
    { id: "GYM12347", name: "Pedro Lima", plan: "3 meses", startDate: "2023-08-01", endDate: "2023-11-01" },
    { id: "GYM12348", name: "Ana Oliveira", plan: "1 mês", startDate: "2023-09-01", endDate: "2023-10-01" },
    { id: "GYM12349", name: "Carlos Souza", plan: "1 ano", startDate: "2023-05-15", endDate: "2024-05-15" },
  ]);
  
  const [clientWorkouts, setClientWorkouts] = useState({
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
  });
  
  // Calculate days left for each client's plan
  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  // Sort clients by days left
  const getSortedClients = () => {
    if (!sortByDaysLeft) return clients;
    
    return [...clients].sort((a, b) => 
      calculateDaysLeft(a.endDate) - calculateDaysLeft(b.endDate)
    );
  };
  
  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark notification as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? {...n, read: true} : n
    );
    setNotifications(updatedNotifications);
    
    // Navigate to appropriate screen based on notification type
    if (notification.type === 'workout_change') {
      setSelectedClient(notification.clientId);
      setActiveTab('view-workouts');
      
      toast({
        title: "Alteração de treino solicitada",
        description: `${notification.clientName} solicitou alteração de treino devido a: ${notification.reason}`,
        duration: 5000
      });
    } else if (notification.type === 'data_change') {
      const client = clients.find(c => c.id === notification.clientId);
      if (client) {
        setCurrentEditingClient(client);
        setIsEditClientDialogOpen(true);
        
        toast({
          title: "Alteração de dados solicitada",
          description: `${notification.clientName} solicitou alteração do campo "${notification.field}" de "${notification.currentValue}" para "${notification.newValue}"`,
          duration: 5000
        });
      }
    }
  };
  
  // Handle delete client
  const handleDeleteClient = (clientId) => {
    const updatedClients = clients.filter(client => client.id !== clientId);
    setClients(updatedClients);
    
    // Also remove client workouts
    const { [clientId]: _, ...remainingWorkouts } = clientWorkouts;
    setClientWorkouts(remainingWorkouts);
    
    toast({
      title: "Cliente removido",
      description: "O cliente foi removido com sucesso.",
      duration: 3000
    });
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
  
  const handleEditClient = (client) => {
    setCurrentEditingClient(client);
    setIsEditClientDialogOpen(true);
  };
  
  const handleSaveClientEdit = (updatedClient) => {
    // Update the client in the clients array
    const updatedClients = clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    );
    setClients(updatedClients);
  };
  
  const handleAddNewClient = (e) => {
    e.preventDefault();
    
    // In a real app, we would save the client data to a database
    // For demo, we'll just show a toast
    toast({
      title: "Cliente cadastrado",
      description: "O cliente foi cadastrado com sucesso.",
      duration: 3000
    });
    
    // Reset the form (in a real app)
    // Reset form fields would go here
    
    // Navigate to clients tab
    setActiveTab('clients');
  };
  
  const handleEditWorkout = (workout) => {
    setCurrentEditingWorkout(workout);
    setIsEditWorkoutDialogOpen(true);
  };
  
  const handleSaveWorkoutEdit = (updatedWorkout) => {
    // Update the workout in the clientWorkouts
    if (selectedClient && clientWorkouts[selectedClient]) {
      const updatedWorkouts = clientWorkouts[selectedClient].map(workout => 
        workout.id === updatedWorkout.id ? updatedWorkout : workout
      );
      
      setClientWorkouts({
        ...clientWorkouts,
        [selectedClient]: updatedWorkouts
      });
    }
  };
  
  const handleAddNewWorkoutToClient = () => {
    setIsAddWorkoutDialogOpen(true);
  };
  
  const handleSaveNewWorkout = (newWorkout) => {
    if (selectedClient) {
      const clientCurrentWorkouts = clientWorkouts[selectedClient] || [];
      
      setClientWorkouts({
        ...clientWorkouts,
        [selectedClient]: [
          ...clientCurrentWorkouts,
          newWorkout
        ]
      });
    }
  };
  
  const handleSaveWorkoutTemplate = (e) => {
    e.preventDefault();
    
    // In a real app, we would save the workout template
    // For demo, we'll just show a toast
    toast({
      title: "Treino salvo",
      description: "O treino foi salvo como template com sucesso.",
      duration: 3000
    });
  };
  
  const handleDeleteClientWorkout = (workoutId) => {
    if (selectedClient && clientWorkouts[selectedClient]) {
      const updatedWorkouts = clientWorkouts[selectedClient].filter(
        workout => workout.id !== workoutId
      );
      
      setClientWorkouts({
        ...clientWorkouts,
        [selectedClient]: updatedWorkouts
      });
      
      toast({
        title: "Treino removido",
        description: "O treino foi removido com sucesso.",
        duration: 3000
      });
    }
  };
  
  // Get unread notification count
  const unreadNotificationCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block">
        <div className="p-6">
          <img 
            src="/lovable-uploads/3b284ef0-e51c-458d-b266-e14fb052e77b.png" 
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
          
          <div 
            className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${activeTab === 'notifications' ? 'bg-groovy text-white' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <BellRing size={20} className="mr-3" />
            <span>Notificações</span>
            {unreadNotificationCount > 0 && (
              <Badge className="ml-auto bg-red-500">{unreadNotificationCount}</Badge>
            )}
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
            className={`flex flex-col items-center py-3 px-5 ${activeTab === 'notifications' ? 'text-groovy' : 'text-gray-500'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <BellRing size={20} />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
            <span className="text-xs mt-1">Notificações</span>
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
              
              <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Buscar cliente..." 
                    className="pl-10 w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setSortByDaysLeft(!sortByDaysLeft)}
                >
                  <Calendar size={16} />
                  {sortByDaysLeft ? "Ordem padrão" : "Ordenar por dias restantes"}
                </Button>
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
                        <TableHead>Dias Restantes</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getSortedClients()
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
                          <TableCell>
                            <Badge className={`${calculateDaysLeft(client.endDate) < 10 ? 'bg-red-500' : calculateDaysLeft(client.endDate) < 30 ? 'bg-yellow-500' : 'bg-green-500'}`}>
                              {calculateDaysLeft(client.endDate)} dias
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditClient(client)}
                              >
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
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                  >
                                    <Trash size={16} className="mr-1" />
                                    Excluir
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o cliente {client.name}? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      onClick={() => handleDeleteClient(client.id)}
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
        
        {activeTab === 'notifications' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Notificações</h1>
              <p className="text-gray-600">Gerencie as solicitações dos clientes.</p>
            </div>
            
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`cursor-pointer transition-colors hover:bg-gray-50 ${notification.read ? 'opacity-70' : 'border-l-4 border-groovy'}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <CardContent className="p-4 flex items-center">
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-groovy mr-3"></div>
                      )}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900">
                            {notification.type === 'workout_change' ? 'Alteração de Treino' : 'Alteração de Dados'}
                          </h3>
                          <span className="text-xs text-gray-500">{notification.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          <p><span className="font-medium">Motivo:</span> {notification.reason}</p>
                          {notification.type === 'data_change' && (
                            <p className="mt-1"><span className="font-medium">Campo:</span> {notification.field} ({notification.currentValue} → {notification.newValue})</p>
                          )}
                        </div>
                      </div>
                      {notification.type === 'workout_change' ? (
                        <FileText size={18} className="text-groovy ml-2" />
                      ) : (
                        <Users size={18} className="text-groovy ml-2" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center">
                    <BellRing size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Não há notificações no momento.</p>
                  </div>
                </CardContent>
              </Card>
            )}
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
                <form className="space-y-6" onSubmit={handleAddNewClient}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" placeholder="Digite o nome completo" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(00) 00000-0000" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="email@exemplo.com" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="birthdate">Data de nascimento</Label>
                      <Input id="birthdate" type="date" required />
                    </div>
                    
                    <div className="grid gap-2 col-span-full">
                      <Label htmlFor="objective">Objetivo na academia</Label>
                      <Select required>
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
                          <input type="radio" id="exercise-yes" name="exercised-before" className="mr-2" required />
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
                      <Select required>
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
                      <Select required>
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
                    <Button 
                      type="submit" 
                      className="bg-groovy hover:bg-groovy-dark"
                    >
                      Cadastrar Cliente
                    </Button>
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
                <form className="space-y-6" onSubmit={handleSaveWorkoutTemplate}>
                  <div className="grid gap-2">
                    <Label htmlFor="client-id">Número de cadastro do cliente</Label>
                    <Input id="client-id" placeholder="Digite o número de cadastro do cliente" required />
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
                              required
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
                                      required
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
                                      required
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
                                        required
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
                      <Button 
                        type="submit" 
                        className="bg-groovy hover:bg-groovy-dark"
                      >
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
            
            {clientWorkouts[selectedClient] && clientWorkouts[selectedClient].length > 0 ? (
              <div className="space-y-6">
                {clientWorkouts[selectedClient].map((workout) => (
                  <Card key={workout.id} className="mb-6">
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
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteClientWorkout(workout.id)}
                      >
                        <Trash size={16} className="mr-2" />
                        Excluir
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Exportar (PDF)
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditWorkout(workout)}
                        >
                          <Edit size={16} className="mr-2" />
                          Editar
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                
                <div className="flex justify-end">
                  <Button onClick={handleAddNewWorkoutToClient}>
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
                    <Button className="mt-4" onClick={handleAddNewWorkoutToClient}>
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

      {/* Dialogs */}
      {currentEditingClient && (
        <EditClientDialog 
          isOpen={isEditClientDialogOpen}
          onClose={() => setIsEditClientDialogOpen(false)}
          clientData={currentEditingClient}
          onSave={handleSaveClientEdit}
        />
      )}
      
      {currentEditingWorkout && (
        <EditWorkoutDialog 
          isOpen={isEditWorkoutDialogOpen}
          onClose={() => setIsEditWorkoutDialogOpen(false)}
          workout={currentEditingWorkout}
          onSave={handleSaveWorkoutEdit}
        />
      )}
      
      <AddWorkoutDialog
        isOpen={isAddWorkoutDialogOpen}
        onClose={() => setIsAddWorkoutDialogOpen(false)}
        onAdd={handleSaveNewWorkout}
      />
    </div>
  );
};

export default AdminDashboard;

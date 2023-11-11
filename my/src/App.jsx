import { ChakraProvider, Input, Button, VStack, Center } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import TaskList from './componentes/TaskList';
import Titulo from './componentes/Header';
import UseTaskManager from './hooks/hooks'; 

const App = () => {
  const {
    tasks,
    newTask,
    setNewTask,
    addTask,
    editTask,
    deleteTask,
  } = UseTaskManager();

  const handleTaskSubmission = (event) => {
    event.preventDefault();
    addTask();
  };

  return (
    <ChakraProvider>
      <Center>
        <VStack spacing={6} w="400px" mt={8}>
          <Titulo />
          <form onSubmit={handleTaskSubmission}>
            <VStack spacing={2} w="100%">
              <Input
                placeholder="Nueva tarea"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
              <Button type="submit" leftIcon="add">
                Agregar tarea
              </Button>
            </VStack>
          </form>
          <VStack w="100%" align="start">
            <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
          </VStack>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default App;
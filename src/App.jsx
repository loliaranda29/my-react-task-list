import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './componentes/TaskList';
import Titulo from './componentes/Header';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', completed: false });

  useEffect(() => {
    // Cargar las tareas desde localStorage al cargar la aplicación
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Almacenar las tareas en localStorage cada vez que se actualice la lista de tareas
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.name.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, name: newTask.name, completed: false }]);
      setNewTask({ name: '', completed: false });
    }
  };

  const editTask = (taskId, newName, newCompleted) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newName, completed: newCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    
      <div className="App">
        <Titulo />
        <div className="task-container">
          <div className="task-add">
            <input
              type="text"
              placeholder="Nueva tarea"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />&nbsp; &nbsp;
            <button onClick={addTask}>
              <span role="img" aria-label="Agregar tarea">
                ➕
              </span>
            </button>
          </div>
          <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
          <button onClick={deleteAllTasks} className="delete-all-button">
            <span role="img" aria-label="Eliminar todas las tareas">
              🗑️
            </span>
          </button>
        </div>
      </div>
    );
 
};

export default App;

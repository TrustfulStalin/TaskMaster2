import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define task type
type Task = {
  id: number;
  title: string;
};

// Define context type
interface TaskContextType {
  tasks: Task[];
  createTask: (task: { title: string }) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newTitle: string) => void;
}

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Hook to use context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Provider component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = ({ title }: { title: string }) => {
    const newTask: Task = {
      id: Date.now(), // or use uuid for unique IDs
      title,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
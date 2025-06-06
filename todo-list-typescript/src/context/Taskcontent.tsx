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
      id: Date.now(), // or use uuid()
      title,
    };
    setTasks((prev) => [...prev, newTask]);
    console.log(`%c[Task Added] ${title}`, 'color: green; font-weight: bold;');
  };

  const deleteTask = (id: number) => {
    const deletedTask = tasks.find((task) => task.id === id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    console.log(`%c[Task Deleted] ${deletedTask?.title}`, 'color: red; font-weight: bold;');
  };

  return (
    <div className="p-3 bg-light border rounded shadow-sm">
      <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
        {children}
      </TaskContext.Provider>
    </div>
  );
};
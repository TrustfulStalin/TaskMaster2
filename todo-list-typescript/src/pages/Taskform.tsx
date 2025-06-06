import React, { useState } from 'react';
import type { Task } from '../types/Task';

interface Props {
  initialTask?: Task;
  onSave: (task: Task) => void;
}

const TaskForm: React.FC<Props> = ({ initialTask, onSave }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required.');
    onSave({ id: initialTask?.id || crypto.randomUUID(), title, description, completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
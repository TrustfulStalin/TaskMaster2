import React, { useState } from 'react';
import { useTasks } from '../context/Taskcontent';

const TaskDashboard: React.FC = () => {
  const { tasks, deleteTask, createTask, updateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createTask({ title });
      setTitle('');
    }
  };

  const startEdit = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditedTitle(currentTitle);
  };

  const saveEdit = (id: number) => {
    if (editedTitle.trim()) {
      updateTask(id, editedTitle);
      setEditingId(null);
      setEditedTitle('');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(to right, #74ebd5, #9face6)',
        padding: '2rem',
      }}
    >
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white text-center">
            <h2 className="mb-0">🎯 Task Dashboard</h2>
            <p className="mb-0 small">Stay organized and productive</p>
          </div>

          <div className="card-body bg-white">
            {/* Task Creation Form */}
            <form onSubmit={handleSubmit} className="d-flex mb-4 gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button type="submit" className="btn btn-success shadow-sm">
                <i className="bi bi-plus-circle"></i> Add
              </button>
            </form>

            {/* Task List */}
            {tasks.length === 0 ? (
              <p className="text-center text-muted">No tasks yet. Add one above!</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-light rounded border d-flex justify-content-between align-items-center shadow-sm"
                    style={{ transition: '0.3s ease' }}
                  >
                    {editingId === task.id ? (
                      <input
                        className="form-control me-3"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(task.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                    ) : (
                      <span className="fw-semibold">{task.title}</span>
                    )}

                    <div className="btn-group btn-group-sm">
                      {editingId === task.id ? (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={() => saveEdit(task.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => startEdit(task.id, task.title)}
                          >
                            <i className="bi bi-pencil"></i> Edit
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => deleteTask(task.id)}
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card-footer text-center text-muted small">
            Made with ❤️ using React + Bootstrap
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
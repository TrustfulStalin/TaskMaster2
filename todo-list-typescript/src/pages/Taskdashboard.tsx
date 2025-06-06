import React, { useState } from 'react';
import { useTasks } from '../context/Taskcontent';

const TaskDashboard: React.FC = () => {
  const { tasks, deleteTask, createTask } = useTasks();
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createTask({ title });
      setTitle('');
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
                    <span className="fw-semibold">{task.title}</span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
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
import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { useTaskContext } from '../context/TaskContext';
import { RichTextEditor } from './RichTextEditor';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

export function TaskModal({ task, onClose }: TaskModalProps) {
  const { categories, updateTask, moveTask } = useTaskContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [categoryId, setCategoryId] = useState(task.categoryId);

  const handleSave = () => {
    updateTask(task.id, { title, description, categoryId });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleSave();
    }
  };

  const statusOptions: { value: TaskStatus; label: string; emoji: string }[] = [
    { value: 'todo', label: 'Todo', emoji: '📝' },
    { value: 'in-progress', label: 'In Progress', emoji: '🔄' },
    { value: 'done', label: 'Done', emoji: '✅' },
  ];

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <input
            type="text"
            className="modal-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
          />
          <button className="modal-close" onClick={handleSave}>✕</button>
        </div>
        
        <div className="modal-properties">
          <div className="property-row">
            <span className="property-label">📊 Status</span>
            <div className="status-buttons">
              {statusOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`status-btn ${task.status === opt.value ? 'active' : ''}`}
                  onClick={() => moveTask(task.id, opt.value)}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="property-row">
            <span className="property-label">🏷️ Category</span>
            <select 
              value={categoryId || ''} 
              onChange={(e) => setCategoryId(e.target.value || null)}
              className="property-select"
            >
              <option value="">No Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="property-row">
            <span className="property-label">📅 Created</span>
            <span className="property-value">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="modal-description">
          <div className="description-header">
            <span>📄 Description</span>
          </div>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder='Add a detailed description... Press "/" for commands'
          />
        </div>
      </div>
    </div>
  );
}

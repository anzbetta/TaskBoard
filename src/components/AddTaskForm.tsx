import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { RichTextEditor } from './RichTextEditor';

export function AddTaskForm() {
  const { addTask, categories } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim(), description, categoryId);
      setTitle('');
      setDescription('');
      setCategoryId(null);
      setIsExpanded(false);
      setShowDescription(false);
    }
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setShowDescription(false);
    setTitle('');
    setDescription('');
    setCategoryId(null);
  };

  return (
    <form className={`add-task-form ${isExpanded ? 'expanded' : ''}`} onSubmit={handleSubmit}>
      <div className="form-main">
        <input
          type="text"
          placeholder="✨ Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
        <button type="submit" disabled={!title.trim()}>
          Add Task
        </button>
      </div>
      {isExpanded && (
        <>
          <div className="form-options">
            <select 
              value={categoryId || ''} 
              onChange={(e) => setCategoryId(e.target.value || null)}
            >
              <option value="">🏷️ No Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button 
              type="button" 
              className={`btn-toggle-desc ${showDescription ? 'active' : ''}`}
              onClick={() => setShowDescription(!showDescription)}
            >
              📝 {showDescription ? 'Hide' : 'Add'} Description
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {showDescription && (
            <div className="form-description">
              <RichTextEditor
                value={description}
                onChange={setDescription}
              />
            </div>
          )}
        </>
      )}
    </form>
  );
}

import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

export function CategoriesPage() {
  const { categories, tasks, addCategory, updateCategory, deleteCategory } = useTaskContext();
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#6366f1');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      addCategory(newName.trim(), newColor);
      setNewName('');
      setNewColor('#6366f1');
    }
  };

  const startEdit = (id: string, name: string, color: string) => {
    setEditingId(id);
    setEditName(name);
    setEditColor(color);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      updateCategory(editingId, editName.trim(), editColor);
      setEditingId(null);
    }
  };

  const getTaskCount = (categoryId: string) => {
    return tasks.filter(t => t.categoryId === categoryId).length;
  };

  const colorPresets = [
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6', 
    '#6366f1', '#8b5cf6', '#ec4899', '#64748b'
  ];

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>🏷️ Categories</h1>
        <p>Organize your tasks with custom categories</p>
      </div>

      <form className="add-category-form-full" onSubmit={handleAddCategory}>
        <h3>Create New Category</h3>
        <div className="form-row">
          <input
            type="text"
            placeholder="Category name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="color-picker">
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
            <div className="color-presets">
              {colorPresets.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`preset ${newColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewColor(color)}
                />
              ))}
            </div>
          </div>
          <button type="submit" disabled={!newName.trim()}>
            ➕ Add Category
          </button>
        </div>
      </form>

      <div className="categories-list">
        <h3>Your Categories ({categories.length})</h3>
        {categories.length === 0 ? (
          <div className="empty-state">
            <p>No categories yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map(cat => (
              <div key={cat.id} className="category-card">
                {editingId === cat.id ? (
                  <div className="category-edit">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                    />
                    <input
                      type="color"
                      value={editColor}
                      onChange={(e) => setEditColor(e.target.value)}
                    />
                    <button className="btn-save" onClick={saveEdit}>✓</button>
                    <button className="btn-cancel" onClick={() => setEditingId(null)}>✕</button>
                  </div>
                ) : (
                  <>
                    <div className="category-info">
                      <span 
                        className="category-color" 
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="category-name">{cat.name}</span>
                      <span className="category-count">{getTaskCount(cat.id)} tasks</span>
                    </div>
                    <div className="category-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => startEdit(cat.id, cat.name, cat.color)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => deleteCategory(cat.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

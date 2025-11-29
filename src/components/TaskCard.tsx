import React, { useState } from 'react';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';
import { TaskModal } from './TaskModal';
import { DescriptionPreview } from './RichTextEditor';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { categories, deleteTask } = useTaskContext();
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const category = categories.find(c => c.id === task.categoryId);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const hasDescription = task.description && task.description.trim().length > 0;

  return (
    <>
      <div 
        className={`task-card ${isDragging ? 'dragging' : ''}`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => setShowModal(true)}
      >
        {category && (
          <span className="task-category" style={{ backgroundColor: category.color }}>
            {category.name}
          </span>
        )}
        <p className="task-title">{task.title}</p>
        {hasDescription && (
          <div className="task-description-preview">
            <DescriptionPreview value={task.description} />
          </div>
        )}
        <div className="task-meta">
          {hasDescription && <span className="has-description" title="Has description">📝</span>}
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
        <button 
          className="btn-delete" 
          onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
      {showModal && (
        <TaskModal task={task} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { useTaskContext } from '../context/TaskContext';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

const statusColors: Record<TaskStatus, string> = {
  'todo': '#f59e0b',
  'in-progress': '#3b82f6',
  'done': '#10b981',
};

const statusEmoji: Record<TaskStatus, string> = {
  'todo': '📝',
  'in-progress': '🔄',
  'done': '✅',
};

export function TaskColumn({ title, status, tasks }: TaskColumnProps) {
  const { moveTask } = useTaskContext();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      moveTask(taskId, status);
    }
    setIsDragOver(false);
  };

  return (
    <div 
      className={`task-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header" style={{ borderTopColor: statusColors[status] }}>
        <div className="column-title">
          <span className="column-emoji">{statusEmoji[status]}</span>
          <h2>{title}</h2>
        </div>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="column-content">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="empty-message">
            <p>No tasks yet</p>
            <span>Drag tasks here or create new</span>
          </div>
        )}
      </div>
    </div>
  );
}

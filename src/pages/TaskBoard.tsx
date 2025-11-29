import { useTaskContext } from '../context/TaskContext';
import { TaskColumn } from '../components/TaskColumn';
import { AddTaskForm } from '../components/AddTaskForm';
import { CategoryFilter } from '../components/CategorySelector';
import { TaskStatus } from '../types';

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'Todo' },
  { status: 'in-progress', title: 'In Progress' },
  { status: 'done', title: 'Done' },
];

export function TaskBoard() {
  const { tasks, filterCategoryId } = useTaskContext();

  const filteredTasks = filterCategoryId 
    ? tasks.filter(t => t.categoryId === filterCategoryId)
    : tasks;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;

  return (
    <div className="task-board">
      <div className="board-header">
        <div className="board-stats">
          <h2>📊 Your Tasks</h2>
          <div className="stats-info">
            <span className="stat">{completedTasks}/{totalTasks} completed</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${totalTasks ? (completedTasks / totalTasks) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
        <CategoryFilter />
      </div>
      <AddTaskForm />
      <div className="columns-container">
        {columns.map(col => (
          <TaskColumn
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={filteredTasks.filter(t => t.status === col.status)}
          />
        ))}
      </div>
    </div>
  );
}

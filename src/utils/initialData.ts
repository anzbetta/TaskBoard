import { Task, Category } from '../types';

export const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Work', color: '#3b82f6' },
  { id: 'cat-2', name: 'Personal', color: '#10b981' },
  { id: 'cat-3', name: 'Urgent', color: '#ef4444' },
];

export const initialTasks: Task[] = [
  { 
    id: 'task-1', 
    title: 'Set up project structure', 
    description: JSON.stringify([
      { type: "heading", props: { level: 2 }, content: "Goals" },
      { type: "bulletListItem", content: "Initialize React app" },
      { type: "bulletListItem", content: "Set up folder structure" },
      { type: "bulletListItem", content: "Configure TypeScript" },
    ]),
    status: 'done', 
    categoryId: 'cat-1', 
    createdAt: Date.now() - 100000 
  },
  { 
    id: 'task-2', 
    title: 'Implement authentication', 
    description: JSON.stringify([
      { type: "heading", props: { level: 2 }, content: "Auth Features" },
      { type: "checkListItem", props: { checked: false }, content: "Login form" },
      { type: "checkListItem", props: { checked: false }, content: "Registration" },
      { type: "checkListItem", props: { checked: false }, content: "Password reset" },
      { type: "paragraph", content: "" },
      { type: "paragraph", content: "Use JWT tokens for security" },
    ]),
    status: 'in-progress', 
    categoryId: 'cat-1', 
    createdAt: Date.now() - 50000 
  },
  { 
    id: 'task-3', 
    title: 'Design landing page', 
    description: JSON.stringify([
      { type: "paragraph", content: "Create a modern landing page with:" },
      { type: "numberedListItem", content: "Hero section" },
      { type: "numberedListItem", content: "Features list" },
      { type: "numberedListItem", content: "Testimonials" },
      { type: "numberedListItem", content: "CTA button" },
    ]),
    status: 'todo', 
    categoryId: 'cat-2', 
    createdAt: Date.now() - 30000 
  },
  { 
    id: 'task-4', 
    title: 'Fix critical bug', 
    description: JSON.stringify([
      { type: "paragraph", content: [{ type: "text", text: "Bug:", styles: { bold: true } }, { type: "text", text: " App crashes on mobile devices" }] },
      { type: "paragraph", content: "" },
      { type: "paragraph", content: [{ type: "text", text: "console.error: Maximum call stack exceeded", styles: { code: true } }] },
      { type: "paragraph", content: "" },
      { type: "paragraph", content: [{ type: "text", text: "Need to investigate ASAP!", styles: { italic: true } }] },
    ]),
    status: 'in-progress', 
    categoryId: 'cat-3', 
    createdAt: Date.now() - 10000 
  },
  { 
    id: 'task-5', 
    title: 'Write documentation', 
    description: '',
    status: 'todo', 
    categoryId: null, 
    createdAt: Date.now() 
  },
];

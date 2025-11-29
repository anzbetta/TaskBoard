import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Navbar } from './components/Navbar';
import { TaskBoard } from './pages/TaskBoard';
import { CategoriesPage } from './pages/CategoriesPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TaskBoard />} />
              <Route path="/categories" element={<CategoriesPage />} />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;

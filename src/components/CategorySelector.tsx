import React from 'react';
import { useTaskContext } from '../context/TaskContext';

export function CategoryFilter() {
  const { categories, filterCategoryId, setFilterCategoryId } = useTaskContext();

  return (
    <div className="category-filter">
      <span className="filter-label">🔍 Filter:</span>
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filterCategoryId === null ? 'active' : ''}`}
          onClick={() => setFilterCategoryId(null)}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${filterCategoryId === cat.id ? 'active' : ''}`}
            style={{ 
              '--cat-color': cat.color,
              borderColor: filterCategoryId === cat.id ? cat.color : 'transparent'
            } as React.CSSProperties}
            onClick={() => setFilterCategoryId(cat.id)}
          >
            <span className="cat-dot" style={{ backgroundColor: cat.color }}></span>
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '', status: 'Not Completed' });
  const [filter, setFilter] = useState('All');

  const handleInputChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    if (newTodo.name && newTodo.description) {
      setTodos([...todos, { ...newTodo, id: Date.now() }]);
      setNewTodo({ name: '', description: '', status: 'Not Completed' });
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateStatus = (id, status) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, status } : todo));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    return todo.status === filter;
  });

  return (
    <div className="app">
      <div className="todo-form">
        <input type="text" name="name" placeholder="Todo Name" value={newTodo.name} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Todo Description" value={newTodo.description} onChange={handleInputChange} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div className="todo-card" key={todo.id}>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <select value={todo.status} onChange={(e) => updateStatus(todo.id, e.target.value)}>
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
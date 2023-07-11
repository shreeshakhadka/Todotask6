import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Todo() {
  const [todotask, setTodostask] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((data) => setTodostask(data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <Router>
      <div>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route path="/add" component={AddnewTodo} />
        <Route path="/:id" component={TodoDetails} />
      </Switch>
      </div>
    </Router>
  );
}

function TodoList({ todotask }) {
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todotask.map(todo => (
          <li key={todo.id}>
            <Link to={`/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
  </div>
  );
}

function AddnewTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const newTodo = { title, completed };
    onAddTodo(newTodo);
    setTitle('');
    setCompleted(false);
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="completed">Completed:</label>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
        </div>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

function TodoDetails({ todotask, match }) {
  const todoId = parseInt(match.params.id);
  const todo = todotask.find(todo => todo.id === todoId);

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div>
      <h2>Todo Details</h2>
      <p>Title: {todo.title}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default Todo;

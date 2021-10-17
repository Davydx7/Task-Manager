/* eslint-disable no-use-before-define */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAdd, setShowAdd] = useState(false);

  const setShow = () => {
    setShowAdd(!showAdd);
  };

  // Tasks State
  const [tasks, setTasks] = useState([]);

  // get Tasks from server
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromserver = await fetchTasks();
      setTasks(tasksFromserver);
    };

    getTasks();
  }, []);

  // Fetch Tasks from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:2000/tasks');
    const data = await res.json();

    return data;
  };

  // Fetch single Task from server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:2000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add New Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:2000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 2000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // delete Tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:2000/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToUpdate = await fetchTask(id);
    const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder };

    const res = await fetch(`http://localhost:2000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(tasks.map((task) => (task.id === id ? data : task)));
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={setShow} showAddState={showAdd} />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAdd && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : 'no tasks to display'}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

/* eslint-disable no-use-before-define */
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

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

  // Add New Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 2000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // delete Tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:2000/tasks/${id}`, {
      method: 'DELETE',
    });
    // setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: !task.reminder } : task)));
  };

  return (
    <div className="container">
      <Header onAdd={setShow} showAddState={showAdd} />
      {showAdd && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'no tasks to display'}
    </div>
  );
}

export default App;

const { useState } = React;

// Header Component
function Header() {
  return <h1>My Task Tracker</h1>;
}

// TaskInput Component
function TaskInput({ addTask }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    addTask(input);
    setInput("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength="50"
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}

// TaskItem Component
function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div className="task-item">
      <span
        className={`task-name ${task.completed ? "completed" : ""}`}
        onClick={() => toggleTask(task.id)}
      >
        {task.name}
      </span>

      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  );
}

// TaskList Component
function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks added yet.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

// Footer Component
function Footer({ total, completed }) {
  return (
    <div className="footer">
      Total Tasks: {total} | Completed: {completed}
    </div>
  );
}

// Main App Component
function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app-container">
      <Header />
      <TaskInput addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
      <Footer total={tasks.length} completed={completedCount} />
    </div>
  );
}

// Render App
ReactDOM.createRoot(document.getElementById("root")).render(<App />);


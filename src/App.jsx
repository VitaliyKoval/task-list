import { useEffect, useRef, useState } from "react"
import { List } from "./components/List"
import {v4 as uuidv4} from 'uuid'

function App() {
  const inputRef = useRef();
  const [count, setCount] = useState(0);

  const [tasks, setTasks] = useState(() => {
    const todos = localStorage.getItem('tasks');
    if (!todos) {
      return [];
    }
    return JSON.parse(todos);
  });

  const [title, setTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setCount(tasks.reduce((count, task) => count + !task.status, 0));
  }, [tasks]);

  const date = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const fullDate = `${month} ${day}, ${year}`;

  const addTask = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const time = new Date().toLocaleTimeString();
      setTasks([...tasks, {
        id: uuidv4(),
        title: title,
        date: fullDate + ' | ' + time,
        status: false
      }]);
      setTitle('');
      setCount(prev => prev + 1);
    }
  }

  return (
    <div className="container">
      <h1>Note your tasks</h1>
      <span>{fullDate}</span>
      <br/>
      <span>Unfinished notes: <b>{count}</b></span>
      <div className="input-field">
        <input type="text" id="task-name" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={addTask} ref={inputRef}/>
        <label htmlFor="task-name">Task name</label>
      </div>

      <List tasks={tasks} setTasks={setTasks} setCount={setCount} setTitle={setTitle} inputRef={inputRef} />
    </div>
  )
}

export default App

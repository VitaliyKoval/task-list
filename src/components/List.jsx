import { Item } from "./Item";


export function List({ tasks, setTasks, setCount, setTitle, inputRef}) {
    return (
        <ul>
            {tasks.map(task => <Item key={task.id} {...task} tasks={tasks} setTasks={setTasks} setCount={setCount} setTitle={setTitle} inputRef={inputRef} />)}
        </ul>
    )
}
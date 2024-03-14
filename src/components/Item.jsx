import { useState } from "react"

export function Item({ id, title, date, status, tasks, setTasks, setCount, setTitle, inputRef}) {
    
    const [checked, setChecked] = useState(status);
    const classes = ['todo'];

    if (checked) {
        classes.push('status');
    }

    const updateStatus = () => {
        setChecked(!checked);

        setTasks([...tasks.map((task) => {
            if (task.id === id) {
                task.status = !checked;
                if (!task.status) {
                    setCount(prev => prev + 1);
                } else {
                    setCount(prev => prev - 1);
                }
            }
            return task;
        })])
    }

    const removeElement = () => {
        setTasks([...tasks.filter(task => task.id !== id)]);
        if (!status) {
            setCount(prev => prev - 1);
        }
    }

    const updateTitle = () => {
        setTitle(title);
        inputRef.current.focus();
        
        removeElement();
    }

    return (
        <li className={classes.join(' ')} >
            <label>
                <input type="checkbox" checked={checked} onChange={updateStatus}/>
                <span style={{fontSize: '1.5em'}}>{title}</span>
                <i className="date" style={{ fontSize: '1em' }}>{date}</i>
                
            </label>
            <b onClick={updateTitle} className="material-icon grey-text">&#128393;</b>
            <b onClick={removeElement} className="material-icon red-text">&#x2715;</b>
        </li>
    )
}
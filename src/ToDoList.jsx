// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("")

    function handleInputChange(e) {
        setNewTask(e.target.value)
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, {text: newTask, completed: false}])
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_,i) => i !== index);
        setTasks(updatedTasks)
    }

    function moveTaskUp(index) {
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function checkCompleted(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    function clearCompleted() {
        const updatedTasks = tasks.filter(t => !t.completed);
        setTasks(updatedTasks)
    }

    function clearAll() {
        setTasks([])
    }

    return(
        <div className={"to-do-list"}>

            <h1>To-Do-List</h1>

            <div>
                <input
                    type={"text"}
                    placeholder={"Task..."}
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className={"add-button"}
                    onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className={task.completed ? 'checked' : ''}
                              onClick={() => checkCompleted(index)}>{task.text}
                        </span>
                        <button
                            className={"delete-button"}
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button
                            className={"move-button"}
                            onClick={() => moveTaskUp(index)}>
                            UP
                        </button>
                        <button
                            className={"move-button"}
                            onClick={() => moveTaskDown(index)}>
                            DOWN
                        </button>
                    </li>
                )}
            </ol>
            <button
                className={"clear-button"}
                onClick={() => clearCompleted()}>
                Clear completed
            </button>
            <button
                className={"clear-button"}
                onClick={() => clearAll()}>
                Clear all
            </button>
        </div>
    );
}

export default ToDoList;
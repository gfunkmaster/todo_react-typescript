import "./App.css";

import React, { ChangeEvent, FC, useState } from "react";

import TodoTask from "./Components/TodoTask";

export interface ITask {
  taskName: string;
  deadline: number;
}

const App: FC = () => {
  const [task, setTask] = useState<string>(" ");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
      console.log(task);
    } else {
      setDeadline(Number(event.target.value));
      console.log(deadline);
    }
  };

  const addTask = (): void => {
    const newTask = {
      taskName: task,
      deadline: deadline,
    };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);

    console.log(todoList);
  };

  const completeTask = (taskNameToDelete: string): void => {
    
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete;
    }))
    
  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            value={task}
            placeholder="Task..."
            name="task"
            onChange={handleChange}
          />
          <input
            type="number"
            name="deadline"
            value={deadline}
            placeholder="Deadline in days..."
            onChange={handleChange}
          />
        </div>

        <button onClick={addTask}>Add task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;

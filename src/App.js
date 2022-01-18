import "./App.css";
import React, { useState, useEffect } from "react";
// import { TextField, Button } from "@mui/material";
import { supabase } from './client'
import TasksList from "./TasksList";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [firstLoad, setFirstLoad] = useState(false)
  const [closing, setClosing] = useState(false)
  const [setting, setSetting] = useState(false)
  const [noTodo, setNoTodo] = useState(false);


  useEffect(() => {
    setFirstLoad(true);
    getTasks();
    setIsLoading(true);
  }, [])

  const getTasks = async () => {

    const { data } = await supabase
      .from("todos")
      .select('*')
    // console.log(data);
    setTaskList(data.map(doc => ({
      id: doc.id,
      todo: doc.todo,
      inprogress: doc.inprogress,
    })).sort((a, b) => b.id - a.id));
    setIsLoading(false);

  }
  const onChangeHandler = (e) => {
    setTask(e.target.value);
    setNoTodo(false);
  }
  const addTask = async (e) => {
    e.preventDefault();

    if (task !== "") {
      setNoTodo(false);
      setIsLoading(true);
      await supabase
        .from('todos')
        .insert(
          [
            {
              todo: task,
              inprogress: true,
            }
          ]
        )
      setTask("");
      getTasks();
    } else {
      setNoTodo(true);
    }

  }
  const startApp = () => {
    setFirstLoad(false);
  }
  const exitApp = () => {
    setSetting(false);
    setClosing(true);
  }


  return (
    <div className="App">
      {firstLoad && <div className="firstLoad">
        <div className="wellcome">
          <h1>welcom to the
            <span> To Do List </span> application</h1>
          <p className="owner">presented by <span>Rezvan</span></p>
        </div>

        <div className="startApp" onClick={startApp}>
          <span>go to the app</span></div>
      </div>}

      {!firstLoad && !closing && <div className="container" >
        {!isLoading && <div className="tasks">
          <div className="header">
            <h1>To Do list</h1>
            {!setting && <svg xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" fill="currentColor"
              className="setting bi bi-gear-fill"
              viewBox="0 0 16 16"
              onClick={() => setSetting(true)}
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>}
            {setting && <div className="settingItems">
              <div className="login">
                login
              </div>
              <div className="back" onClick={() => setSetting(false)}>
                back
              </div>
              <div className="exitApp" onClick={exitApp}>
                exit app
              </div>
            </div>}
          </div>

          {taskList.map(item => {
            return (
              <TasksList
                key={item.id}
                todo={item.todo}
                inprogress={item.inprogress}
                id={item.id}
                getTasks={getTasks}
                setIsLoading={setIsLoading}
                tasksList={taskList}
                setTaskList={setTaskList}
                isLoading={isLoading}
              />

            )
          })
          }

          <form className="form" onSubmit={addTask}>
            < span >
              what do you whant to do?
            </span>
            {!noTodo && <textarea
              id="outlined-basic"
              className="task-input"
              label="write a task"
              value={task}
              onChange={onChangeHandler}
              variant="outlined"
            />}
            {!noTodo && <button type="submit"
              // style={{ display: "none" }}
              variant="outlined">
              write it!
            </button>}
            {noTodo && <div className="noTodo">
              please insert a task in the field first
            </div>}
            {noTodo && <button onClick={() => setNoTodo(false)}>
              I get it!</button>}
          </form>


        </div>}

        {isLoading && <div
          className="loading">
          <div className="circle-border">
            <div className="circle-core"></div>
          </div>
          <p>loading...</p>
        </div>}
      </div>}
      {closing &&
        <div className="exitPage">
          <div className="lastpage container">
            <p className="thanks">Thank you!
              <svg xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="red"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg></p>

            {/* <a href="mailto:fatemeh.abolhasanzade@gmail.com" target={"_blank"}>contact us</a> */}
            <p className="backToApp" onClick={() => setClosing(false)} >back to application</p>
          </div>
        </div>}
    </div >
  );
}


export default App;

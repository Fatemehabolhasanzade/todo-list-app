import "./App.css";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import firebase from "firebase/app";
// import 'firebase/firestore'
import { todosColl } from './firebase-config'
import TasksList from "./TasksList";
import { color } from "@mui/system";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)




  useEffect(() => {
    getTasks();
    setIsLoading(true);
  }, [])

  const addTask = async (e) => {
    e.preventDefault();
    console.log("you are trying to add a task");
    todosColl.add({
      todo: task,
      inprogress: true,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setTask("");
  }
  const sortTasks = (arr) => {
    return (
      arr.sort()
    )
  }

  const getTasks = () => {
    todosColl.onSnapshot((querySnapshot) => {
      setTaskList(sortTasks(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        inprogress: doc.data().inprogress,
        time: doc.data().time,
      })))

      );
      setIsLoading(false);
    });
  }
  console.log(taskList);

  return (
    <div className="App">
      <div className='container'>
        <header><h1>todolist application</h1></header>
        <form>
          <TextField
            id="outlined-basic"
            className="task-input"
            label="write a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            variant="outlined" />
          <button
            type="submit"
            onClick={addTask}
            style={{ display: "none" }}
            variant="outlined">Outlined</button>

        </form>

        {/* show tasks */}
        <div className="tasks">
          {isLoading && <div className="loading">
            data is loadind
            <img src="Flying hearts.gif" alt="" />
          </div>}
          {!isLoading && taskList.map(item => {
            return (
              <TasksList key={item.id} todo={item.todo} inprogress={item.inprogress} id={item.id} />
            )
          })
          }
        </div>
      </div>

    </div>
  );
}


export default App;

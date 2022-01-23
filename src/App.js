import "./App.css";
import React, { useState, useEffect } from "react";
// import { TextField, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { supabase } from './client'
import TasksList from "./TasksList";
import Login from "./Login";
// import { ChakraProvider } from "@chakra-ui/react";
// import { theme } from "theme";
// import { Auth } from "Auth";
// import { Account } from "Account";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [firstLoad, setFirstLoad] = useState(false)
  const [closing, setClosing] = useState(false)
  const [setting, setSetting] = useState(false)
  const [noTodo, setNoTodo] = useState(false);
  const [adding, setAdding] = useState(false);
  const [farsi, setFarsi] = useState(false);
  // login session
  // const [session, setSession] = useState(null);
  const [login, setLogin] = useState(false);
  // const [logout, setLogout] = useState(false);

  // useEffect(() => {
  //   setSession(supabase.auth.session());

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);


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
    setAdding(false);


  }
  const onChangeHandler = (e) => {
    setTask(e.target.value);
    setNoTodo(false);
  }
  const addTask = async (e) => {
    e.preventDefault();

    if (task !== "") {
      setNoTodo(false);
      setAdding(true);
      await supabase
        .from('todos')
        .insert(
          [
            {
              todo: task,
              inprogress: true,
              // user_id:user.id
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
    setLogin(true);
  }
  const exitApp = () => {
    setSetting(false);
    setClosing(true);
  }
  const loginHandler = async () => {
    if (login) {

      await supabase.auth.signOut()


    } else {
      setLogin(true)
    }
    setSetting(false);
  }



  return (

    <div className="App">
      {/* login page */}
      {login && <div className="loginPage container">
        {/* language */}
        <div className="lang-firstpage" onClick={() => { farsi ? setFarsi(false) : setFarsi(true) }}>
          {farsi ? "english" : "فارسی"}
        </div>
        {isLoading && <div
          className="loading">
          <div className="circle-border">
            <div className="circle-core"></div>
          </div>
          <p>loading...</p>
        </div>}
        {!isLoading && <Login
          setIsLoading={setIsLoading}
          setLogin={setLogin}
          exitApp={exitApp}
          farsi={farsi}
        />}
      </div>}
      {/* first page */}
      {firstLoad && <div className="firstLoad container">
        {/* language */}
        <div className="lang-firstpage" onClick={() => { farsi ? setFarsi(false) : setFarsi(true) }}>
          {farsi ? "english" : "فارسی"}
        </div>
        <div className={`wellcome ${farsi ? "wellcome-fa" : ""}`}>
          {farsi && <h1>
            به اپلیکیشن <span>لیست کارها </span>خوش آمدید!
          </h1>}
          {!farsi && <h1>
            welcome to the
            <span> To Do List </span> application</h1>}
          {farsi && <p>ارائه شده توسط <span>رضوان</span></p>}

          {!farsi && <p className="owner">presented by <span>Rezvan</span></p>
          }        </div>
        <div className="startApp" onClick={startApp}>
          {farsi && <span>ورود به برنامه</span>}
          {!farsi && <span>go to the app</span>}
        </div>
      </div>
      }

      {/* tasks page */}
      {!login && !firstLoad && !closing && <div className="container" >
        {/* loading */}
        {isLoading && <div
          className="loading">
          <div className="circle-border">
            <div className="circle-core"></div>
          </div>
          <p>{farsi ? "یه لحضه..." : "loading..."}</p>
        </div>}
        {/* tasks panel */}
        {!isLoading && <div className="tasks">
          {/* header */}
          <div className="header">
            <h1>{farsi ? "لیست کارها" : "To Do list"}</h1>
            {/* header side */}
            <div className="headerSide">

              {!setting && <svg xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="currentColor"
                className="setting bi bi-gear-fill"
                viewBox="0 0 16 16"
                onClick={() => setSetting(true)}
              >
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
              </svg>}
            </div>

            {setting && <div className="settingItems">

              {/* back to tasks */}
              <div className="back" onClick={() => setSetting(false)}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16"
                  fill="currentColor"
                  class="bi bi-x"
                  viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>

              {/* language */}
              <div className={`lang-inside ${!farsi ? "lang-inside-fa" : ""}`} onClick={() => { farsi ? setFarsi(false) : setFarsi(true) }}>
                <span> {farsi ? "lang" : "زبان"}</span>  {farsi ? "english" : "فارسی"}
              </div>

              {/* login */}
              <div className="login" onClick={loginHandler}>
                {login ? <>
                  login <svg xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16"
                    fill="secondary"
                    className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                    <path fillRule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                  </svg>
                </>
                  : <>
                    {farsi ? " خروج از حساب" : "logout"}  <svg xmlns="http://www.w3.org/2000/svg"
                      width="16" height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-left"
                      viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                      <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                    </svg>
                  </>}
              </div>

              {/* exit app */}
              <div className="exitApp" onClick={exitApp}>
                {farsi ? "خروج از برنامه" : "exit app"} <svg xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
              </div>
            </div>}
          </div>

          {/*  tasks*/}
          {adding && <div >
            <CircularProgress
              color="success"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <p className="addingSampleText"              >
              {farsi ? "دارم کار جدید رو مینویسم" : "new task is writing..."}
            </p>
          </div>}
          {taskList.map(item => {
            return (
              <TasksList
                key={item.id}
                todo={item.todo}
                inprogress={item.inprogress}
                id={item.id}
                getTasks={getTasks}
                tasksList={taskList}
                setTaskList={setTaskList}
              />
            )
          })
          }
          {/* form */}
          <form className={`form ${farsi ? "form-fa" : ""}`} onSubmit={addTask}>
            < span >
              {farsi ? "میخوای چی کار کنی؟" : "what do you whant to do?"}
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
              {farsi ? "بنویسش" : "write it!"}
            </button>}
            {noTodo && <div className="noTodo">
              {farsi ? "اول یه کار رو بنویس لطفا" : "please insert a task in the field first"}
            </div>}
            {noTodo && <button onClick={() => setNoTodo(false)}>
              {farsi ? "متوجه شدم!" : "I get it!"}</button>}
          </form>


        </div>}
      </div>}
      {closing &&
        <div className="exitPage container">
          <div className="lastpage">
            <p className="thanks">Thank you!
              <svg xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="red"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg></p>

            {/* <a href="mailto:fatemeh.abolhasanzade@gmail.com" target={"_blank"}>contact us</a> */}
            <p className="backToApp" onClick={() => {
              setClosing(false)
              setFirstLoad(true)
            }} >
              {farsi ? "برگشت به برنامه" : "back to application"}
            </p>
          </div>
        </div>}
    </div >
  );
}


export default App;

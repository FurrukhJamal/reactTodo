import "./App.css";
import {useState} from "react";

export const Data = [
  {
    id : "1" ,
    title : "Read on react.Read on reactRead on reacRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on react" ,
    completed : false
  },
  {
    id : "2" ,
    title : "do your gorcceries" ,
    completed : true
  },
  {
    id : "3" ,
    title : "take shower" ,
    completed : false
  },
]

function App(){
  const[todos, setTodos] = useState(Data)

  return (
    <div className = "appContainer">
      <div className = "todo-app">
          <h2>TODO app</h2>
          <form action = "#">
            <input
              type = "text"
              placeholder = "What do you want to do?"
              className = "todo-input"
              />
          </form>
          <div className = "todoListContainer">

            {
              todos.map(todo=>(
                <div key = {todo.id}  className = "todoListRow">
                  <div>
                    <input type = "checkbox"/>
                  </div>
                  <div className = "todoText">
                    <h5>{todo.title}</h5>
                  </div>
                  <div className = "crossButton">
                    <p style = {{fontSize : 26}}>X</p>
                  </div>
                </div>
              ))
            }

            <div className = "todoListRow">
              <div>
                <input type = "checkbox"/>
              </div>
              <div className = "todoText">
                <h5>DO something usefull</h5>
              </div>
              <div className = "crossButton">
                <p style = {{fontSize : 26}}>X</p>
              </div>
            </div>
          </div>
          {/*Check all container*/}
          <div className = "checkallContainer">
            <div>
              <button>Check All</button>
            </div>
            <div>
              <p>3 imtems remaining</p>
            </div>
          </div>

          {/*Buttons Container*/}
          <div className = "buttonsContainer">
            <div style = {{display: "flex", flexDirection : "row"}}>
              <button className = "but">All</button>
              <button className = "but">Active</button>
              <button className = "but">Completed</button>
            </div>
            <div>
              <button className = "but">Clear Completed</button>
            </div>
          </div>
      </div>
    </div>

  );
}

export default App;

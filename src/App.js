import "./App.css";
import React, {useState} from "react";

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
  const[newtodo, setNewTodo] = useState("")
  const[selectedTodos, setSelectedTodos] = useState([])

  React.useEffect(()=> {
    console.log("Selected checkbox ids ARE : ", selectedTodos)
  }, [selectedTodos])

function handleChange(e){
  const value =  e.target.value
  setNewTodo(value)
}

function handleSubmit(e){
  if(e.keyCode == 13)
  {
    console.log("Submitted")
    let len = todos.length
    setTodos([...todos, {id : len + 1, title : e.target.value, completed : false}])
    console.log("todos are", todos)
    setNewTodo("")
  }
}

  function handleSelect(id, e ){
    console.log("id selected is :", id)
    console.log("checked:", e.target.checked)
    if(e.target.checked && !selectedTodos.includes(id))
    {
      setSelectedTodos([...selectedTodos, id])
    }
    else if(!e.target.checked && selectedTodos.includes(id))
    {
      //item was checked then unchecked
      let indx = todos.indexOf(id)
      let selected = [...selectedTodos]
      selected.splice(indx, 1)
      setSelectedTodos([...selected])
    }
    //console.log("Selected ids are :", selectedTodos)
  }


  function markCompleted(){
    selectedTodos.forEach(selectedid=>{
      todos.forEach((todo, index) =>{
        if(todo.id == selectedid)
        {
          setTodos(previous => {
            previous[index].completed = true
            return [...previous]
          })
        }
      })
    })
  }

  return (
    <div className = "appContainer">
      <div className = "todo-app">
          <h2>TODO app</h2>
          <form action = "#">
            <input
              type = "text"
              placeholder = "What do you want to do?"
              className = "todo-input"
              onChange = {handleChange}
              onKeyDown = {handleSubmit}
              value = {newtodo}
              />
          </form>
          <div className = "todoListContainer">

            {
              todos.map(todo=>(
                <div key = {todo.id}  className = "todoListRow">
                  <div>
                    <input onChange = {(e)=>handleSelect(todo.id, e)} type = "checkbox"/>
                  </div>
                  <div className = "todoText">
                    <h5 style = {todo.completed ? ({textDecoration : "line-through"}) : null}>{todo.title}</h5>
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
              <button onClick = {markCompleted} className = "but">Completed</button>
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

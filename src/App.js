import "./App.css";
import React, {useState} from "react";

export const Data = [
  {
    id : "1" ,
    title : "Read on react.Read on reactRead on reacRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on reactRead on react" ,
    completed : false,
    selected  : false,
  },
  {
    id : "2" ,
    title : "do your gorcceries" ,
    completed : true,
    selected  : false,
  },
  {
    id : "3" ,
    title : "take shower" ,
    completed : false,
    selected  : false,
  },
]

function App(){
  const[todos, setTodos] = useState([])
  const[newtodo, setNewTodo] = useState("")
  const[selectedTodos, setSelectedTodos] = useState([])
  const[allChecked, setAllChecked] = useState(false)

  React.useEffect(()=>{
    let result = localStorage.getItem("mytodos")
    let data = JSON.parse(result)
    console.log("data retrieved is:", data)
    if(data)
    {
      console.log("inside if condition of useEffect")
      setTodos([...data])
    }
    else
    {
      setTodos([])
    }
  }, [])

  React.useEffect(()=> {
    console.log("Selected checkbox ids ARE : ", selectedTodos)
  }, [selectedTodos])

  React.useEffect(()=> {
    console.log("todos in useEffect", todos)
    localStorage.setItem("mytodos", JSON.stringify(todos))
    let result = localStorage.getItem("mytodos")
    let data = JSON.parse(result)
    console.log("todos after update:", data)
  }, [todos])



function handleChange(e){
  const value =  e.target.value
  setNewTodo(value)
}

/*Submits a todo if an enter key is pressed*/
function handleSubmit(e){
  if(e.keyCode == 13)
  {
    console.log("Submitted")
    let len = todos.length
    setTodos([...todos, {id : len + 1, title : e.target.value, completed : false}])
    //console.log("todos are", todos)
    setNewTodo("")
  }
}


  function handleSelect(id, e ){
    console.log("id selected is :", id)
    console.log("checked:", e.target.checked)
    //set selected all flag in state to false

    if(e.target.checked && !selectedTodos.includes(id))
    {
      let todoscopy = [...todos]
      todoscopy.forEach((item, i) => {
        if(item.id == id)
        {
          todoscopy[i].checked = true
        }
      });

      //todoscopy[id - 1].checked = true
      setTodos([...todoscopy])
      setSelectedTodos([...selectedTodos, id])
    }
    else if(!e.target.checked && selectedTodos.includes(id))
    {
      /*item was checked then unchecked*/
      //changing the checked flag for that todo
      let todoscopy = [...todos]
      //todoscopy[id - 1].checked = false
      todoscopy.forEach((item, i) => {
        if(item.id == id)
        {
          todoscopy[i].checked = false
        }
      });

      setTodos([...todoscopy])

      let indx = todos.filter(a=> a.id==id)
      console.log("DEBUGG indx: ", indx)
      let selected = [...selectedTodos]
      // selected.splice(indx[0].id, 1)
      let result
      selected.forEach((item, index)=>{
        console.log("DEBUGG item", item )
        if(item == id)
        {
          result = index

        }
      })
      console.log("DEBUG result :", result)
      selected.splice(result, 1)
      setSelectedTodos([...selected])

    }
    //console.log("Selected ids are :", selectedTodos)
  }

/*checks for all the todos that are chaecked than mark them as completed
in the todos state variable array*/
  function markCompletedIncompleted(bool){
    selectedTodos.forEach(selectedid=>{
      todos.forEach((todo, index) =>{
        if(todo.id == selectedid)
        {
          setTodos(previous => {
            previous[index].completed = bool
            return [...previous]
          })
        }
      })
    })
  }

  function handleCheckAll(){
    setAllChecked(true)
    todos.forEach((todo, index)=> {

      let todoscopy = [...todos]
      todoscopy[index].checked = true
      setTodos([...todoscopy])

      setSelectedTodos(previous => {
        return [...previous, todo.id]
      })
    })
  }

  function handleUnCheckAll(){
    setAllChecked(false)

    todos.forEach((todo, index)=> {

      let todoscopy = [...todos]
      todoscopy[index].checked = false
      setTodos([...todoscopy])

    setSelectedTodos([])
  })
}


function calculateRemainingTodos(){
  console.log("DEBUGG Calcution working")
  let count = 0
  for(let i = 0; i < todos.length; i++)
  {
    if(!todos[i].completed)
    {
      count++
    }
  }
  return count
}

function deleteCompleted(){
  let Alltodos = [...todos]
  let result = Alltodos.filter(a=> a.completed == false)
  console.log("DEBUGG result in deletecomplete function:", result)
  setTodos([...result])
}


function deleteTodo(id){
  console.log("Removed Click")
  console.log("DEBUGG id : ", id )
  let allTodos = [...todos]
  let indx
  allTodos.forEach((item, index)=> {
    if(item.id == id)
    {
      indx = index
      console.log("DEBUG indx : ", indx)

    }

  })
  console.log("DEBUG indx returned from map:", indx)
  allTodos.splice(indx, 1)
  setTodos([...allTodos])
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
                    <input onChange = {(e)=>handleSelect(todo.id, e)} type = "checkbox"   checked = {todo.checked}/>
                  </div>
                  <div className = "todoText">
                    <h5 style = {todo.completed ? ({textDecoration : "line-through"}) : null}>{todo.title}</h5>
                  </div>
                  <div className = "crossButton">
                    <button
                      className = "deleteButton"
                      onClick = {()=>deleteTodo(todo.id)}>
                        X
                    </button>
                  </div>
                </div>
              ))
            }


          </div>
          {/*Check all container*/}
          <div className = "checkallContainer">
            <div>
              {
                allChecked ? (
                  <button onClick = {handleUnCheckAll}>Uncheck All</button>
                ):
                (
                  <button onClick = {handleCheckAll}>Check All</button>
                )
              }

            </div>
            <div>
              <p>{calculateRemainingTodos()} todos remaining</p>
            </div>
          </div>

          {/*Buttons Container*/}
          <div className = "buttonsContainer">
            <div style = {{display: "flex", flexDirection : "row"}}>
              <button onClick = {()=>{
                console.log("Delete All clicked")
                setTodos([])
                window.localStorage.removeItem("mytodos")
                let test = localStorage.getItem("mytodos")
                console.log(test)}}
                 className ="but">Delete All</button>
              <button onClick = {()=>markCompletedIncompleted(false)} className = "but">Active</button>
              <button onClick = {()=>markCompletedIncompleted(true)} className = "but">Completed</button>
            </div>
            <div>
              <button onClick = {deleteCompleted}className = "but">Clear Completed</button>
            </div>
          </div>
      </div>
    </div>

  );
}

export default App;

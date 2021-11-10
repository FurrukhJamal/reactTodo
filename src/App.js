import "./App.css";
function App(){
  return (
    <div className = "appContainer">
      <div className = "todo-app">
          <h2>TODO app</h2>
          <form action = "#">
            <input
              type = "text"
              placeholder = "What do you want to do?"
              className = "todo-input"
              value = ""/>
          </form>
          <div className = "todoListContainer">
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
      </div>
    </div>

  );
}

export default App;

import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    /*console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);*/
  }

  /*setListName= (e) => {
    console.log("setListName from app.js");
    //return "asdasd";
    //this.props.todoList.name = e;
}

setListOwner = (list) => {
    console.log("setListOwner from app.js" + list.owner);
}*/

setListName = (todoListToChange) => {
    console.log(todoListToChange.target.value);
    let cpy = [...this.state.todoLists];

   



    //this.setState({todoLists : cpy});
}

moveUp() {
  console.log("moveup method app.js");
}

moveDown() {
  console.log("moveDown app.js");
}

removeItem() {
  console.log("removeitem app.js");
}

editItem = (e) => {
  e.stopPropigation();
  console.log("edititem app.js");
  this.addItem();

  var descriptiontf = document.getElementById("item_assigned_to_textfield");  
  descriptiontf.innerHTML = "asd";
}

addItem = () => {
  console.log("additem app.js");
  this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  //this.setState({currentList: null});
    //this.setState({currentList: todoListToLoad});
}

cancelItemChange = () =>{
  console.log("cancelitemchange app.js");
  this.setState({currentScreen: AppScreen.LIST_SCREEN});

  //this.loadList(todoListToLoad);
}

submitItemChange = () =>{
  console.log("submititemchange app.js");
}

createNewList(){
  console.log("create new list app.js");
}


  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        createNewList={this.createNewList} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          setListName={this.setListName}
          moveUp={this.moveUp}
          moveDown={this.moveDown}
          removeItem={this.removeItem}
          addItem={this.addItem}  
          editItem={this.editItem} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          cancelItemChange={this.cancelItemChange}
          submitItemChange={this.submitItemChange} />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
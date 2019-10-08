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

 

setListOwner = (todoListToChange, val) => {
    todoListToChange.owner = val.target.value;

}

setListName = (todoListToChange, val) => {
    console.log(val.target.value);
    console.log(todoListToChange.name);
    todoListToChange.name = val.target.value;
    /*let cpy = [...this.state.todoLists];
    var indx = 0;
    var item;
    var found;*/ 
    
   
    //this.setState({todoLists : cpy});
}

moveUp = (listItem) => {
  console.log("moveup method app.js");
  //console.log(listItem.key)
  let cpy = [...this.state.todoLists];
  var indx = 0;
  var item;
  var found; 
  for(; indx < cpy.length; indx++)
  {
    if(cpy[indx].items[listItem.key].description === listItem.description){
      item = cpy[indx].items[listItem.key];
      found = indx;
      indx = cpy.length;
    }
  }

  console.log(item.description);

  if( listItem.key === 0)
    console.log("first item");
  else{
    var desc = item.description;
    var assign = item.assigned_to;
    var due = item.due_date;
    var compl = item.completed;
    item.description = cpy[found].items[listItem.key-1].description;
    item.assigned_to = cpy[found].items[listItem.key-1].assigned_to;
    item.due_date = cpy[found].items[listItem.key-1].due_date;
    item.completed = cpy[found].items[listItem.key-1].completed;
    cpy[found].items[listItem.key-1].description = desc;
    cpy[found].items[listItem.key-1].assigned_to = assign;
    cpy[found].items[listItem.key-1].due_date = due;
    cpy[found].items[listItem.key-1].completed = compl;
    
    this.setState({});
  }
}

moveDown = (listItem) => {
  console.log("moveDown app.js");
  console.log(listItem.description);
  console.log(...this.state.todoLists);

  let cpy = [...this.state.todoLists];
  var indx = 0;
  var item;
  var found; 
  for(; indx < cpy.length; indx++)
  {
    if(cpy[indx].items[listItem.key].description === listItem.description){
      item = cpy[indx].items[listItem.key];
      found = indx;
      indx = cpy.length;
    }
  }

  console.log(item.description);

  if( (cpy[found].items.length-1) === listItem.key)
    console.log("last item");
  else{
    var desc = item.description;
    var assign = item.assigned_to;
    var due = item.due_date;
    var compl = item.completed;
    item.description = cpy[found].items[listItem.key+1].description;
    item.assigned_to = cpy[found].items[listItem.key+1].assigned_to;
    item.due_date = cpy[found].items[listItem.key+1].due_date;
    item.completed = cpy[found].items[listItem.key+1].completed;
    cpy[found].items[listItem.key+1].description = desc;
    cpy[found].items[listItem.key+1].assigned_to = assign;
    cpy[found].items[listItem.key+1].due_date = due;
    cpy[found].items[listItem.key+1].completed = compl;
    
    this.setState({});
  }
  
}

removeItem = (listItem) => {
  //listItem.stopPropagation();
  console.log("removeitem app.js");
  let cpy = [...this.state.todoLists];
  var indx = 0;
  var item;
  var found; 
  for(; indx < cpy.length; indx++)
  {
    console.log("key : " + listItem.key + "index: " + indx);
    if(cpy[indx].item.length > listItem.key)
      if(cpy[indx].items[listItem.key].description === listItem.description){
        item = cpy[indx].items[listItem.key];
        found = indx;
        indx = cpy.length;
      }
  }
  cpy[found].items.splice(listItem.key, 1);
  console.log("removing item");
  //cpy[found].numItems = cpy[found].numItems - 1;
  console.log(cpy[found].items.length);
  for(indx = 0; indx < cpy[found].items.length; indx++)
  {
    console.log(indx);
    cpy[found].items[indx].key = indx;
    this.setState({});

  }
  //listItem.key = -1;
  this.setState({});
}

editItem = (itemToEdit) => {
  //event.stopPropagation();
  console.log("edititem app.js : " + itemToEdit.description);
  this.addItem();

  var descriptiontf = document.getElementById("item_assigned_to_textfield");  
  console.log("descriptiontf appjs: " + descriptiontf);
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

submitItemChange = (item) =>{
  console.log("submititemchange app.js");
  //item.getElementById("item_description_textfield");
  console.log(item);
  console.log(this.props.currentList);
  
  const newTodo = {
    key: 5,
    description: item,
    due_date: "00-00-0000",
    assigned_to: "rick",
    completed: false
  }

  this.setState({currentList: [...this.state.currentList.items, newTodo]  });
}

createNewList(){
  console.log("create new list app.js");
}

setTextFieldPrompt = (item) =>{
  //document.getElementById(item).innerHTML = "asdasd";
  //this.setState({ value: "asdasd22"});

  
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
          setListOwner={this.setListOwner}
          moveUp={this.moveUp}
          moveDown={this.moveDown}
          removeItem={this.removeItem}
          addItem={this.addItem}  
          editItem={this.editItem} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          cancelItemChange={this.cancelItemChange}
          submitItemChange={this.submitItemChange} 
          setTextFieldPrompt={this.setTextFieldPrompt}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
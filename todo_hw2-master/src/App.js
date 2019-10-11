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

const newTodo = {
  key: -1,
  description: "",
  due_date: "",
  assigned_to: "",
  completed: ""
}



class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    taskSort: 0,
    dueDateSort: 0,
    completedSort: 0
  }
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this))
    }
  handleKeyDown(e) {
    if (e.ctrlKey && e.which === 87) {
       console.log("first one 87")
    } else if (e.ctrlKey & e.which === 83) {
      console.log("first one 83")
    } else if (e.ctrlKey && e.shiftKey && e.which === 68) {
      console.log("first one 87")
    }
   }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("thislist: " + todoListToLoad.name);
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
      if(cpy[indx].items.length > listItem.key)
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
      if(cpy[indx].items.length > listItem.key)
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
      if(cpy[indx].items.length > listItem.key)
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

    newTodo.description = itemToEdit.description;
    newTodo.assigned_to = itemToEdit.assigned_to;
    newTodo.due_date = itemToEdit.due_date;
    newTodo.completed = itemToEdit.completed;
    newTodo.key = itemToEdit.key;

    console.log("key app.js: " + newTodo.key); 

    //this.setState({: newTodo });

    this.addItem();

    //this.resetItem();

  }

  resetItem(){
    newTodo.key = -1;
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
    console.log("todolists: " + this.props.todoLists);
    this.resetItem();
    //this.loadList(todoListToLoad);
  }

  submitItemChange = (item) =>{
    console.log("submititemchange app.js");
    //item.getElementById("item_description_textfield");
    console.log("item key: " + item.key);
    console.log("todolists: " + this.props.todoLists);
    console.log("currentList: " + this.state.currentList.items.length);

    if(item.key === -1){
      //CREAING A NEW ITEM
      const newTodo = {
        key: this.state.currentList.items.length,
        description: item.descrip,
        due_date: item.dued,
        assigned_to: item.assign,
        completed: item.compl
      }
      if(newTodo.description === "")
        newTodo.description = "Unknown";

      this.state.currentList.items.push(newTodo);
    }else{
      //MODIFYING AN EXISTING ITEM
      //console.log("current todoList " + this.state.currentList.items;
      let newItem = this.state.currentList.items[item.key];
      newItem.description = item.descrip;
      newItem.assigned_to = item.assign;
      newItem.due_date = item.dued;
      console.log("test: " + newItem.completed);
      console.log("test2: " + item.compl);
      newItem.completed = item.compl;
      console.log("oldItem name: " + newItem.description);
      console.log("newitem name: " + item.descrip)

    }
    
    
  

    //this.setState({currentList: [...this.state.currentList.items, newTodo]  });
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.resetItem();

  }

  createNewList= () =>{
    console.log("create new list app.js");
    //this.setState({currentScreen: AppScreen.LIST_SCREEN});

    let todos = this.state.todoLists;
    console.log(todos.length);
    const newTodo = {
      key: todos.length,
      items: [],
      name: "Unknown",
      owner: "Unknown",
    }
    todos.push(newTodo);
    this.setState({todoLists: todos});
    this.loadList(newTodo);
    //this.setState({todoLists: todoLists});
    //this.setState({todoLists: newTodo});
  // console.log("thislist: " + todoListToLoad.name);
  }

  confirmDeleteList = () => {
    console.log("confirm deletelist appjs");
    console.log(this.state.currentList);

      this.state.todoLists.splice(this.state.currentList.key, 1);
      console.log("removing item");
      let cpy = [...this.state.todoLists];
      var indx = 0;
      for(; indx < this.state.todoLists.length; indx++)
      {
        console.log(indx);
        cpy[indx].key = indx;
      }

      this.goHome();
  }

  sortByDueDate = () =>{
    console.log("sortByDueDate appjs");
    let cpy = [...this.state.todoLists];
    let items = cpy[this.state.currentList.key].items;
    //console.log("items before: " + items[0].description);
    if(this.state.dueDateSort === 0){
      items.sort(function(a, b){
        var x = a.due_date;
        var y = b.due_date;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      this.setState({dueDateSort: 1});
    }else{
        items.sort(function(a, b){
          var x = a.due_date;
          var y = b.due_date;
          if (x > y) {return -1;}
          if (x < y) {return 1;}
          return 0;
        });
        this.setState({dueDateSort: 0});
    }
    this.resetItemsKey();
    this.setState({todolists: cpy});
  }

  sortByTask = (todoList) =>{
    console.log("sortByTask appjs");
    //this.state.todoLists[0].items.sort();
    let cpy = [...this.state.todoLists];
    let items = cpy[this.state.currentList.key].items;
    //console.log("items before: " + items[0].description);
    if(this.state.taskSort === 0){
      items.sort(function(a, b){
        var x = a.description;
        var y = b.description;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      this.setState({taskSort: 1});
    }else{
        items.sort(function(a, b){
          var x = a.description;
          var y = b.description;
          if (x > y) {return -1;}
          if (x < y) {return 1;}
          return 0;
        });
        this.setState({taskSort: 0});
    }
    this.resetItemsKey();
    this.setState({todolists: cpy});
  }

  resetItemsKey = () => {
    let cpy = [...this.state.todoLists];
    var indx = 0;
    for(; indx < cpy[this.state.currentList.key].items.length; indx++)
    {
      cpy[this.state.currentList.key].items[indx].key = indx;
    }
    //his.setState({});

  }

  sortByStatus = () =>{
    console.log("sortByStatus appjs");
    let cpy = [...this.state.todoLists];
    let items = cpy[this.state.currentList.key].items;
    //console.log("items before: " + items[0].description);
    if(this.state.completedSort === 0){
      items.sort(function(a, b){
        var x = a.completed;
        var y = b.completed;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      this.setState({completedSort: 1});
    }else{
        items.sort(function(a, b){
          var x = a.completed;
          var y = b.completed;
          if (x > y) {return -1;}
          if (x < y) {return 1;}
          return 0;
        });
        this.setState({completedSort: 0});
    }
    this.resetItemsKey();
    this.setState({todolists: cpy});

    
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
          editItem={this.editItem} 
          deleteList={this.deleteList}
          sortByTask={this.sortByTask}
          sortByDueDate={this.sortByDueDate}
          sortByStatus={this.sortByStatus}
          confirmDeleteList={this.confirmDeleteList}
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          cancelItemChange={this.cancelItemChange}
          submitItemChange={this.submitItemChange} 
          setTextFieldPrompt={this.setTextFieldPrompt}
          setMyStateTwo={this.setMyStateTwo}
          itemToEdit={newTodo}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
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
    completedSort: 0,
    transactions: [],
    mostRecentTransaction: -1,
    performingDo: false,
    performingUndo: false,
    redoTransactions: [],
    numRedoTransactions: -1
  }

  isPerformingDo = () => {
    return this.state.performingDo;
  }

  isPerformingUndo = () => {
    return this.state.performingUndo;
  }

  addTransaction = (transaction) => {
    this.setState({performingDo: true});

    if((this.state.mostRecentTransaction < 0) || (this.mostRecentTransaction < (this.state.transactions.length-1))){
      var i = transaction.length-1;
      for(; i > this.state.mostRecentTransaction; i--){
        this.state.transactions.splice(i, 1);
      }
    }

    this.setState({mostRecentTransaction: this.state.mostRecentTransaction+1});

    this.state.transactions.push(transaction);
    this.setState({performingDo: false});

   // this.doTransaction();


    console.log(this.toString());
  }

  /*doTransaction = () => {
    console.log("do transaction");
    if (this.hasTransactionToRedo()) {
      this.setState({performingDo: true});
        //this.state.performingDo = true;
        //let transaction = this.state.transactions[this.state.mostRecentTransaction+1];
        //this.doTransactionTwo(transaction);
        //this.state.mostRecentTransaction++;
        this.setState({mostRecentTransaction: this.state.mostRecentTransaction+1});

       // this.setState({mostRecentTransaction: this.state.mostRecentTransaction+1})
        this.setState({performingDo: false});
      }
}

  doTransactionTwo(){
    console.log("dotransactionTwo");
  }*/

  toString() {
    var text = "--Number of Transactions: " + this.state.transactions.length + "\n";
    text += "--Current Index on Stack: " + this.state.mostRecentTransaction + "\n";
    text += "--Current Transaction Stack:\n";
    var i = 0;
    for (; i <= this.state.mostRecentTransaction; i++) {
        let jT = this.state.transactions[i].process + " " + this.state.transactions[i].item.description;
        text += "----" + jT.toString() + "\n";
    }
    return text;
  }

  hasTransactionToUndo() {
    return this.state.mostRecentTransaction >= 0;
  }

  hasTransactionToRedo() {
    return this.state.numRedoTransactions >= 0;
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this))
    }

  redoRemoveItem = (item) => {
    console.log("redoRemoveItem");
    console.log("item to redo-remove: " + this.state.redoTransactions[this.state.numRedoTransactions].item.description);

    this.removeItem(this.state.redoTransactions[this.state.numRedoTransactions].item);
    let removeLast = this.state.redoTransactions;
    removeLast.splice((removeLast.length-1),1);
    this.setState({redoTransactions: removeLast});

    //this.state.redoTransactions.splice(this.state.redoTransactions[0],1);
    this.setState({numRedoTransactions: this.state.numRedoTransactions - 1});

    




  }

  undoRemoveItem = (itemToAdd) => {
    
    console.log("undoRemoveItem: " + itemToAdd.description);

    newTodo.description = itemToAdd.description;
    newTodo.due_date = itemToAdd.due_date;
    newTodo.assigned_to = itemToAdd.assigned_to;
    newTodo.completed = itemToAdd.completed;
    this.state.currentList.items.push(itemToAdd);
    var insertIndex = itemToAdd.key;

    this.resetItemsKey();


    var endIndex = this.state.currentList.items.length - 2;
    let listOfItems = this.state.currentList.items;
    for(;endIndex >= insertIndex; endIndex--){
      listOfItems[endIndex + 1].description = listOfItems[endIndex].description;
      listOfItems[endIndex + 1].due_date = listOfItems[endIndex].due_date;
      listOfItems[endIndex + 1].assigned_to = listOfItems[endIndex].assigned_to;
      listOfItems[endIndex + 1].completed = listOfItems[endIndex].completed;
    }
    //AFTER FOR LOOP ALL ITEMS HAVE BEEN SHIFTED AND ITEMS CONTAINS A DUPLICATE 
    //AT ITEMTOADD.KEY AND ITEMTOADD.KEY+1. INSERT ITEM TO ITEMTOADD.KEY
    listOfItems[insertIndex].description = newTodo.description;
    listOfItems[insertIndex].due_date = newTodo.due_date;
    listOfItems[insertIndex].assigned_to = newTodo.assigned_to;
    listOfItems[insertIndex].completed = newTodo.completed;    

  

    this.setState({currentList: this.state.currentList});

    //console.log("adding to redoList: " + myTrans.item.description);

    const newTodo2 = {
      key: this.state.currentList.items[insertIndex].key,
      description: this.state.currentList.items[insertIndex].description,
      due_date: this.state.currentList.items[insertIndex].due_date,
      assigned_to: this.state.currentList.items[insertIndex].assigned_to,
      completed: this.state.currentList.items[insertIndex].completed
    }

    const myTrans = {
      process: "removeitem",
      item: newTodo2
    }
  
    
    this.state.redoTransactions.push(myTrans);
        

    //this.setState({redoTransactions: this.state.redoTransactions});

  

  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.which === 90) {
      //UNDO
       console.log("control-z");


      if(this.hasTransactionToUndo()){
        this.setState({performingUndo: true});
        let transaction = this.state.transactions[this.state.mostRecentTransaction];
        console.log("trans process: " + transaction.process);

        if(transaction.process === "removeitem"){
          this.undoRemoveItem(transaction.item);
        }

        this.setState({mostRecentTransaction: this.state.mostRecentTransaction-1});
        this.setState({numRedoTransactions: this.state.numRedoTransactions + 1});
        this.state.transactions.pop();
        this.setState({performingUndo: false});
      }

        console.log(this.toString());
    } else if (e.ctrlKey & e.which === 89) {
      //REDO
      console.log("control-y");

      if(this.hasTransactionToRedo()){
        let transaction = this.state.redoTransactions[this.state.numRedoTransactions];
        console.log("transaction test: " + transaction.item.description);
        if(transaction.process === "removeitem"){
          this.redoRemoveItem();
        }
      }


      //REDO
      console.log("control-y");
      //this.setState()
      
    } 

    this.checkForDuplicates();


  }

  checkForDuplicates = () =>{
    //LOOP THROUGH BOTH TRANSACTIONS AND REDOTRANSACTIONS TO INSURE THAT NO 
    //TWO ITEMS HAVE THE SAME PROCESS & ITEM. 
    //IF THEY THERE IS A MATCH REMOVE THE LOWER INDEX (LATEST OCCURING)

    
  }

  clearAllTransactions(){
    this.setState({transactions: []});
    this.setState({mostRecentTransaction: -1});
    this.setState({redoTransactions: []});
    this.setState({numRedoTransactions: -1});
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    this.clearAllTransactions();
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    //console.log("thislist: " + todoListToLoad.name);
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
    //console.log("removeitem app.js");
    let cpy = [...this.state.todoLists];
    var indx = 0;
    //var item = null;
    var found = this.state.currentList.key;
    /*for(; indx < cpy.length; indx++)
    {
      console.log("key : " + listItem.key + "index: " + indx);
      if(cpy[indx].items.length > listItem.key)
        if(cpy[indx].items[listItem.key].description === listItem.description){
          item = cpy[indx].items[listItem.key];
          found = indx;
          indx = cpy.length;
        }
    }*/
    cpy[found].items.splice(listItem.key, 1);
   // console.log("removing item");
    //cpy[found].numItems = cpy[found].numItems - 1;
   // console.log(cpy[found].items.length);
    for(indx = 0; indx < cpy[found].items.length; indx++)
    {
      //console.log(indx);
      cpy[found].items[indx].key = indx;
      this.setState({});

    }
    //listItem.key = -1;
    this.setState({});

    const myTrans = {
      process: "removeitem",
      item: listItem
    }

    console.log("Adding (removeitem) Transaction: " + listItem.description);
    this.addTransaction(myTrans);
    //console.log(this.toString());
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
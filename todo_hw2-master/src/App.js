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
    //console.log("Adding Transaction (app.js: 45) (" + transaction.process + "): "
    // + transaction.item.description)
  }

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
    if(this.state.mostRecentTransaction >= 0)
      if(!this.state.transactions[this.state.mostRecentTransaction].item)
        console.log("item is null-undo");

    return this.state.mostRecentTransaction >= 0;
  }

  hasTransactionToRedo() {
    if (this.state.numRedoTransactions >= 0)
      if(!this.state.redoTransactions[this.state.numRedoTransactions].item)
        console.log("item is null-redo");
    return this.state.numRedoTransactions >= 0;
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this))
  }

  undoMoveUp = () => {
    //console.log("undoMoveUp");
    //console.log("item to undoMoveUp(movedown): " + this.state.transactions[this.state.mostRecentTransaction].item.description);
    let transaction = this.state.transactions[this.state.mostRecentTransaction];
    var key = transaction.item.key;
    this.moveDown(transaction);
    const myTrans = {
      process: "moveup",
      item: this.state.currentList.items[key+1]
    }
    //console.log("item to undoMoveUp(movedown): match: " + myTrans.item.description);
    this.state.redoTransactions.push(myTrans); 
  }

  redoMoveUp = () => {
    //console.log("redoMoveUp");
    //console.log("item to redoMoveUp(moveup): " + this.state.redoTransactions[this.state.numRedoTransactions].item.description);
    let transaction = this.state.redoTransactions[this.state.numRedoTransactions];
    this.moveUp(transaction.item);
  }

  redoMoveDown = () => {
    //console.log("redoMoveDown");
    //console.log("item to redoMoveUp(movedown): " + this.state.redoTransactions[this.state.numRedoTransactions].item.description);
    let transaction = this.state.redoTransactions[this.state.numRedoTransactions];
    this.moveDown(transaction.item);
  }

  undoMoveDown = () => {
    //console.log("undoMoveDown");
    //console.log("item to undoMoveDown(moveup): " + this.state.transactions[this.state.mostRecentTransaction].item.description);
    let transaction = this.state.transactions[this.state.mostRecentTransaction];
    this.moveUp(transaction);
    const myTrans = {
      process: "movedown",
      item: this.state.currentList.items[transaction.item.key-1]
    }
    //console.log("item to undoMoveUp(movedown): match: " + myTrans.item.description);
    this.state.redoTransactions.push(myTrans);
  }

  redoRemoveItem = () => {
    //console.log("redoRemoveItem");
    //console.log("item to redo-remove: " + this.state.redoTransactions[this.state.numRedoTransactions].item.description);
    this.removeItem(this.state.redoTransactions[this.state.numRedoTransactions].item);
  }

  undoRemoveItem = (itemToAdd2) => {
    //console.log("test: " + this.state.transactions[0].item.key);

    var itemToAdd = itemToAdd2;
    var x = 0;
    if(!itemToAdd2.process)
    {
      //console.log("null");
    }
    else{
      //NOT NULL
      itemToAdd = itemToAdd2.item;
      x = 1;
    }
   // console.log("undoRemoveItem: " + itemToAdd.description);
    newTodo.description = itemToAdd.description;
    newTodo.due_date = itemToAdd.due_date;
    newTodo.assigned_to = itemToAdd.assigned_to;
    newTodo.completed = itemToAdd.completed;
    this.state.currentList.items.push(itemToAdd);
    var insertIndex = itemToAdd.key;
    //console.log("test3: " + this.state.transactions[0].item.key);
    var key2 = null;
    if(this.state.mostRecentTransaction >= 0)
      key2 = this.state.transactions[0].item.key;
    var test = key2;
    this.resetItemsKey();
    if(!key2){

    }else
      if(test != this.state.transactions[0].item.key){
        if(this.state.currentList.items[key2] && this.state.mostRecentTransaction >= 1){
          console.log("doing this");
          const myTrans2 = {
            process: this.state.transactions[this.state.mostRecentTransaction-1].process,
            item: this.state.currentList.items[key2]
          }
          this.state.transactions[this.state.mostRecentTransaction-1] = myTrans2;
        }
      }
    //console.log("test4: " + this.state.transactions[0].item.key);

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
    if(x === 0){
     // console.log("test2: " + this.state.transactions[0].item.key);
      this.state.redoTransactions.push(myTrans);
      //PRESERVING THE MOSTRECENTTRANS-1 TRANSACTION 


      //myTrans.process = this.state.transactions[this.state.mostRecentTransaction-1].process;
      //myTrans.item = this.state.currentList.items[key2];

    }else{
      myTrans.process = "newitem";
      this.addTransaction(myTrans);
    }
  }

  undoNewItem = () => {
    //console.log("undoNewItem: " + this.state.transactions[this.state.mostRecentTransaction].item.description);
    var item = this.state.transactions[this.state.mostRecentTransaction].item;
    this.removeItem(this.state.transactions[this.state.mostRecentTransaction]);
    const myTrans = {
      process: "newitem",
      item: item
    }
    //console.log("item to undoNewItem(): " + myTrans.item.description);
    this.state.redoTransactions.push(myTrans);
  }

  redoNewItem = () => {
    //console.log("redoNewItem: ");
    this.undoRemoveItem(this.state.redoTransactions[this.state.numRedoTransactions]);
  }

  undoEditItem = () => {
    //console.log("undoEditItem");
    var newitem = this.state.transactions[this.state.mostRecentTransaction].item[1];
    let cpy = this.state.currentList;
    cpy.items[newitem.key] = newitem;
    this.setState({currentList: cpy});
    this.state.redoTransactions.push(this.state.transactions[this.state.mostRecentTransaction]);
  }

  redoEditItem = () => {
   // console.log("redoEditItem");
    var newitem = this.state.redoTransactions[this.state.numRedoTransactions].item[0];
    let cpy = this.state.currentList;
    cpy.items[newitem.key] = newitem;
    this.setState({currentList: cpy});
    this.addTransaction(this.state.redoTransactions[this.state.numRedoTransactions]);
  }

  handleKeyDown(e) {
    this.checkForDuplicates();

    if (e.ctrlKey && e.which === 90) {//UNDO
       //console.log("control-z");
      if(this.hasTransactionToUndo()){
        this.setState({performingUndo: true});
        let transaction = this.state.transactions[this.state.mostRecentTransaction];

        //console.log("Popping transaction 259:(" + transaction.process +"): " + transaction.item.description);

        //console.log("trans process: " + transaction.process);
        if(transaction.process === "removeitem"){
          //console.log(this.state.transactions[0].item.key);
          this.undoRemoveItem(transaction.item);
          //console.log(this.state.transactions[0].item.key);
        }
        else if(transaction.process === "movedown")
          this.undoMoveDown();
        else if(transaction.process === "moveup")
          this.undoMoveUp();
        else if(transaction.process === "newitem")
          this.undoNewItem();
        else if(transaction.process === "edititem")
          this.undoEditItem();
        else if(transaction.process === "editname")
          this.undoEditName("name");
        else if(transaction.process === "editowner")
          this.undoEditName("owner");

        this.setState({mostRecentTransaction: this.state.mostRecentTransaction-1});
        this.setState({numRedoTransactions: this.state.numRedoTransactions + 1});
        //var trans = this.state.transactions.splice(0, 1);
        this.state.transactions.pop();

        //console.log("Popping transaction (" + transaction.process +"): " + transaction.item.description);

        this.setState({performingUndo: false});

      }
    } else if (e.ctrlKey & e.which === 89) {//REDO
     // console.log("control-y");

      if(this.hasTransactionToRedo()){
        let transaction = this.state.redoTransactions[this.state.numRedoTransactions];
        //console.log("transaction test: " + transaction.item.description);
        if(transaction.process === "removeitem")
          this.redoRemoveItem();
        else if(transaction.process === "moveup")
          this.redoMoveUp();
        else if(transaction.process === "movedown")
          this.redoMoveDown();
        else if(transaction.process === "newitem")
          this.redoNewItem();
        else if(transaction.process === "edititem")
          this.redoEditItem();
        else if(transaction.process === "editname")
          this.redoEditName("name");
        else if(transaction.process === "editowner")
          this.redoEditName("owner");

        this.state.redoTransactions.pop();
        this.setState({numRedoTransactions: this.state.numRedoTransactions - 1});
      }      

    }
    
    //console.log(this.toString());
  }

  checkForDuplicates = () =>{
    console.log("check for dup");
    if(this.state.mostRecentTransaction >= 0)
    {
      var len = this.state.currentList.items.length;
      var key = this.state.mostRecentTransaction;
      if(len > key){
        if(!this.state.transactions[key].item.description === this.state.currentList.items[key]){
          console.log("There is not a match. Error");
        }
      }
    }
    //error on movedown(0), undo, remove(0), try to redo(error)
    if(this.state.numRedoTransactions >= 0){
      var len = this.state.currentList.items.length;
      var key = this.state.numRedoTransactions;
      if(len > key){
        console.log("in here");
        if(this.state.redoTransactions[this.state.numRedoTransactions].item.description !== this.state.currentList.items[key].description)
        {
          console.log("Error: index[" + this.state.numRedoTransactions + "] no longer exists."
           + " Removing transaction");
          this.setState({numRedoTransactions: this.state.numRedoTransactions - 1});
          this.state.redoTransactions.pop();
        }
        else
          console.log("asda");
      }

    }
    
    //LOOP THROUGH BOTH TRANSACTIONS AND REDOTRANSACTIONS TO INSURE THAT NO 
    //TWO ITEMS HAVE THE SAME PROCESS & ITEM. 
    //IF THEY THERE IS A MATCH REMOVE THE LOWER INDEX (LATEST OCCURING)

    //POSSIBLE OTHER SOLUTION
    //JUST CHECK TO SEE IF ITEM EXISTS IN LIST, IF IT DOES EXECUTE 
    //IF ITEM DOES NOT EXIST JUST POP THE ITEM FROM ARRAY AND DECREMENT LEN
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
  }

  setListOwner = (todoListToChange, val) => {
      var oldName = todoListToChange.owner;
      todoListToChange.owner = val.target.value;
      const myTrans = {
        process: "editowner",
        item: [val.target.value, oldName]
      }
      this.addTransaction(myTrans);
  }

  redoEditName = (str) => {
    //console.log("redoEditName");
    var newName = this.state.redoTransactions[this.state.numRedoTransactions].item[0];
    let cpy = this.state.currentList;
    if(str === "name")
      cpy.name = newName;
    else
      cpy.owner = newName;
    this.setState({currentList: this.state.currentList});
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.addTransaction(this.state.redoTransactions[this.state.numRedoTransactions]);
  }

  undoEditName = (str) => {
   // console.log("undoEditName");
    var newName = this.state.transactions[this.state.mostRecentTransaction].item[1];
    let cpy = this.state.currentList;
    if(str === "name")
      cpy.name = newName;
    else
      cpy.owner = newName;    
    
    this.setState({currentList: this.state.currentList});

    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentScreen: AppScreen.LIST_SCREEN});

    this.state.redoTransactions.push(this.state.transactions[this.state.mostRecentTransaction]);

  }

  setListName = (todoListToChange, val) => {
     // console.log(val.target.value);
    //  console.log(todoListToChange.name);
      var oldName = todoListToChange.name;
      todoListToChange.name = val.target.value;
      const myTrans = {
        process: "editname",
        item: [val.target.value, oldName]
      }
      this.addTransaction(myTrans);
  }

  moveUp = (listItem2) => {
    //console.log("moveup method app.js");
    var listItem = listItem2;
    var x = 0;
    if(!listItem2.process){
      //console.log("process is null");
    }
    else{
      //console.log("process is NOT null");
      listItem = listItem2.item;
      x = 1;
    }
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
    if( listItem.key === 0){
      //console.log("first item");
      x = 1;
    }
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


    if(x === 0){
      const myItem = {
        description: cpy[found].items[listItem.key-1].description,
        assigned_to: cpy[found].items[listItem.key-1].assigned_to,
        due_date: cpy[found].items[listItem.key-1].due_date,
        completed: cpy[found].items[listItem.key-1].completed,
        key: cpy[found].items[listItem.key-1].key
      }

      const myTrans = {
        process: "moveup",
        item: myItem
      }
      //console.log("Adding (moveup) Transaction: " + myTrans.item.description);
      this.addTransaction(myTrans);
    }
  }

  moveDown = (listItem2) => {
    var listItem = listItem2;
    var x = 0;
    if(!listItem2.process){
      //console.log("process is null");
    }
    else{
      //console.log("process is NOT null");
      listItem = listItem2.item;
      x = 1;
    }
    //console.log("moveDown app.js");
   // console.log(listItem.description);
   // console.log(...this.state.todoLists);
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
    //console.log(item.description);
    if( (cpy[found].items.length-1) === listItem.key){
     // console.log("last item");
     x = 1;
    }
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
    if(x === 0){
      const myItem = {
        description: desc,
        assigned_to: assign,
        due_date: due,
        completed: compl,
        key: cpy[found].items[listItem.key+1].key
      }

      const myTrans = {
        process: "movedown",
        item: myItem
      }
      //console.log("Adding (movedown) Transaction: " + myTrans.item.description);
      this.addTransaction(myTrans);
    }
  }

  removeItem = (listItem2) => {
    var listItem = listItem2;
    var x = 0;
    if(!listItem2.process){
      //console.log("not n");
    }
    else{
      x = 1;
      listItem = listItem2.item
    }
    let cpy = [...this.state.todoLists];
    var indx = 0;
    var found = this.state.currentList.key;
    cpy[found].items.splice(listItem.key, 1);

    for(indx = 0; indx < cpy[found].items.length; indx++)
    {
      cpy[found].items[indx].key = indx;
      this.setState({});
    }
    this.setState({});
    const myTrans = {
      process: "removeitem",
      item: listItem
    }
    if(x === 0){
      //console.log("Adding (removeitem) Transaction: " + listItem.description);
      this.addTransaction(myTrans);
    }
  }

  editItem = (itemToEdit) => {
    //console.log("edititem app.js : " + itemToEdit.description);
    newTodo.description = itemToEdit.description;
    newTodo.assigned_to = itemToEdit.assigned_to;
    newTodo.due_date = itemToEdit.due_date;
    newTodo.completed = itemToEdit.completed;
    newTodo.key = itemToEdit.key;
    //console.log("key app.js: " + newTodo.key); 
    this.addItem();
  }

  resetItem(){
    newTodo.key = -1;
    newTodo.description = "";
    newTodo.due_date = "";
    newTodo.assigned_to = "";
    newTodo.completed = "";
  }

  addItem = () => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }

  cancelItemChange = () =>{
    //console.log("cancelitemchange app.js");
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    //console.log("todolists: " + this.props.todoLists);
    this.resetItem();  
  }

  submitItemChange = (item) =>{
    //console.log("submititemchange app.js");

    const myTrans = {
      process: "itemchange",
      item: null
    }
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

      myTrans.process = "newitem";
      myTrans.item = newTodo;
      this.state.currentList.items.push(newTodo);
    }else{
      //MODIFYING AN EXISTING ITEM
      //console.log("current todoList " + this.state.currentList.items;
      let newItem = this.state.currentList.items[item.key];
      const oldItem = {
        description: newItem.description,
        assigned_to:  newItem.assigned_to,
        due_date: newItem.due_date,
        completed:  newItem.completed,
        key: newItem.key
      }
      newItem.description = item.descrip;
      newItem.assigned_to = item.assign;
      newItem.due_date = item.dued;
      newItem.completed = item.compl;
      myTrans.process = "edititem";
      myTrans.item = [newItem, oldItem];
    }
    
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.resetItem();
    this.addTransaction(myTrans);
  }

  createNewList= () =>{
    //console.log("create new list app.js");
    let todos = this.state.todoLists;
    //console.log(todos.length);
    const newTodo = {
      key: todos.length,
      items: [],
      name: "Unknown",
      owner: "Unknown",
    }
    todos.push(newTodo);
    this.setState({todoLists: todos});
    this.loadList(newTodo);
  }

  confirmDeleteList = () => {
    //console.log("confirm deletelist appjs");
   //console.log(this.state.currentList);

      this.state.todoLists.splice(this.state.currentList.key, 1);
      //console.log("removing item");
      let cpy = [...this.state.todoLists];
      var indx = 0;
      for(; indx < this.state.todoLists.length; indx++)
      {
        cpy[indx].key = indx;
      }
      this.goHome();
  }

  sortByDueDate = () =>{
    let cpy = [...this.state.todoLists];
    let items = cpy[this.state.currentList.key].items;
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
    let cpy = [...this.state.todoLists];
    let items = cpy[this.state.currentList.key].items;
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
  }

  sortByStatus = () =>{
    console.log("sortByStatus appjs");
    let cpy = [...this.state.todoLists];
    let items = cpy[this.state.currentList.key].items;
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
          itemToEdit={newTodo}
          resetItemToEdit={this.resetItem}
          />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
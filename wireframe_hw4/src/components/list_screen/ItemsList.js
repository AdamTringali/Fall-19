import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { Button } from 'react-materialize'


class ItemsList extends React.Component {

    state = {
        taskSort: 1,
        dueDateSort: 1,
        completedSort: 1,
        keySet: false,
        newItem: false
    }

    sortByCompleted = () => {
        const fireStore = getFirestore();
        var todoListref = fireStore.collection('todoLists').doc(this.props.todoList.id);
        let items = this.props.todoList.items
       
        if(this.state.completedSort === 1)
            items.sort(function(a, b){
                var x = a.completed;
                var y = b.completed;
                if (x < y) {return 1;}
                if (x > y) {return -1;}
                return 0;
            });
        else
            items.sort(function(b, a){
                var x = a.completed;
                var y = b.completed;
                if (x < y) {return 1;}
                if (x > y) {return -1;}
                return 0;
            });
        
        this.setState({completedSort: this.state.completedSort*(-1)});
       /* var x = 0;
        for(; x < items.length; x++){
            items[x].key = x;
        }*/

        this.reKey();

        todoListref.update({
            items: items
        });

        
    }

    reKey = () => {
        const fireStore = getFirestore();
        var todoListref = fireStore.collection('todoLists').doc(this.props.todoList.id);
        let items = this.props.todoList.items;
        var x = 0;
        for(; x < items.length; x++){
            items[x].key = x;
        }
       

        todoListref.update({
            items: items
        });

    }
    sortByDate = () => {

        const fireStore = getFirestore();
        var todoListref = fireStore.collection('todoLists').doc(this.props.todoList.id);
        let items = this.props.todoList.items
       
        if(this.state.dueDateSort === 1)
            items.sort(function(a, b){
                var x = a.due_date;
                var y = b.due_date;
                if (x < y) {return 1;}
                if (x > y) {return -1;}
                return 0;
            });
        else
            items.sort(function(b, a){
                var x = a.due_date;
                var y = b.due_date;
                if (x < y) {return 1;}
                if (x > y) {return -1;}
                return 0;
            });
        
        this.setState({dueDateSort: this.state.dueDateSort*(-1)});

        this.reKey();

        todoListref.update({
            items: items
        });
    }
    sortByTask = () => {
        const fireStore = getFirestore();
        var todoListref = fireStore.collection('todoLists').doc(this.props.todoList.id);
        let items = this.props.todoList.items
       
        if(this.state.taskSort === 1)
            items.sort(function(a, b){
                var x = a.description;
                var y = b.description;
                if (x < y) {return 1;}
                if (x > y) {return -1;}
                return 0;
            });
        else
            items.sort(function(b, a){
                var x = a.description;
                var y = b.description;
                if (x < y) {return 1;}
                if (x > y) {return -1;}
                return 0;
            });
        
        this.setState({taskSort: this.state.taskSort*(-1)});

        this.reKey();

        todoListref.update({
            items: items
        });

    }

    addNewItem = () =>{
         this.setState({newItem: true});        
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const fireStore = getFirestore();
        let x = 1;
        fireStore.collection('todoLists').doc(todoList.id).update({key: 0});
        fireStore.collection('todoLists').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                let listName = doc.data().name;
                if(listName !== todoList.name)
                {
                    fireStore.collection('todoLists').doc(doc.id).update({key: x});
                    x += 1;
                }
        })
        });

        if(this.state.newItem)
        {
            let str = "";
            if(!items){
                console.log("null items");
                str = '/todoLists/' + todoList.id + '/' + 0;

            }
            else
                str = '/todoLists/' + todoList.id + '/' + items.length;
            return <Redirect to={str} />
        }

        return (
            
            <div className="todo-lists section">
                <div className="row green darken-1">
                    <div className="col s4 push-s1"><span className="flow-text" onClick={this.sortByTask}><h4><b>Task</b></h4></span></div>
                    <div className="col s4 push-s1"><span className="flow-text" onClick={this.sortByDate}><h4><b>Due Date</b></h4></span></div>
                    <div className="col s4 push-s1"><span className="flow-text" onClick={this.sortByCompleted}><h4><b>Completed</b></h4></span></div>
                </div>

            
                {items && items.map(function(item) {
/*                     REMOVED :: item.id = item.key;*/     
            //item.key = item.key;
            let disableDown = false;
            let disableUp = false;
            if(item.key+1 === items.length)
                    disableDown = true;

            if(item.key === 0)
                    disableUp = true;

            function moveUp (){
                if(item.key === 0)
                    return;

                const itemTwo = {
                    description: item.description,
                    due_date: item.due_date,
                    assigned_to: item.assigned_to,
                    completed: item.completed
                }
                const oldItem = {
                    description: items[item.key-1].description,
                    due_date: items[item.key-1].due_date,
                    completed: items[item.key-1].completed,
                    assigned_to: items[item.key-1].assigned_to
                }

                item.description = oldItem.description;
                item.due_date = oldItem.due_date;
                item.assigned_to = oldItem.assigned_to;
                item.completed = oldItem.completed;

                items[item.key-1].description = itemTwo.description;
                items[item.key-1].due_date = itemTwo.due_date;
                items[item.key-1].assigned_to = itemTwo.assigned_to;
                items[item.key-1].completed = itemTwo.completed;
                
                const fireStore = getFirestore();
                var todoListref = fireStore.collection('todoLists').doc(todoList.id);
                let items2 = todoList.items;
                var x = 0;
                for(; x < items2.length; x++){
                    items2[x].key = x;
                }
        
                todoListref.update({
                    items: items2
                });
            }         
            function moveDown (){
                if(items.length === (item.key+1))
                    return;
            
                const itemTwo = {
                    description: item.description,
                    due_date: item.due_date,
                    assigned_to: item.assigned_to,
                    completed: item.completed
                }
                const oldItem = {
                    description: items[item.key+1].description,
                    due_date: items[item.key+1].due_date,
                    completed: items[item.key+1].completed,
                    assigned_to: items[item.key+1].assigned_to
                }

                item.description = oldItem.description;
                item.due_date = oldItem.due_date;
                item.assigned_to = oldItem.assigned_to;
                item.completed = oldItem.completed;

                items[item.key+1].description = itemTwo.description;
                items[item.key+1].due_date = itemTwo.due_date;
                items[item.key+1].assigned_to = itemTwo.assigned_to;
                items[item.key+1].completed = itemTwo.completed;
                
                const fireStore = getFirestore();
                var todoListref = fireStore.collection('todoLists').doc(todoList.id);
                let items2 = todoList.items;
                var x = 0;
                for(; x < items2.length; x++){
                    items2[x].key = x;
                }
               
        
                todoListref.update({
                    items: items2
                });
            }
            function deleteItem (){
                
                const fireStore = getFirestore();
                var todoListref = fireStore.collection('todoLists').doc(todoList.id);
                let items2 = todoList.items;
                if(item.key > 0)
                    items2.splice(item.key,item.key);
                else
                    items2.shift();

                var x = 0;

                for(; x < items2.length; x++){
                    items2[x].key = x;
                }
               
        
                todoListref.update({
                    items: items2
                });
            }
             return (
                 <div key={item.key}>
                        <Link to={'/todoLists/' + todoList.id + '/' + item.key} key={item.key} item={item}>
                            <ItemCard todoList={todoList} item={item} key={item.key} />
                        </Link>
                        <div className="row">
                            <div className="fixed-action-btn col s11.5">
                                <Button 
                                    floating
                                    fab={{direction: 'left'}}
                                    large >

                                    <Button floating icon={<i className="medium material-icons ">close</i>} className="red" onClick={deleteItem}/>
                                    <Button disabled={disableUp} floating icon={<i className="medium material-icons">arrow_upward</i>} className="yellow darken-1" onClick={moveUp}  />
                                    <Button disabled={disableDown} floating icon={<i className="medium material-icons">arrow_downward</i>} className="blue" onClick={moveDown} />
                                </Button> 
                            </div>
                        </div>
              
                </div>
                    );})
                }
                

                <div className="row">
                        <i className="medium material-icons col s6 offset-s5" onClick={this.addNewItem} >add_box</i>
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);
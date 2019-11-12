import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { firestore } from 'firebase';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'



class ItemsList extends React.Component {

    state = {
        keySet: false,
        newItem: false
    }

    sortByCompleted = () => {
        console.log("sortByCompleted, itemlist.js")
    }
    sortByDate = () => {
        console.log("sortByDate, itemlist.js")
    }
    sortByTask = () => {
        console.log("sortByTask, itemlist.js")
    }

    addNewItem = () =>{
        console.log("adding new item");
        let list = this.props.todoList;
        console.log("listid:" + list.id);
        console.log("list2: " + list.items.length)
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
            let str = '/todoLists/' + todoList.id + '/' + items.length;
            return <Redirect to={str} />
        }

        return (
            
            <div className="todo-lists section">
                <div className="row green darken-1">
                    <div className="col s4 push-s1"><span className="flow-text" onClick={this.sortByTask}>Task</span></div>
                    <div className="col s4 push-s1"><span className="flow-text" onClick={this.sortByDate}>Due Date</span></div>
                    <div className="col s4 push-s1"><span className="flow-text" onClick={this.sortByCompleted}>Completed</span></div>
                </div>

                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={'/todoLists/' + todoList.id + '/' + item.key} key={item.key} item={item}>
                            <ItemCard todoList={todoList} item={item} key={item.key} />
                        </Link>
                        
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
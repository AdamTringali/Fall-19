import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect, firebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';


class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        key: ''
    }

    handleChange = (e) => {
        //const oldname = this.state.name;
        //const oldowner = this.state.owner;

        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
            
        }));

        const fireStore = getFirestore();
        const str = [target.id][0];

        if(str === "owner")
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({owner: target.value});
        else
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({name: target.value});
       
        
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container white">
                <div className="row" >
                    <div className="row">
                        <h3 className="grey-text text-darken-3 col s11 ">Todo List</h3>
                        <i className="medium material-icons  col s1" onClick={this.addNewItem} >delete_forever</i>
                    </div>
                    <div className="input-field col s6">
                        <label className="active" htmlFor="email">Name</label>
                        <input  type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                    </div>
                    <div className="input-field col s6">
                        <label className="active" htmlFor="password">Owner</label>
                        <input type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
                    </div>
                </div>
                <ItemsList todoList={todoList} />

             
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

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
)(ListScreen);
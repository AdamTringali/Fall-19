import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal } from 'react-materialize';




class ListScreen extends Component {

    
    state = {
        name: '',
        owner: '',
        key: '',
        open: false,
        removed: false,
        clicked: false
    }

    handleChange = (e) => {

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
    

   


    async doThis() {
        console.log("todoListid: " + this.props.todoList.id);
        const constid =  this.props.todoList.id;
        var newkey = 0;

        const fireStore = getFirestore();
        await fireStore.collection('todoLists').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {

                if(constid === doc.id){
                    //console.log("key to -1 " + constid);
                    fireStore.collection('todoLists').doc(doc.id).update({key: -1});
                }
                else{
                    fireStore.collection('todoLists').doc(doc.id).update({key: newkey++});
                    
                }

            })
        });
       
    }

    deleteList = () =>{
        console.log("delete list");
        this.setState({open: false});
        this.setState({removed: true});
       
        this.doThis();

    }
    keepList = () =>{
        console.log("keep list");
        this.setState({open: false});
    }

    render() {
        console.log("list screen");

        const auth = this.props.auth;
        const todoList = this.props.todoList;

    
        if(!todoList)
            return <React.Fragment />

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(this.state.removed)
            return <Redirect to="/" />;

        return (
            <div className="container white">
                <div className="row" >
                    <div className="row">
                        <h3 className="grey-text text-darken-3 col s11 ">Todo List</h3>
                        <Modal header="Delete List" open={this.state.open} trigger={
                            <i className="medium material-icons  col s1" >
                                   delete_forever   </i>} >

                                   <h5> <p>Are you sure you want to delete this list?
                                <br />
                                <br />
                                    The list will not be retreivable.
                                <br />
                            </p>
                            </h5>

                            <div className="row">

                                <a className="waves-effect waves-light btn col s2" onClick={this.deleteList}>Yes</a>
                                <p className="col s1"></p>
                                <a className="waves-effect waves-light btn col s2" onClick={this.keepList}>No</a>

                            </div>
                        </Modal>
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

  //
  if(todoList)
    todoList.id = id;

//
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
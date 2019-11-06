import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    state = {
        newList: false,
        lid: "0",
    }

    async goToNewList(props){
        const fireStore = getFirestore();
        let result = await fireStore.collection('todoLists').add({
                name: "Unknown", owner: "Unknown",
                // items: 
            });
        props.history.push('todoList/'+result.id);
    }
    
    handleNewList = () =>{
        console.log("handleNewList homescreen.js");
        this.goToNewList(this.props);

    }


    render() { 
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
    

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);
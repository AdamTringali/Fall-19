import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';


class HomeScreen extends Component {

    state = {
        firstName: "",
        lastName: "",
    }
    
    

    async goToNewList(props){
        const fireStore = getFirestore();
        let result = await fireStore.collection('todoLists').add({
                name: "Unknown", owner: "Unknown", items: []
            });
        props.history.push('todoList/'+result.id);
    }

    
    
    handleNewList = () =>{
        console.log("handleNewList homescreen.js");
        this.goToNewList(this.props);

    }


    render() {
        var user_index = -1;
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        if(!this.props.wireframeList)
            return <React.Fragment />

       
        if(this.props.user.firstName !== "" && this.props.user.firstName)
        {
            console.log("user loaded: " + this.props.user.firstName);
            for(var i = this.props.wireframeList.length-1; i >= 0; i--){
                if(this.props.wireframeList[i].firstName === this.props.user.firstName){
                    user_index = i;
                }
            }
        }
        var wireframes;
        if(user_index !== -1){
            wireframes = this.props.wireframeList[user_index].wireframes;
        }
        else{
            //console.log("NO WIREFRAMES FOUND FOR USER : " + this.props.user.firstName);
        }
        //console.log("abc");
        //console.log(wireframes);


        return (
            <div className="dashboard container">
                <div className="row">
  
                    <div className="col s12 m4" >
                        <br></br>
                        <h5 className="center-align">Recent Work</h5>
                        <TodoListLinks wireframes={wireframes}/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {


    const userV = {
        firstName: "",
        lastName: ""
    }
    userV.firstName = state.firebase.profile.firstName;
    userV.lastName = state.firebase.profile.lastName;
    //const userList = state.firebase.ordered.users;

    return {
        user: userV,
        userList: state.firestore.ordered.users,
        wireframeList: state.firestore.ordered.user_wireframes,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users' },{collection: 'user_wireframes'}
    ]),
)(HomeScreen);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
import { relativeTimeRounding } from 'moment';

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
       
        if(this.props.user.firstName !== "" && this.props.user.firstName)
        {
            console.log("user loaded: " + this.props.user.firstName);
            for(var i = this.props.wireframeList.length-1; i >= 0; i--){
                if(this.props.wireframeList[i].firstName === this.props.user.firstName){
                    user_index = i;
                }
            }
        }
        var abc;
        if(user_index !== -1){
            console.log("userindex");
            console.log(this.props.wireframeList[user_index])
            abc = this.props.wireframeList[user_index].wireframes;
        }
        else{
            console.log("NO WIREFRAMES FOUND FOR USER : " + this.props.user.firstName);
        }

        console.log(abc);

       // const wireframes = this.props.user
       /* if(this.props.user.firstName != -1){
            //USER EXISTS, FIND LISTS THAT BELONG TO SPECIFIC USER
            console.log(this.props.user);


       }*/
        
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4" >
                        
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
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
   /* const userVar = {
        firstName: "",
        lastName: "",
        user_id: -1,
        wireframes: [],
          
    }

    async function abc1(){
       
        const id = state.firebase.auth.uid;
        
        const fireStore = getFirestore();
                fireStore.collection('users').doc(id).get().then(function(value){
                    userVar.firstName = value.data().firstName;
                    userVar.lastName = value.data().lastName;
                    //callbackUserInfo();
                });
    
                fireStore.collection('wireframes').get().then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        let wireframeVar = doc.data();
                        if(userVar.firstName === wireframeVar.firstName){
                            userVar.user_id = wireframeVar.user_id;
                            userVar.wireframes = wireframeVar.wireframes;
                            //console.log("user firstName: " + userVar.firstName + " matches " + wireframeVar.firstName);
                            //callbackWireframeInfo();
                        }
    
                    })
    
                })
            return userVar;    
    }
  
    async function abc(){
        await abc1();
    }

    abc();*/

    const userV = {
        firstName: "",
        lastName: ""
    }
    userV.firstName = state.firebase.profile.firstName;
    userV.lastName = state.firebase.profile.lastName;
    //const userList = state.firebase.ordered.users;

    /*if(userV.firstName !== "" && userV.firstName)
    {
        console.log("user loaded MSTP: " + userV.firstName);
        console.log(userList);
    }*/

    return {
        user: userV,
        userList: state.firestore.ordered.users,
        wireframeList: state.firestore.ordered.wireframes,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users' },{collection: 'wireframes'}
    ]),
)(HomeScreen);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
import { firestore } from 'firebase';


class HomeScreen extends Component {

    state = {
        firstName: "",
        lastName: "",
    }

    async goToNewList (props) {
        const fireStore = getFirestore();
        const user = props.user;

        let result = await fireStore.collection('user_wireframes').get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            let data = doc.data();
            if(data.firstName === user.firstName && data.lastName === user.lastName)
            {
                console.log(data);
                let cpy = data.wireframes;
                let item = {
                    title: "Unknown",
                    key: cpy.length,
                    items: []                
                }
                cpy.push(item)
                fireStore.collection('user_wireframes').doc(doc.id).update({wireframes: cpy});
            }

            
        })
    })
    

    //props.history.push('wireframe/'+3);

}
    
    handleNewList = () =>{
        console.log("handleNewList homescreen.js");
        //console.log("current user " + user.firstName + " " + user.lastName)

        setTimeout(this.goToNewList(this.props),100)
        

       
     
        this.props.history.push("wireframe"+'/'+3);

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
            //console.log("user loaded: " + this.props.user.firstName);
            for(var i = this.props.wireframeList.length-1; i >= 0; i--){
                if(this.props.wireframeList[i].firstName === this.props.user.firstName){
                    user_index = i;
                }
            }
        }
        var wireframes;
        if(user_index !== -1){
            wireframes = this.props.wireframeList[user_index].wireframes;
            user_index = this.props.wireframeList[user_index].user_id;
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
                        <TodoListLinks wireframes={wireframes} user_index={user_index} wireframeList={this.props.wireframeList}/>
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
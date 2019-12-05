import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    
    

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

        console.log("home screen");
        
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        const fireStore = getFirestore();
        const oldItem = {
            owner: "",
            name: "",
            items: [],
            key: ""
        }

        const oldItemtwo = {
            owner: "",
            name: "",
            items: [],
            key: ""
        }

        let onlyOne = 0;
        let docid = 0;
        let docidtwo = 0;

        
        setTimeout(function()
        {
            fireStore.collection('todoLists').get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                    let listKey = doc.data().key;
    
                    if(listKey === -1){
                        fireStore.collection('todoLists').doc(doc.id).delete();
                    }
                    else {
                        
                        if(onlyOne === 0){
                            onlyOne = 1;
                            docid = doc.id;
                            oldItem.items = doc.data().items;
                            oldItem.owner = doc.data().owner;
                            oldItem.name = doc.data().name;
                        }
                        if( listKey === 0){               
                            docidtwo = doc.id;
                            oldItemtwo.owner = doc.data().owner;
                            oldItemtwo.name = doc.data().name;
                            oldItemtwo.items = doc.data().items;
                        }  
                    }       
                })
        
                
                fireStore.collection('todoLists').doc(docid).update({owner: oldItemtwo.owner});
                fireStore.collection('todoLists').doc(docid).update({name: oldItemtwo.name});
                if(!oldItemtwo.items)
                    fireStore.collection('todoLists').doc(docid).update({items: []});
                else
                    fireStore.collection('todoLists').doc(docid).update({items: oldItemtwo.items});
            
            
    
                fireStore.collection('todoLists').doc(docidtwo).update({owner: oldItem.owner});
                fireStore.collection('todoLists').doc(docidtwo).update({name: oldItem.name});
                if(!oldItem.items)
                    fireStore.collection('todoLists').doc(docidtwo).update({items: []});
                else
                    fireStore.collection('todoLists').doc(docidtwo).update({items: oldItem.items});
            
    
    
            }); 
        }, 100);
           
          
        
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
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
        //console.log("list screen");
        //console.log(this.props);

        const auth = this.props.auth;
        const wireframe = this.props.wireframe;

    
        if(!wireframe)
            return <React.Fragment />

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <div className="row" >
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" type="text" className="validate center-align" onChange={this.onChange} defaultValue={wireframe.title}/>
                            <label className="active" htmlFor="title">Title</label>


                        </div>
                    </div>
                    <ItemsList wireframe={wireframe} />

                </div>
               

            </div>
        );
    }
} 

const mapStateToProps = (state, ownProps) => {

    if(!state.wireframe[0])
        return <React.Fragment />



  const { key } = ownProps.match.params;
  const wireframes = state.wireframe[0].wireframes;
  const wireframe = wireframes[key];
  const items = wireframe.items;
  /*console.log("wireframes: ");
  console.log(wireframes)
  console.log("key: ")
  console.log(key);
  console.log("wireframe");
  console.log(wireframe);
  console.log("items");
  console.log(items);*/



 /* if(wireframe)
    wireframe.id = id;*/

  return {
    wireframes,
    key,
    wireframe,
    auth: state.firebase.auth,
  };
};

export default compose(
    
  connect(mapStateToProps),
  
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(ListScreen);
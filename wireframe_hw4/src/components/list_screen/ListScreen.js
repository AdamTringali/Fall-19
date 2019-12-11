import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal } from 'react-materialize';
import {Rnd} from 'react-rnd';




class ListScreen extends Component {

    
    state = {
        title: '',
        key: '',
        open: false,
        removed: false,
        clicked: false
    }


    changeTitle = (e) => {

        const { target } = e;
        

        let newFrames = this.props.wireframes;

        newFrames[this.props.wireframe.key].title = target.value;

        const fireStore = getFirestore();
        fireStore.collection('user_wireframes').doc(this.props.id).update({wireframes: newFrames});

        

      
    }


    render() {
       

        const auth = this.props.auth;
        const wireframe = this.props.wireframe;

    
        if(!wireframe)
            return <React.Fragment />

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white" style={{width: "100%"}}>
                <div className="row" >
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" type="text" className="validate center-align" onChange={this.changeTitle} defaultValue={wireframe.title}/>
                            <label className="active" htmlFor="title">Title</label>


                        </div>
                    </div>
                    <ItemsList wireframe={wireframe} id={this.props.id}/>

                </div>
               

            </div>
        );
    }
} 

const mapStateToProps = (state, ownProps) => {

    if(!state.wireframe[0])
        return <React.Fragment />



    const { id } = ownProps.match.params;
  const { key } = ownProps.match.params;
  const wireframes = state.wireframe[0].wireframes;
  const wireframe = wireframes[key];
  //const items = wireframe.items;

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
      id,
    wireframeList: state.firestore.ordered.user_wireframes,
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
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { Button } from 'react-materialize'
import { Draggable, Droppable } from 'react-drag-and-drop'
import ResizableRect from 'react-resizable-rotatable-draggable'


class ItemsList extends React.Component {

    state = {
        goHome: false,
        zoomable: '',
        test: [
            { id: 1, type: 'button'}
        ],
        items: [
            { id: 1, name: 'Container', type: '_container' },
            { id: 2, name: 'Label', type: '_label' },
            { id: 3, name: 'Button', type: '_button' },
            { id: 4, name: 'Textfield' , type:'_textfield' }
        ],
        style: {
            border: "",
            position: "inherit",
        }
    }

    submitChange = () => {
        let newFrames = this.props.wireframes;
        let myTitle = this.props.wireframe.title;
        let key = this.props.wireframe.key;
        
        const fireStore = getFirestore();
        fireStore.collection('user_wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                if(doc.data().wireframes.length > key){
                    if(doc.data().wireframes[key].title === myTitle)
                    {
                        fireStore.collection('user_wireframes').doc(doc.id).update({wireframes: newFrames});
                    }
                }
            })
        })
    }

    cancelChange = () => {
        console.log("cancel");
        this.setState({goHome: true});

    }

    onDrop = (e) => {
        if(e._container)
            console.log("container drop")
        if(e._label)
            console.log("label drop");
        if(e._textfield)
            console.log("textfield drop");
        if(e._button)
            console.log("button drop");

    }

    selectControl = () => {
        console.log("selecting control");
        this.setState({zoomable: 'nw, ne, sw, se'})
    }

    handleDrag = (deltaX, deltaY) => {
        console.log("handledrag")
        this.setState({
          left: this.state.left + deltaX,
          top: this.state.top + deltaY
        })
      }

    render() {
        const wireframe = this.props.wireframe;

        if(this.state.goHome)
            return <Redirect to="/" />;

        return (
            
            <div className="todo-lists section">

                <div className="row">

                {/* LEFT COLUMN */}
                <div className="groove_border col s3" > <p className="right-align"></p> 
                
                    <div className="row">
                        <i className="material-icons col s3">zoom_in</i>
                        <i className="material-icons col s3">zoom_out</i>
                    </div>

                    <div className="item-container ">

                        {this.state.items.map((item, index) => 
                            <div className="center-align" key={item.id}>
                                <Draggable className="groove_border " key={item.id} type={item.type}><br/><br/></Draggable>
                                {item.name}
                            </div>

                        )}
                        
 
                    </div>
                    <br/>
                    <br/>
                    <div className="row">
                        <button className="btn col s12" type="submit" name="action" onClick={this.submitChange}>Submit
                            <i className="material-icons right">send</i>
                        </button>
                        <br/>
                        <br/>
                        <button className="btn col s12" type="submit" name="action" onClick={this.cancelChange}>Close
                            <i className="material-icons right">close</i>
                        </button>
                       
                    </div>


                </div>

                {/* CENTER COLUMN */}
                <div className="target groove_border col s6 "> <p>target</p> 
                                <Droppable className="wireframe-target groove_border"
                                    types={['_container','_label','_button','_textfield']}// <= allowed drop types
                                    onDrop={this.onDrop.bind(this)}>
                                        
                                    {wireframe.items.map((item, index) => 
                                        <ItemCard z-index={0} key={item.key} item={item} draggable="true" type="_button" onClick={this.onDrop} onDrop={this.onDrop} />
                                        
                                    )}
                                   
                                </Droppable>

                </div>

                {/* RIGHT COLUMN */}
                <div className="groove_border col s3 "> <p className="center-align">Properties</p> 
                <p className="center-align">Value: </p><input type="text" name="FirstName" defaultValue="def_value1"/>


                    <p className="center-align">Font Size: </p><input type="text" name="FirstName" defaultValue="def_value"/>





                </div>





                </div>

            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const wireframe = ownProps.wireframe;
    const key = wireframe.key
    const wireframes = state.wireframe[0].wireframes;

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
)(ItemsList);
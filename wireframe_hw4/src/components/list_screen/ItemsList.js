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


class ItemsList extends React.Component {

    state = {
        items: [
            { id: 1, name: 'Container', type: '_container' },
            { id: 2, name: 'Label', type: '_label' },
            { id: 3, name: 'Button', type: '_button' },
            { id: 4, name: 'Textfield' , type:'_textfield' }
            
        ]
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

        // => banana 
    }


    render() {
        const wireframe = this.props.wireframe;
        

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
                        <button className="btn col s12" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
                        <br/>
                        <br/>
                        <button className="btn col s12" type="submit" name="action">Cancel
                            <i className="material-icons right">close</i>
                        </button>
                       
                    </div>


                </div>

                {/* CENTER COLUMN */}
                <div className="target groove_border col s6 "> <p>target</p> 
                                <Droppable className="wireframe-target groove_border"
                                    types={['_container','_label','_button','_textfield']}// <= allowed drop types
                                    onDrop={this.onDrop.bind(this)}>
                                 

                                </Droppable>


                </div>

                {/* RIGHT COLUMN */}
                <div className="groove_border col s3 "> <p>S12 M4.3</p> 
                
                </div>





                </div>

            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const wireframe = ownProps.wireframe;

    return {
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
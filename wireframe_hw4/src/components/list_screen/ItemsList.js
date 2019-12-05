import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { Button } from 'react-materialize'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class ItemsList extends React.Component {

    state = {
        items: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
            
        ]
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

                    <div className="item-container">

                        {this.state.items.map((item, index) => 
                            <div className="groove_border" key={item.id}>{item.name}<br/><br/></div>)}

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
                <div className="groove_border col s6 "> <p>target</p> 


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

export default DragDropContext(HTML5Backend)(ItemsList); compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(ItemsList);
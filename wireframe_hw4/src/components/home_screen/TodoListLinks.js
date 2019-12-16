import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { Modal } from 'react-materialize';
import { getFirestore } from 'redux-firestore';



class TodoListLinks extends React.Component {
    state = {
        open: false,
    }

    setKeys = (info) => {
        let wireframeList = this.props.wireframeList;
        for(var i = 0; i < wireframeList.length; i++){
            if(wireframeList[i].id === this.props.docid)
                {               
                    let removed = wireframeList[i].wireframes.splice(info,1);
                    wireframeList[i].wireframes.unshift(removed[0]);
                    for(var j = 0; j < wireframeList[i].wireframes.length; j++)
                        wireframeList[i].wireframes[j].key = j;
                    
                    const fireStore = getFirestore();
                    fireStore.collection('user_wireframes').doc(this.props.docid).update({wireframes: wireframeList[i].wireframes})
                }
        }
    }


    deleteWireframe = (key) =>{
        let newFrames = this.props.wireframes;
        let res = newFrames.splice(key, 1);
        var newKey = 0;
        newFrames.forEach(function(doc){
            doc.key = newKey;
            newKey++;
        })
        let myTitle = res[0].title;

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

        this.setState({open: false});
       
       // this.doThis();

    }

    keepWireframe = () =>{
        this.setState({open: false});
    }

    render() {
       
        const wireframes = this.props.wireframes;

        if(this.props.wireframes){

            this.props.loadWireframes(this.props.wireframes);
        }



        return (
            <div className="todo-lists section">
                
                {wireframes && wireframes.map(wireframe => (
                    <div className="row" key={wireframe.key}>
                          <div className="col s2 delete_frame">
                          <Modal open={this.state.open} header="Delete List" trigger={
                             <i className="material-icons right" onClick={this.deleteWireframe.bind(this, wireframe.key)}>close</i>
                            } >

                                   <h5> <p>Are you sure you want to delete this list?
                                <br />
                                <br />
                                    The list will not be retreivable.
                                <br />
                            </p>
                            </h5>

                            <div className="row">

                                <a className="waves-effect waves-light btn col s2" onClick={this.deleteWireframe.bind(this, wireframe.key)}>Yes</a>
                                <p className="col s1"></p>
                                <a className="waves-effect waves-light btn col s2" onClick={this.keepWireframe}>No</a>

                            </div>
                        </Modal>
                        </div>
                        <div className="col s10">
                            <Link to={'/'+ this.props.docid + '/' + 0} key={wireframe.key} onClick={this.setKeys.bind(this, wireframe.key)}>
                                <TodoListCard wireframe={wireframe} />
                            </Link>
                        </div>
                      
                        
                    </div>
                ))}
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const user_id = ownProps.user_index;
    const wireframes  = ownProps.wireframes;
    const wireframeList = ownProps.wireframeList;

    for(var i = 0; i < wireframeList.length; i++){
        if(wireframeList[i].user_id === user_id)
            var docid = wireframeList[i].id;
    }

    return {
        docid,
        wireframes,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadWireframes: (wireframes) => {dispatch({type: "LOAD_WIREFRAMES", wireframes: wireframes} )},
   
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(TodoListLinks);
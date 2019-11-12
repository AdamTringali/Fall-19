import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { Checkbox } from 'react-materialize';


class EditScreen extends Component {

    

    state = {
        loaded: false,
        description: "",
        assigned_to: "",
        due_date: "",
        completed: false,
    }
   
    cancelChange = () =>
    {
        console.log('cancel change');

    }
    
    submitChange = () =>
    {
        console.log('submit change');
        
        //fireStore.collection('todoLists').doc(docid).update({owner: oldItemtwo.owner});
        const fireStore = getFirestore();
        let x = this.props.todoList.items.length;
        console.log("length: " + x);
        if(this.props.item){
            fireStore.collection('todoLists').doc(this.props.todoList.id)
            console.log("editing existing item");
        }
        else{
            console.log("creating new item");
        }
   

    
    }

   

    onChange = (e) => {
        if(e.target.id === "completed"){
            console.log("completed: " + e.target.checked)
            this.setState({ [e.target.id]: e.target.checked});
            
        }
        else
            this.setState({ [e.target.id]: e.target.value});
    }
    
    render() {

        let description = "";
        let assigned_to = "";
        let due_date = "";
        let completed = false;
        

        if(!this.props.item){
             description = "";
             assigned_to = "";
             due_date = "";
             completed = false;
        }
        else{
             description = this.props.item.description;
             assigned_to = this.props.item.assigned_to;
             due_date = this.props.item.due_date;
             completed = this.props.item.compelted;

        }
    

      
       // this.loadInfo();

       // console.log("I am in edit screen! : " + this.state.description);

        return (
            
            
            <div className="container">
                <h4>Edit Item</h4>
                <div className="row" >
                        

                    <div className="input-field col s12 ">
                            <input id="description" type="text" className="active" onChange={this.onChange} defaultValue={description}/>
                            <label htmlFor="description">Description</label>
                    </div>
                    <div className="input-field col s10">
                        <input id="assigned_to" type="text" className="validate" onChange={this.onChange} defaultValue={assigned_to}/>
                        <label htmlFor="assigned_to">Assigned To</label>
                    </div>
                    <div className="input-field col s10">
                        <input type="text" onChange={this.onChange} className="datepicker" defaultValue={due_date}/>
                        <label htmlFor="due_date">Due Date</label>
                    </div>
                    <div className="input-field col s10">
                
                        <Checkbox
                            id="completed"
                            label="Completed"
                            value="Red"
                            onChange={this.onChange}
                            defaultChecked={completed}
                            />
                    </div>
                
                </div>
                <br/>
                <br/>
                <div className="row">

                <Link to={'/todoList/' + this.props.match.params.id } key={this.props.match.params.key}>
                    <button className="col s2" onClick={this.submitChange}>Submit</button>
                    <p className="col s.5"></p>
                    <button className="col s2" onClick={this.cancelChange}>Cancel</button>
                </Link>
                 
                </div>




            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.match.params;
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;


   

    //console.log("todoList: " + todoList + ", items: " + todoList.items);
    //console.log("key: " +key + ", id: " + id ) ;

  


    return {
        todoList,
        item: todoList.items[key],
        auth: state.firebase.auth
    };
};
  
export default compose(
    
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
    
)(EditScreen);
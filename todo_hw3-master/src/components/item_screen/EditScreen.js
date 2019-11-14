import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { Checkbox } from 'react-materialize';
import DatePicker from 'react-materialize/lib/DatePicker';


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
       // console.log('submit change');
       // console.log("description: " + this.state.description + ", assigned to: " + this.state.assigned_to + 
       // ", due_date: " + this.state.due_date.toISOString().substring(0,this.state.due_date.toISOString().indexOf('T')) + ", completed: " + this.state.completed);
       
        const fireStore = getFirestore();
        var todoListref = fireStore.collection('todoLists').doc(this.props.id);

     


        if(this.props.item){
         let date;
            if(this.state.due_date === "")
                date = this.props.item.due_date;
            else
                date = this.state.due_date.toISOString().substring(0,this.state.due_date.toISOString().indexOf('T'));
            
            const newItem = {
                description: this.state.description,
                due_date: date,
                completed: this.state.completed,
                assigned_to: this.state.assigned_to,
                key: this.props.todoList.items.length
    
            }
            let testId = this.props.id + "/items/" + this.props.item.key + "/";
            console.log("testid: " + testId);
            console.log("updatinge existing item");

            let items = this.props.todoList.items;
            let item = items[this.props.item.key];

            if(newItem.description !== "")
                item.description = newItem.description;
            if(newItem.due_date !== "")
                item.due_date = newItem.due_date;
            if(newItem.assigned_to !== "")
                item.assigned_to = newItem.assigned_to;

            item.completed = newItem.completed; 

 

            todoListref.update({
                items: this.props.todoList.items
            });
 
    
    
           
        }
        else{
            const newItem = {
                description: this.state.description,
                due_date: this.state.due_date.toISOString().substring(0,this.state.due_date.toISOString().indexOf('T')),
                completed: this.state.completed,
                assigned_to: this.state.assigned_to,
                key: this.props.todoList.items.length
    
            }
            console.log("creating new item");
            let testId = this.props.id + "/items/" + this.props.todoList.items.length + "/";
            console.log("testid: " + testId);

            // Atomically add a new region to the "regions" array field.



            todoListref.update({
                items: fireStore.FieldValue.arrayUnion(newItem)
            });


        }
   

    
    }

   

    onChange = (e) => {
        if(e.target.id === "completed"){
            console.log("completed: " + e.target.checked)
            this.setState({ [e.target.id]: e.target.checked});
            
        }
        else if(e.target.id === "due_date")
        {
            console.log("due_date " + e.target.value)
        }
        else
            this.setState({ [e.target.id]: e.target.value});
    }

    dateChange = due_date => {this.setState({ due_date })

    console.log("state: " + this.state.due_date);
    }
    
    render() {

        let description = this.state.description;
        let assigned_to = this.state.assigned_to;
        let due_date = this.state.due_date;
        let completed = this.state.completed;
        

        if(!this.props.item){
             description = "";
             assigned_to = "";
             due_date = "";
             completed = false;
        }
        else{
            let newd = new Date(this.props.item.due_date);
            console.log("newd: " + newd);
             description = this.props.item.description;
             assigned_to = this.props.item.assigned_to;
             due_date = newd.toISOString().substring(0,newd.toISOString().indexOf('T'));
             completed = this.props.item.compelted;

        }
    

      
       // this.loadInfo();

       // console.log("I am in edit screen! : " + this.state.description);

        return (
            
            
            <div className="container">
                <h4>Edit Item</h4>
                <div className="row" >
                        

                    <div className="input-field col ">
                            <input id="description" type="text" className="active" onChange={this.onChange} defaultValue={description}/>
                            <label htmlFor="description">Description</label>
                    </div>
                </div>
                <div className="row" >

                    <div className="input-field col">
                        <input id="assigned_to" type="text" className="active" onChange={this.onChange} defaultValue={assigned_to}/>
                        <label htmlFor="assigned_to">Assigned To</label>
                    </div>
                </div>
                <div className="row" >

                        <DatePicker
                        label="Due date"
                        id="datePicker"
                        onChange={this.dateChange}
                        value={due_date}
                        />
                     
                       {/*  <input type="text" onChange={this.onChange} className="datepicker" defaultValue={due_date}/>
                        <label htmlFor="due_date">Due Date</label> */}
                </div>

                <div className="row" >

                        <Checkbox
                            id="completed"
                            label="Completed"
                            value="Red"
                            onChange={this.onChange}
                            defaultChecked={completed}
                            />
                
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
//
    if(!todoList)
        return <React.Fragment />
  
////
    return {
        todoList,
        id,
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
import React, { Component } from 'react'
//import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    
    state = {
        descrip:  this.props.itemToEdit.description,
        assign:  this.props.itemToEdit.assigned_to,
        dued:  this.props.itemToEdit.due_date,
        compl:  this.props.itemToEdit.completed,
        key:  this.props.itemToEdit.key,
    }

    editItema = (item) => {
        console.log("imhere");
    }

    submit = (e) => {
        e.preventDefault();
        this.props.submitItemChange(this.state);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    onCheck = (e) => {
        this.setState({ compl: !this.state.compl});
    }

    render() {
        

        if(this.props.itemToEdit.key === -1)
        {
            console.log("creating new item");
            this.props.resetItemToEdit();
        }

        return (
            <div id='todo_item'>
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div className="item_description_prompt"  >Description:</div>
                    <input id="item_description_textfield" name="descrip" defaultValue={this.props.itemToEdit.description} onChange={this.onChange} className="item_input" type="input" />
                    <div className="item_assigned_to_prompt" >Assigned To:</div>
                    <input id='item_assigned_to_textfield' name="assign" defaultValue={this.props.itemToEdit.assigned_to} onChange={this.onChange} className="item_input" type="input" />
                    <div className="item_due_date_prompt" >Due Date:</div>
                    <input id="item_due_date_picker" name="dued" defaultValue={this.props.itemToEdit.due_date} onChange={this.onChange} className="item_input" type="date" />
                    <div className="item_completed_prompt" >Completed:</div>
                    <input className="item_completed_checkbox"  name="compl"  defaultChecked={this.props.itemToEdit.completed} onChange={this.onCheck} type="checkbox" />
                </div>
                <br/>
                <button className="item_form_submit_button" onClick={this.submit}>Submit</button>
                <button className="item_form_cancel_button" onClick={this.props.cancelItemChange}>Cancel</button>
            </div>
        )
    }
}

/*ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}*/

export default ItemScreen

import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        return (
            <div id='todo_item'>
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div className="item_description_prompt"  >Description:</div>
                    <input id="item_description_textfield" className="item_input" type="input" />
                    <div className="item_assigned_to_prompt" >Assigned To:</div>
                    <input id='item_assigned_to_textfield' className="item_input" type="input" />
                    <div className="item_due_date_prompt" >Due Date:</div>
                    <input id="item_due_date_picker" className="item_input" type="date" />
                    <div className="item_completed_prompt" >Completed:</div>
                    <input id="item_completed_checkbox" className="item_input" type="checkbox" />
                </div>
                <br/>
                <button className="item_form_submit_button" onClick={this.props.submitItemChange}>Submit</button>
                <button className="item_form_cancel_button" onClick={this.props.cancelItemChange}>Cancel</button>

                
              
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen

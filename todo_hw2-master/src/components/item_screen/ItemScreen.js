import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    
    state = {
        descrip: '',
        assign: '',
        dued: '',
        compl: false
    }


    editItema = (item) => {
        console.log("imhere");
    }

    submit = (e) => {
        e.preventDefault();
        this.props.submitItemChange(this.state);
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value});

    onCheck = (e) => {
        console.log(e.target.value);
        //console.log(e.);
        this.setState({ compl: !this.state.compl})
    }

    render() {
    
       /* var targ = this.props.setMyStateTwo();
        //this.state.descrip = targ.description;
        this.state.assign = targ.assigned_to;
        this.state.dued = targ.due_date;
        this.state.compl = targ.completed;
        this.setState({descrip: targ.description});*/

        console.log("descrip: " + this.state.descrip);
        return (
            <div id='todo_item'>
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div className="item_description_prompt"  >Description:</div>
                    <input id="item_description_textfield" name="descrip" value={this.state.descrip} onChange={this.onChange} className="item_input" type="input" />
                    <div className="item_assigned_to_prompt" >Assigned To:</div>
                    <input id='item_assigned_to_textfield' name="assign" value={this.state.assign} onChange={this.onChange} className="item_input" type="input" />
                    <div className="item_due_date_prompt" >Due Date:</div>
                    <input id="item_due_date_picker" name="dued" value={this.state.dued} onChange={this.onChange} className="item_input" type="date" />
                    <div className="item_completed_prompt" >Completed:</div>
                    <input className="item_completed_checkbox"  name="compl" value={this.state.compl} onChange={this.onCheck} type="checkbox" />
                </div>
                <br/>
                <button className="item_form_submit_button" onClick={this.submit}>Submit</button>
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

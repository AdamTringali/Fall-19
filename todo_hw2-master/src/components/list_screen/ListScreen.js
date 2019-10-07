import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return owner;
        }
    }

    setListOwner = (e) => {
        //console.log("this + " + document.getElementById("list_owner_textfield").value);
        //this.props.todoList.owner = e.target.value;
        this.setState({name: e.target.value});
        //this.props.todoList.owner = e.target.value;
       // document.getElementById("list_owner_textfield") = e.target.value;
    }



    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            onChange={this.props.setListName}
                            defaultValue={this.getListName()} 
                            type="text" 
                            id="list_name_textfield" 
                           />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            onChange={e => this.setState({ text: e.target.value })}                            type="text" 
                            id="list_owner_textfield" 
                            
                            />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} />
            </div>
        )
    }
}

export default ListScreen

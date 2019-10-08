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




    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            onChange={this.props.setListName.bind(this, this.props.todoList)}
                            defaultValue={this.getListName()} 
                            type="text" 
                            id="list_name_textfield" 
                           />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            onChange={this.props.setListOwner.bind(this, this.props.todoList)} type="text" 
                            id="list_owner_textfield" 
                            
                            />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} 
                moveUp={this.props.moveUp}
                moveDown={this.props.moveDown}
                removeItem={this.props.removeItem}
                addItem={this.props.addItem}
                editItem={this.props.editItem}
                />
            </div>
        )
    }
}

export default ListScreen

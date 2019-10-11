import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {

        //console.log(this.props.todoList);
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                <div className="list_item_task_header" onClick={this.props.sortByTask.bind(this, this.props.todoList)}>Task</div>
                <div className="list_item_due_date_header" onClick={this.props.sortByDueDate}>Due Date</div>
                <div className="list_item_status_header" onClick={this.props.sortByStatus}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem} 
                            moveUp={this.props.moveUp}
                            moveDown={this.props.moveDown}
                            removeItem={this.props.removeItem}
                            numItems={this.props.todoList.items.length}
                            editItem={this.props.editItem}

                             />
                    ))
                } 

                <div className='list_item_add_card' onClick={this.props.addItem}>

                    <img src="./images/icons/AddItem.png" /> 

                </div>
                


            </div>
        )
    }
}

export default ListItemsTable

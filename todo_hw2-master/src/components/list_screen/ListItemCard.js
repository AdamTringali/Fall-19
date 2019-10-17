import React, { Component } from 'react'

export class ListItemCard extends Component {


    render() {
        //console.log(this.props.listItem.completed.toString());
        let str = "";
        let statuscss = "list_item_card_completed";
        let upButtoncss = "list_item_card_up_button";
        let downButtoncss = "list_item_card_down_button";
        let length = this.props.numItems;

        if(this.props.listItem.completed === true)
            str = "Completed";
        else{
            statuscss = "list_item_card_not_completed";
            str = "Pending";
        }
        if(this.props.listItem.key === 0)
            upButtoncss = "list_item_card_up_button_disabled";

        if(this.props.listItem.key === (--length))
            downButtoncss = "list_item_card_down_button_disabled";



        return (
            <div className='list_item_card' >
                <div className='list_item_card_description' onClick={this.props.editItem.bind(this, this.props.listItem)}>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to' onClick={this.props.editItem.bind(this, this.props.listItem)}>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date' onClick={this.props.editItem.bind(this, this.props.listItem)}>
                    {this.props.listItem.due_date}
                </div>
                <div className={statuscss} >
                    {str}
                </div>

                <div  className='list_item_card_buttons'>
                        
                    <img src="./images/icons/MoveUp.png" alt="move_up_icon" className={upButtoncss} onClick={this.props.moveUp.bind(this, this.props.listItem)}/> 
                    <img src="./images/icons/MoveDown.png" alt="move_down_icon" className={downButtoncss} onClick={this.props.moveDown.bind(this, this.props.listItem)}/> 
                    <img src="./images/icons/Close48.png" alt="remove_icon" className='list_item_card_remove_button' onClick={this.props.removeItem.bind(this,this.props.listItem)}/> 

                </div>
            </div>
        )

        
    }
}

export default ListItemCard

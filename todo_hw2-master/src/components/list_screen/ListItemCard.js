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
            <div className='list_item_card' onClick={this.props.editItem}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className={statuscss} >
                    {str}
                </div>

                <div  className='list_item_card_buttons'>
                        
                    <img src="./images/icons/MoveUp.png" className={upButtoncss} onClick={this.props.moveUp.bind(this)}/> 
                    <img src="./images/icons/MoveDown.png" className={downButtoncss} onClick={this.props.moveDown}/> 
                    <img src="./images/icons/Close48.png" className='list_item_card_remove_button' onClick={this.props.removeItem}/> 

                </div>
            </div>
        )

        
    }
}

export default ListItemCard

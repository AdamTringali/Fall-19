import React, { Component } from 'react'

export class ListDeletePopup extends Component {
    render() {
       if(!this.props.show)
        return null;
        return (
            <div id="delete_list_popup" className="delete_list_popup" data-animation="slideInOutLeft">
                <div className="delete_list_popup_content" id="delete_list_popup_contents">
                        <p>Delete list?</p>
                        <p><strong>Are you sure you want to delete this list?</strong></p>

                        <div id="yes_or_no">
                            <button id="yes_button" onClick={this.props.confirmDeleteList}>Yes</button>
                            <button id="no_button" onClick={this.props.dontDelete}>No</button>
                        </div>

                        <p>The list will not be retreivable.</p>

                        
                </div>
            </div>

        )
    }
}

export default ListDeletePopup

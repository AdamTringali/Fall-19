import React, { Component } from 'react'
import { isAbsolute } from 'path';

export class ListDeletePopup extends Component {
    /*state = {
        style: "translateX(225%)",
        timeToClose: false
    }*/

    /*dontDeleteTwo = () =>{
       // this.setState({style: "translateX(225%)"});
       //this.setState({style: "translateX(225%)"});            

       //this.setState({timeToClose: true});
      
            
        this.props.dontDelete();
        //this.setState({show: !this.state.show});

        
        //this.state.style = "translateX(225%)";
        
       
        
        console.log("dont delete in popup.js");
    }*/
    render() {
        if(!this.props.show){
          
            return null;
        }
        else
        {
            console.log("in here");
            if(!this.props.timeToClose){
                setTimeout(()=> {
                        //this.setState({style: "translateX(60%)"})
                        this.props.setStyle();
                    },
                    25
                );
            }
        }
        //let slidecss;
        //setTimeout(slidecss = "translateX(70%)", 2000);
       
     
        return (
            <div id="delete_list_popup" className="delete_list_popup" >
                <div className="delete_list_popup_content" id="delete_list_popup_contents" style={{transform: this.props.style}}>
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

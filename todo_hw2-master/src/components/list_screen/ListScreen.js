import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import ListDeletePopup from './ListDeletePopup'
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

    showModal = () => {
        this.setState({ 
            show: !this.state.show
        })
    }

    deleteList = () => {
        this.setState({show: !this.state.show});
        //this.props.deleteList();
    }

    dontDelete = () =>{
        console.log("dontdeletelist listscreen.js");
        //this.setState({timeToClose: true});
        //this.setState({style: "translateX(225%)"});
        //this.setStyleClose();
          
                //this.setState({style: "translateX(60%)"})
        this.setState({style: "translateX(225%)"});
         

        
            //this.props.setStyle();
        this.setState({show: !this.state.show});


    
        //this.setState({style: "translateX(225%)"});
        
                
//        this.setState({show: !this.state.show});
    }


    confirmDeleteList = () =>{
        console.log("confirmdeletelist listscreen js");
        this.props.confirmDeleteList();
    }

    state = {
        show: false,
        style: "translateX(225%)",
        timeToClose: false
    }

    setStyle = () => {
        this.setState({style: "translateX(60%)"});
    }

    setStyleClose = () =>{
        this.setState({style: "translateX(225%)"});
        this.setState({timeToClose: false});


    }





    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash deleteList={this.deleteList}/>
                <ListDeletePopup show={this.state.show}
                confirmDeleteList={this.confirmDeleteList}
                dontDelete={this.dontDelete} 
                style={this.state.style}
                timeToClose={this.state.timeToClose}
                setStyle={this.setStyle}
                setStyleClose={this.setStyleClose}/>
                
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
                sortByTask={this.props.sortByTask}
                sortByDueDate={this.props.sortByDueDate}
                sortByStatus={this.props.sortByStatus}
                />
            </div>
        )
    }
}

export default ListScreen

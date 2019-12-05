import React from 'react';

class TodoListCard extends React.Component {

    state = {
        white: true,
        color: "card z-depth-0 todo-list-link" ,
 
    }

    mouseEnter = () => {
        this.setState({color: "green lighten-3 card z-depth-0 todo-list-link"});
    }

    mouseLeave = () => {
        this.setState({color: "white card z-depth-0 todo-list-link"});
    }

    render() {
        const { todoList } = this.props;
        //console.log("todolistcard.js TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className={this.state.color} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                <div className="card-content grey-text text-darken-3" >

                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;
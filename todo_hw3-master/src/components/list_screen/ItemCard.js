import React from 'react';
import { Redirect } from 'react-router-dom'




class ItemCard extends React.Component {
    state = {
        color: "card z-depth-0 todo-list-link green lighten-3",
        clicked: false
    }

    mouseEnter = () => {
        this.setState({color: "card z-depth-0 todo-list-link green darken-1"});
    }

    mouseLeave = () => {
        this.setState({color: "card z-depth-0 todo-list-link green lighten-3"});
    }

    onClick = ( e, ss) => {
        console.log("clicking item card: " + e.description);
        this.setState({clicked: true});

    }


    render() {
        const { item } = this.props;  
        let completed = "Pending";
        if(item.completed === true){
            completed = "Completed";
        }
        let str = "/todoList/" + this.props.todoList.id + "/" + this.props.todoList.key;

        if(this.state.clicked){
            console.log("redirecting");
            //return <Redirect to={str} />;
        }

        return (
            <div className={this.state.color} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.onClick.bind(this)}>
                <div className="row card-content grey-text text-darken-3">
                    <div className="col s4 "><span className="flow-text">{item.description}</span>
                    <h6 className="grey-text text-darken-3">Assigned To: {item.assigned_to}</h6>
                    </div>
                    <div className="col s4 push-s1"><span className="flow-text">{item.due_date}</span></div>
                    <div className="col s4 push-s1"><span className="flow-text">{completed}</span></div>




                 
                </div>
            </div>
        );
    }
}
export default ItemCard;
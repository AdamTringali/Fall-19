import React from 'react';
    



class ItemCard extends React.Component {
    state = {
        color: "card z-depth-0 todo-list-link green lighten-3",
    }

    mouseEnter = () => {
        this.setState({color: "card z-depth-0 todo-list-link green darken-1"});
    }

    mouseLeave = () => {
        this.setState({color: "card z-depth-0 todo-list-link green lighten-3"});
    }

    render() {
        const { item } = this.props;  
        let completed = "Pending";
        if(item.completed === true){
            completed = "Completed";
        }

        return (
            <div className={this.state.color} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
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
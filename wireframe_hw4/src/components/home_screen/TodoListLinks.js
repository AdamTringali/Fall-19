import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
/*

{todoLists && todoLists.map(todoList => (
    /*<Link to={'/todoList/' + todoList.id} key={todoList.id}>
        <TodoListCard todoList={todoList} />
    </Link>*/
//))}
//*/
class TodoListLinks extends React.Component {
    render() {
        //console.log("todolistLinks");

        return (
            <div className="todo-lists section">

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log("map state to props todolistlink");
    console.log(state);
    
    return {
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);
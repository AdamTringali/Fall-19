import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';



class TodoListLinks extends React.Component {

    render() {
        const wireframes = this.props.wireframes;

        if(this.props.wireframes)
            this.props.loadWireframes(this.props.wireframes);

        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.key} key={wireframe.key} >
                        <TodoListCard wireframe={wireframe} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const wireframes  = ownProps.wireframes;

    return {
        wireframes,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadWireframes: (wireframes) => {dispatch({type: "LOAD_WIREFRAMES", wireframes: wireframes} )},
   
  });

export default compose(connect(mapStateToProps, mapDispatchToProps))(TodoListLinks);
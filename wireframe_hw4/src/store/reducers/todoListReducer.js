const initState = {
    wireframes: []
};

const todoListReducer = (state = initState, action) => {
    //console.log("todolistreducer");
    //console.log(action.type);

    switch (action.type) {
        case "LOAD_WIREFRAMES":
            console.log("case: LOAD_WIREFRAME");
            return [
                {...state, wireframes: action.wireframes}
            ]
            break;
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        default:
            return state;
            break;
    }
};

export default todoListReducer;
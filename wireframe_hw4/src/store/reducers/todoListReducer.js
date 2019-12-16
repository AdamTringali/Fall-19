const initState = {
    wireframes: []
};

const todoListReducer = (state = initState, action) => {
    //console.log("todolistreducer");
    //console.log(action.type);

    switch (action.type) {
        case "LOAD_WIREFRAMES":
            console.log("case: LOAD_WIREFRAME");
            let myFrames = action.wireframes;
            for(var i = 0; i < myFrames.length; i++)
            {
                myFrames[i].selected = -1;
            }


            return [
                {...state, wireframes: myFrames}
            ]

        case "LOAD_ITEMS":
                console.log("case: LOAD_ITEMS");
                //console.log(action.wireframes)
                return [
                    {...state, wireframes: action.wireframes}
                ]
        case "SUBMIT_CHANGES":
            console.log("case: SUBMIT_CHANGES");
            break;
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 

        default:
            return state;
    }
};

export default todoListReducer;
// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOAD_WIREFRAMES = 'LOAD_WIREFRAMES';
export const SUBMIT_CHANGES = 'SUBMIT_CHANGES';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES

export function submitChanges(wireframes) {
    console.log("here22");
    return {
        type: 'SUBMIT_CHANGES',
        wireframes
    }
}

export function loadWireframes(wireframes) {
    console.log("here");
    return {
        type: 'LOAD_WIREFRAMES',
        wireframes
    }
}

export function createTodoList(wireframe) {
    return {
        type: 'CREATE_WIREFRAME',
        wireframe
    }
}
export function createTodoListError(error) {
    return {
        type: 'CREATE_WIREFRAME_ERROR',
        error
    }
}
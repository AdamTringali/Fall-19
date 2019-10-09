import React, { Component } from 'react';


class jTPS extends Component {

    state = {
        mostRecentTransaction: -1,
        performingDo: false, 
        performingUndo: false
    }

    isPerformingDo = () => {
        return this.state.performingDo;
    }

    isPerformingUndo = () => {
        return this.state.performingUndo;
    }

    addTransaction = (transaction) => {
        
    }

}

export default jTPS

'use strict'
/**
 * TodoListItem.js
 * 
 * This class represents an item for our list.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListItem {
    /**
     * The constructor creates a default, empty item.
     */
    constructor() {
        this.description = "Unknown";
        this.assignedTo = "Unknown";
        this.completed = false;
        this.dueDate = "0000-00-00";
        this.editing = false;
    }

    // GETTER/SETTER METHODS

    setEditing(val) {
        this.editing = val;
    }

    isEditing() {
        return this.editing;
    }

    getDueDate() {
        return this.dueDate;
    }

    setDueDate(initDueDate) {
        //console.log("TodoListItem:28//setDueDate: " + initDueDate);

        this.dueDate = initDueDate;
    }

    getDescription() {
        return this.description;
    }

    setDescription(initDescription) {
        //console.log("TodoListItem:36//setDescription: " + initDescription);
        this.description = initDescription;
    }

    getAssignedTo() {
        return this.assignedTo;
    }

    setAssignedTo(initAssignedTo) {
        //console.log("TodoListItem:47//setAssignedTo: " + initAssignedTo);

        this.assignedTo = initAssignedTo;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(initCompleted) {
        this.completed = initCompleted;
    }
}
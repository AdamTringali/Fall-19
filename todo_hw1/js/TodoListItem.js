'use strict'
/**
 * TodoListItem.js
 * 
 * This class represents an item for our list.
 * 
 * @author McKilla Gorilla
 * @author Adam Tringali
 */
class TodoListItem {
    /**
     * The constructor creates a default, empty item.
     */
    constructor() {
        this.description = "Unknown";
        this.assignedTo = "Unknown";
        this.completed = false;
        this.dueDate = "2019-09-23";
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
        this.dueDate = initDueDate;
    }

    getDescription() {
        return this.description;
    }

    setDescription(initDescription) {
        this.description = initDescription;
    }

    getAssignedTo() {
        return this.assignedTo;
    }

    setAssignedTo(initAssignedTo) {
        this.assignedTo = initAssignedTo;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(initCompleted) {
        this.completed = initCompleted;
    }
}
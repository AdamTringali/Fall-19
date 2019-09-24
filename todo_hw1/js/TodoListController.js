'use strict'
/**
 * TodoListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author Adam Tringali
 */
class TodoListController {
    /**
     * The constructor sets up all event handlers for all user interface
     * controls known at load time, meaning the controls that are declared 
     * inside index.html.
     */
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        //important
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_LIST]);

        // THEN THE CONTROLS ON THE LIST SCREE`N
        this.registerEventHandler(TodoGUIId.LIST_TRASH, TodoHTML.CLICK, this[TodoCallback.PROCESS_DELETE_LIST])
        this.registerEventHandler(TodoGUIId.LIST_ADD_ITEM, TodoHTML.CLICK,this[TodoCallback.PROCESS_CHANGE_ITEM])

        
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoHTML.CLICK, this[TodoCallback.PROCESS_GO_HOME]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_NAME]);
        this.registerEventHandler(TodoGUIId.LIST_OWNER_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_OWNER]);
        

        //CONTROLS ON EDIT ITEM SCREEN
        this.registerEventHandler(TodoGUIId.EDIT_SUBMIT,TodoHTML.CLICK,this[TodoCallback.PROCESS_SUBMIT_ITEM_CHANGES]);
        this.registerEventHandler(TodoGUIId.EDIT_CANCEL,TodoHTML.CLICK,this[TodoCallback.PROCESS_CANCEL_ITEM_CHANGES]);
        this.registerEventHandler(TodoGUIId.EDIT_ITEM_DUE_DATE,TodoHTML.CLICK,this[TodoCallback.PROCESS_EDIT_DUE_DATE]);


        //CONTROLS ON POPUP
        this.registerEventHandler(TodoGUIId.YES_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CONFIRM_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.NO_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_DELETE_LIST]);


    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {TodoGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {TodoHTML} eventName The type of control for which to respond.
     * @param {TodoCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        control.addEventListener(eventName, callback);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * --- addition -- 
     * This function responds to when the user changes the
     * owner of the list via the textfield.
     */
    processChangeOwner() {
        let ownerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        let newOwner = ownerTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListOwner(listBeingEdited, newOwner);
    }

    /**
     * This function is called when the user requests to create
     * a new list.
     */
    processCreateNewList() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

      

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on a link
     * for a list on the home screen.
     * 
     * @param {String} listName The name of the list to load into
     * the controls on the list screen.
     */
    processEditList(listName, index) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName, index);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome() {
        window.todo.model.goHome();
    }

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    processSortItemsByDueDate() {
        if(window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING) ){
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        else{
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }

    }

    processConfirmDeleteList(){
        window.todo.model.removeList(window.todo.model.listToEdit);
        window.todo.model.closePopupConfirm();
        window.todo.model.goHome();    
    }

    processCancelDeleteList(){
        window.todo.model.closePopup();
    }

    processDeleteList() {
        window.todo.model.showPopup();
    }

    processEditItem(index) {
        var dueDate = document.getElementById("edit_item_due_date");
        var assignedToTextField = document.getElementById("list_item_card_assigned_to_textfield");
        var descriptionTextField = document.getElementById("list_item_card_description_textfield");
        var checkbox = document.getElementById("list_item_card_completed");
        dueDate.setAttribute("type", "date");

        if(index >= 0){
            let listBeingEdited = window.todo.model.listToEdit;
            var item = listBeingEdited.getItemAtIndex(index);
            item.setEditing(true);
            descriptionTextField.value = item.getDescription();
            assignedToTextField.value = item.getAssignedTo();
            dueDate.value = item.getDueDate();

            if(item.isCompleted())
                checkbox.checked = true;
            else
                checkbox.checked = false;
        }else{
            descriptionTextField.value = "";
            assignedToTextField.value = "";
            dueDate.value = "";
            checkbox.checked = false;
        }

       window.todo.model.goEditItem();
    }

    processSubmitItemChanges() {

        let listBeingEdited = window.todo.model.listToEdit;

        var descriptionTextField = document.getElementById("list_item_card_description_textfield");
        var assignedToTextField = document.getElementById("list_item_card_assigned_to_textfield");
        var dueDate = document.getElementById("edit_item_due_date");
        var checkbox = document.getElementById("list_item_card_completed");
        var item = null;
        var i = 0;

        for (; i < listBeingEdited.numItems(); i++) {
            item = listBeingEdited.getItemAtIndex(i);
            if(item.isEditing() == true){
                console.log("process should be not be here, isediting" + item.isEditing());

                i = 5000
                if(descriptionTextField.value != "")
                    item.setDescription(descriptionTextField.value);
                else   
                    item.setDescription("Unknown");

                if(assignedToTextField.value != "")
                    item.setAssignedTo(assignedToTextField.value);
                else
                    item.setAssignedTo("Unknown");

                if(dueDate.value != "")
                    item.setDueDate(dueDate.value);
                else   
                    item.setDueDate("2019-09-23");

                item.setEditing(false);
                item.setCompleted(checkbox.checked);
            }
        }

         if(i == listBeingEdited.numItems()){
             var item = new TodoListItem();
             if(descriptionTextField.value != "")
                item.setDescription(descriptionTextField.value);
            if(assignedToTextField.value != "")
                item.setAssignedTo(assignedToTextField.value);
            if(dueDate.value != "")
                item.setDueDate(dueDate.value);
            item.setCompleted(checkbox.checked);   
            listBeingEdited.addItem(item);
         }

        window.todo.view.loadItems(listBeingEdited);
        window.todo.model.stopEditItem();
    }

    processCancelItemChanges() {
        let listBeingEdited = window.todo.model.listToEdit;
        var item = null;
        var i = 0;
        for (; i < listBeingEdited.numItems(); i++) {
            item = listBeingEdited.getItemAtIndex(i);
            item.setEditing(false);
        }

        window.todo.model.stopEditItem();
    }

    processChangeItem() {
        window.todo.controller.processEditItem();
    }

    processDeleteItem(index) {
        event.stopPropagation();
        let listBeingEdited = window.todo.model.listToEdit;
        if(index >= 0 && index < listBeingEdited.numItems()){
            listBeingEdited.removeItem(listBeingEdited.getItemAtIndex(index));
        }
        window.todo.view.loadItems(listBeingEdited);
    }

    processMoveItemUp(index) {
        event.stopPropagation();
        if(index == 0){
            return;
        }
        this.swapItems(index, 2);
    }

    processMoveItemDown(index) {
        event.stopPropagation();
        let listBeingEdited = window.todo.model.listToEdit;
        if(++index == listBeingEdited.numItems())
        {
            return;
        }

        this.swapItems(--index, 1);

    }

    swapItems(index, direction){
        let listBeingEdited = window.todo.model.listToEdit;

        var t1 = listBeingEdited.getItemAtIndex(index);
        var t2;
        if(direction == 2)
            t2 = listBeingEdited.getItemAtIndex(index - 1);
        else if(direction == 1)
            t2 = listBeingEdited.getItemAtIndex(++index);
        var desc = t1.getDescription();
        var assignedto = t1.getAssignedTo()
        var date = t1.getDueDate();
        var compl = t1.isCompleted();

        t1.setDescription(t2.getDescription());
        t1.setAssignedTo(t2.getAssignedTo());
        t1.setDueDate(t2.getDueDate());
        t1.setCompleted(t2.isCompleted());

        t2.setDescription(desc);
        t2.setAssignedTo(assignedto);
        t2.setDueDate(date);
        t2.setCompleted(compl);

        window.todo.view.loadItems(listBeingEdited);
    }
}
let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

let clearCompletedButton = document.getElementById("clear-completed-button");
clearCompletedButton.addEventListener("click", clearCompletedToDoItems);

let emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);

let saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);

let toDoList = document.getElementById("todo-list");
let todoEntryBox = document.getElementById("todo-entry-box");

function addToDoItem() {
    let itemText = todoEntryBox.value;
    newToDoItem(itemText, false);
}

function newToDoItem(itemText, completed) {
    let toDoItem = document.createElement("li");
    toDoItem.classList.add("todo-item");

    let radioButton = document.createElement("input");
    radioButton.type = "radio";
    toDoItem.appendChild(radioButton);

    let toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function createToDoElement(itemText) {

}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    let toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

function saveList() {
    let toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        let toDo = toDoList.children.item(i);

        let toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}
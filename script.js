let addModal = document.getElementById("add-modal");

let closeBtnModal = addModal.querySelector("#cancel-button-modal");
closeBtnModal.addEventListener("click", closeAddModal);

let addButtonModal = addModal.querySelector("#add-button-modal");
addButtonModal.addEventListener("click", addToDoItem);

let addButton = document.getElementById("add-button");
addButton.addEventListener("click", e => {
  addModal.style.display = "flex";
});

let clearCompletedButton = document.getElementById("clear-completed-button");
clearCompletedButton.addEventListener("click", clearCompletedToDoItems);

let emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);

let saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);

let toDoList = document.getElementById("todo-list");

let searchBox = document.getElementById("search-box");
searchBox.addEventListener("keyup", filter);

loadList();

function filter() {
  let searchText = this.value.trim();

  for (let item of document.getElementsByClassName("todo-item")) {
    if (!item.textContent.includes(searchText)) {
      item.parentNode.style.display = "none";
    } else {
      item.parentNode.style.display = "flex";
    }
  }
}

function addToDoItem() {
  let name = addModal.querySelector("#todo-name-entry-box").value.trim();
  let date = addModal.querySelector("#todo-date-entry-box").value;
  let time = addModal.querySelector("#todo-time-entry-box").value;

  if (name === "") {
    alert("Invalid Input: No Empty Todo Allowed");
    return;
  }
  newToDoItem(name, date, time, false);
  closeAddModal();
}

function closeAddModal() {
  addModal.style.display = "none";
  addModal.querySelector("#todo-name-entry-box").value = "";
  addModal.querySelector("#todo-date-entry-box").value = "";
  addModal.querySelector("#todo-time-entry-box").value = "";
}

function newToDoItem(name, date, time, completed) {
  let toDoItemWrapper = document.createElement("div");
  toDoItemWrapper.classList.add("todo-item-wrapper");

  let checkMarkBorder = document.createElement("span");
  checkMarkBorder.classList.add("checkmark-border");
  toDoItemWrapper.appendChild(checkMarkBorder);

  let checkMark = document.createElement("span");
  checkMark.classList.add("checkmark");
  checkMarkBorder.appendChild(checkMark);
  checkMark.addEventListener("click", checkMarkClicked);

  let toDoItem = document.createElement("li");
  toDoItem.classList.add("todo-item");
  toDoItemWrapper.appendChild(toDoItem);

  let toDoText = document.createTextNode(name);
  toDoItem.appendChild(toDoText);

  if (completed) {
    toDoItem.classList.add("completed");
    checkMark.classList.add("checked");
  }

  toDoList.appendChild(toDoItemWrapper);
}

function checkMarkClicked() {
  let li = this.parentNode.nextElementSibling;
  if (li.classList.contains("completed")) {
    li.classList.remove("completed");
    this.classList.remove("checked");
  } else {
    li.classList.add("completed");
    this.classList.add("checked");
  }
}

function clearCompletedToDoItems() {
  let completedItems = toDoList.getElementsByClassName("completed");

  console.log(completedItems);

  while (completedItems.length > 0) {
    completedItems.item(0).parentNode.remove();
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

  for (let i = 0; i < toDoList.children.length; i++) {
    let toDo = toDoList.children.item(i).querySelector("li");

    console.log(toDo.innerText);

    let toDoInfo = {
      task: toDo.innerText,
      completed: toDo.classList.contains("completed"),
      date: null,
      time: null
    };
    toDos.push(toDoInfo);
  }

  localStorage.setItem("toDos", JSON.stringify(toDos));

  alert("Todo List Saved!");
}

function loadList() {
  let savedList = JSON.parse(localStorage.getItem("toDos"));

  for (const todoItem of savedList) {
    newToDoItem(
      todoItem.task,
      todoItem.date,
      todoItem.time,
      todoItem.completed
    );
  }
}

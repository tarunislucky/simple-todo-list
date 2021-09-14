
// dom elements

const btnAddTask = document.querySelector(".task-input-btn");
const btnClearAll = document.querySelector(".clear-all-btn");

const taskInput = document.querySelector(".task-input");
const taskContainer = document.querySelector(".list");
const taskCountEl = document.querySelector(".task-count");
const myStorage = window.localStorage;

//initial values

let taskCount = 0;
let taskArray = [];
let item;

//adding event listeners
btnAddTask.addEventListener("click", addTask);
taskInput.addEventListener("keypress", addTaskOnEnter);

document.addEventListener("click", generalHandler);
btnClearAll.addEventListener("click", clearAllTasks);

//Load tasks from local storage
getAllTasks();

// functions
//add task
function addTaskOnEnter(e) {
  if (e.key === "Enter") addTask();
}

function addTask() {

  const inputValue = taskInput.value;
  if (!inputValue.trim()) return;

  const taskObj = { id: generateID(), value: inputValue };

  taskArray.push(taskObj);
  updateLocalStorage();
  renderTask(taskObj);

  taskInput.value = "";
  taskInput.focus();
  taskCount++;
  taskCountEl.textContent = taskCount;
}
//general
function generalHandler(e) {
  //if delete button is clicked
  if (e.target.classList.contains("delete-btn")) {

    item = findClosestItem(e);
    const id = item.getAttribute("data-id");
    const taskObj = getTaskObj(id);
    displayModal(taskObj);
    return;
  }

  //if confirm delete No button clicked

  if (e.target.classList.contains("cnf-del-no")) {
    //close the model and clear it's task content
    closeModal();
    return;
  }
  //if confirm delete YES button clicked

  if (e.target.classList.contains("cnf-del-yes")) {

    deleteTask(e);
    closeModal();
    return;
  }

  if (e.target.classList.contains("blurr")) {
    closeModal();
    return;
  }


}
//delete
function deleteTask(e) {

  const id = e.target.getAttribute("data-id");

  //loop through task array 
  for (let i = 0; i < taskArray.length; i++) {
    //find index of the item which has the id
    if (taskArray[i].id === id) {
      //remove item from array
      taskArray.splice(i, 1);
      break;
    }
  }
  updateLocalStorage();
  item.remove();
  taskCount--;
  taskCountEl.textContent = taskCount;
}

// modal 
function displayModal(taskObj) {
  const html = `<p>${taskObj.value}</p>`;
  document.querySelector(".delete-task-container").insertAdjacentHTML("afterbegin", html);

  document.querySelector(".modal-container").style.display = "block";
  document.querySelector(".blurr").style.display = "block";

  document.querySelector(".cnf-del").setAttribute("data-id", taskObj.id)
}
function closeModal() {
  document.querySelector(".delete-task-container").innerHTML = "";
  document.querySelector(".modal-container").style.display = "none";
  document.querySelector(".blurr").style.display = "none";
}



//clearall

function clearAllTasks() {
  taskArray = [];
  updateLocalStorage();
  taskContainer.innerHTML = "";
  taskCount = 0;
  taskCountEl.textContent = taskCount;
}



//utility functions
function getAllTasks() {

  if (!myStorage.getItem("taskArr")) return;

  taskArray = JSON.parse(myStorage.getItem("taskArr"));
  taskArray.forEach(task => {
    renderTask(task);
  });

  taskCount = taskArray.length;
  taskCountEl.textContent = taskCount;
}
function updateLocalStorage() {
  myStorage.setItem("taskArr", JSON.stringify(taskArray));
}
function renderTask(taskObj) {
  const html = generateTaskHtml(taskObj)
  taskContainer.insertAdjacentHTML("afterbegin", html);

}
function generateTaskHtml(taskObj) {
  return `<li class="item" data-id="${taskObj.id}" >
<p>${taskObj.value}</p>
<div class="btn btn-red delete-btn"><i class="fas fa-trash"></i></div>
</li>`;
}

function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};
function getTaskObj(id) {
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id === id) {
      return taskArray[i];
    }
  }
}
function getIndexOfTask() {

}
function findClosestItem(e) {
  return e.target.closest(".item");
}

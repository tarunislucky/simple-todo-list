
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

//adding event listeners
btnAddTask.addEventListener("click", addTask);
taskInput.addEventListener("keypress", addTaskOnEnter);

document.addEventListener("click", deleteTask);
btnClearAll.addEventListener("click", clearAllTasks);

//Load tasks from local storage
getAllTasks();

//event-listener functions
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

function deleteTask(e) {

  if (e.target.classList.contains("delete-btn")) {
    const item = e.target.closest(".item");
    const id = item.getAttribute("data-id");

    //loop through task array and find index of the item which has the id
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].id === id) {
        taskArray.splice(i, 1);
        break;
      }
    }
    updateLocalStorage();
    item.remove();
    taskCount--;
    taskCountEl.textContent = taskCount;
  }
}

function clearAllTasks() {
  taskArray = [];
  updateLocalStorage();
  taskContainer.innerHTML = "";
  taskCount = 0;
  taskCountEl.textContent = taskCount;
}

function getAllTasks() {

  if (!myStorage.getItem("taskArr")) return;

  taskArray = JSON.parse(myStorage.getItem("taskArr"));
  taskArray.forEach(task => {
    renderTask(task);
  });

  taskCount = taskArray.length;
  taskCountEl.textContent = taskCount;
}

//utility functions

function updateLocalStorage() {
  myStorage.setItem("taskArr", JSON.stringify(taskArray));
}
function renderTask(taskObj) {
  const html = `<li class="item" data-id="${taskObj.id}" >
  <p>${taskObj.value}</p>
  <div class="btn btn-red delete-btn"><i class="fas fa-trash"></i></div>
 </li>`;
  taskContainer.insertAdjacentHTML("afterbegin", html);

}

function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};


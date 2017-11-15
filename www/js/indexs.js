const headerButton = document.getElementById('header__button');
const taskList = document.getElementById('tasks__list');
var headerInput = document.getElementById('header__input');

function createTaskNode(taskContent) {
  var iconDone = document.createElement("I");
  iconDone.setAttribute('class', 'fa fa-check');
  iconDone.setAttribute('onclick', 'moveItemsToDone(this)');

  var paragraf = document.createElement("P");
  paragraf.setAttribute('class', 'task__item-text');

  var iconQuit = document.createElement("I");
  iconQuit.setAttribute('class', 'fa fa-times'); 

  var button = document.createElement("BUTTON");
  button.setAttribute('class', 'tasks__remove');
  button.setAttribute('onclick', 'removeItem(this)');
  button.appendChild(iconQuit);
  var textlistItem = document.createTextNode(taskContent);        
  paragraf.appendChild(textlistItem);  
  var listItem = document.createElement("LI");
  listItem.setAttribute('class', 'tasks__item');
  listItem.appendChild(iconDone);
  listItem.appendChild(paragraf);
  listItem.appendChild(button);
  return listItem;
}

function addTask(task) {
  taskList.appendChild(task);
}

function getTasksFromLocalStorage() {
  var localStorageData = localStorage.getItem('tasks');
  var taskArray = JSON.parse(localStorageData);
  return taskArray;
}

(function addTasksFromLocalStorage() {
  var mojeTaski = getTasksFromLocalStorage();
  if (mojeTaski !== null) {
    for (i = 0; i < mojeTaski.length; i += 1) {
      var taskOne = mojeTaski[i];
      var newNode = createTaskNode(taskOne);
      addTask(newNode);
    };
  }
})();

function addItemToLocalStorage(newTask) {
  var tasks = getTasksFromLocalStorage();
  if (tasks === null) {
    tasks = [];
  }
  tasks.push(newTask);
  var stringifiedTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', stringifiedTasks);
}

function removeItemFromLocalStorage(taskToDeleteFromLocalStorage) {
  var tasksFromLocalStorage = getTasksFromLocalStorage();
  var taskIndex = tasksFromLocalStorage.indexOf(taskToDeleteFromLocalStorage);
  tasksFromLocalStorage.splice(taskIndex, 1);
  var stringifiedTasks = JSON.stringify(tasksFromLocalStorage);
  localStorage.setItem('tasks', stringifiedTasks);
}



function createNewTask() {
  if (headerInput.value !== '') {
    var listItem = createTaskNode(headerInput.value);
    addItemToLocalStorage(headerInput.value);
    headerInput.value = "";
    taskList.appendChild(listItem);
    headerInput.focus();
  } else {
    alert('Add content');
  }
}

headerButton.addEventListener('click', () => {
  createNewTask();
});

document.onkeypress = function (event) {
  event = event || window.event;
  if ( event.charCode === 13 ) {
    createNewTask();
  }
};

function removeItem(button) {
  var itemToDelete = button.parentElement;
  var ulList = itemToDelete.parentElement;
  ulList.removeChild(itemToDelete);
  var valueToDelete = button.previousElementSibling.outerText;
  removeItemFromLocalStorage(valueToDelete);
}


function changeColorPalette(color) {
  let bodyClass = 'container ' + color;
  const container = document.getElementById('container');
  container.className = bodyClass;
}
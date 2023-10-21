import { Task } from "./classTask.js";
import { completeTask } from "./completeTask.js";
import { deleteTask } from "./deleteTask.js";
import { editTask } from "./editTask.js";
import { saveTaskLocalStorage, loadTasksFromLocalStorage } from "./localStorage.js";
import { updateStatusTask } from "./updateStatus.js";

const CONTAINER_TASK = document.querySelector('.container-tasks')
const BUTTON_NEW_TASK = document.querySelector('.button-new-task')

BUTTON_NEW_TASK.addEventListener('click', createNewTask);

function createNewTask(event) {
    event.preventDefault();
    const contentDescriptionTask = document.getElementById('input-new-task').value;
    const contentSetDate = document.getElementById('set-date').value;
    const contentPriority = document.getElementById('priority').value;

    checkInputfilled(contentDescriptionTask);

    const user = getCurrentUser(); 

    const listTaskCurrentUser = JSON.parse(localStorage.getItem(`taskUser: ${user}`)) || [];

    const task = new Task(contentDescriptionTask, contentSetDate, contentPriority);
    listTaskCurrentUser.push(task);

    const listTaskCurrentUserSringfy = JSON.stringify(listTaskCurrentUser);
    const taskElement = createBodyTask(task.descriptionTask, task.dueDate, task.priority, task.id);

    saveTaskLocalStorage(listTaskCurrentUserSringfy, user);

    CONTAINER_TASK.appendChild(taskElement);

    completeTask();
    deleteTask();
    editTask();
    updateStatusTask(listTaskCurrentUser)
}

function createBodyTask(contentDescriptionTask, contentSetDate, contentPriority, id) { 
    const divTask = document.createElement('div')
    divTask.classList.add('task');
    // button completed
    const buttonComplete = document.createElement('button')
    buttonComplete.classList.add('button-task-checkbox')
    const imgButtonComplete = document.createElement('img')
    imgButtonComplete.setAttribute('src', './assets/img/circle-blue.svg')
    buttonComplete.appendChild(imgButtonComplete);

    //div infos: description, dua date and priority
    const divInfos = document.createElement('div');
    divInfos.classList.add('infos')

    const descriptionTask = document.createElement('p')
    descriptionTask.classList.add('description-task')
    descriptionTask.textContent = contentDescriptionTask;
    divInfos.appendChild(descriptionTask);

    const divContainerSubInfos = document.createElement('div');
    
    const dueDate = document.createElement('span');
    dueDate.classList.add('info-due-date');
    dueDate.textContent = contentSetDate;

    const priority = document.createElement('span');
    priority.classList.add('info-priority');
    priority.textContent = contentPriority;

    divContainerSubInfos.appendChild(dueDate);
    divContainerSubInfos.appendChild(priority);
    divInfos.appendChild(divContainerSubInfos);
    
    const buttonDeleteTask = document.createElement('button')
    buttonDeleteTask.classList.add('button-delete-task')
    const imgButtonDeleteTask = document.createElement('img')
    imgButtonDeleteTask.setAttribute('src', './assets/img/icon-trash.svg')
    buttonDeleteTask.appendChild(imgButtonDeleteTask);

    const buttonEditTask = document.createElement('button');
    buttonEditTask.classList.add('button-edit-task');
    const imgButtonEditTask = document.createElement('img');
    imgButtonEditTask.setAttribute('src', './assets/img/edit.svg');
    buttonEditTask.appendChild(imgButtonEditTask);

    const divContainerButtons = document.createElement('div');
    divContainerButtons.appendChild(buttonDeleteTask);
    divContainerButtons.appendChild(buttonEditTask);
    
    divTask.setAttribute('data-id', id)
    divTask.appendChild(buttonComplete)
    divTask.appendChild(divInfos)
    divTask.appendChild(divContainerButtons)

    return divTask
}

function loadTaskSaved(contentTask) {
    const task = new Task(contentTask);
    const taskElement = createBodyTask(task.descriptionTask);
    CONTAINER_TASK.appendChild(taskElement)
}

function getCurrentUser() {
    return localStorage.getItem('currentUserId');
}

function checkInputfilled(contentDescriptionTask) {
    if(contentDescriptionTask === '') {
        const inputTask = document.getElementById('input-new-task')
        inputTask.style.border = '.1rem solid red';
        const error = new Error('Campo não pode ser vazio')
        return alert(error)
    }
}

export { createBodyTask, createNewTask, loadTaskSaved, getCurrentUser }

window.addEventListener('load', loadTasksFromLocalStorage().then(() => {
    
}).catch((error) => {
    console.error(error); 
}));
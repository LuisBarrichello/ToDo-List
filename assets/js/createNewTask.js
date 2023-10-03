import { Task } from "./classTask.js";
import { saveLocalStorage, loadTasksFromLocalStorage } from "./localStorage.js";

const CONTAINER_TASK = document.querySelector('.container-tasks')
const BUTTON_NEW_TASK = document.querySelector('.button-new-task')

BUTTON_NEW_TASK.addEventListener('click', createNewTask)

function createNewTask(event) {
    event.preventDefault();
    const contentInputTask = document.getElementById('input-new-task')?.value;

    if(contentInputTask === '') {
        const inputTask = document.getElementById('input-new-task')
        inputTask.style.border = '.1rem solid red';
        const erro = new Error('Campo não pode ser vazio')
        return alert(erro)
    }

    const task = new Task(contentInputTask)

    const taskElement = createBodyTask(task.descriptionTask);

    saveLocalStorage(task)

    CONTAINER_TASK.appendChild(taskElement)
}

function createBodyTask(contentInputTask) { 
    const divTask = document.createElement('div')
    divTask.classList.add('task');

    const buttonComplete = document.createElement('button')
    buttonComplete.classList.add('button-task-checkbox')
    const imgButtonComplete = document.createElement('img')
    imgButtonComplete.setAttribute('src', './assets/img-svg/circle-blue.svg')
    buttonComplete.appendChild(imgButtonComplete)

    const descriptionTask = document.createElement('p')
    descriptionTask.classList.add('description-task')
    descriptionTask.textContent = contentInputTask;

    const buttonDeleteTask = document.createElement('button')
    buttonDeleteTask.classList.add('button-delete-task')
    const imgButtonDeleteTask = document.createElement('img')
    imgButtonDeleteTask.setAttribute('src', './assets/img-svg/icon-trash.svg')
    buttonDeleteTask.appendChild(imgButtonDeleteTask);

    
    divTask.appendChild(buttonComplete)
    divTask.appendChild(descriptionTask)
    divTask.appendChild(buttonDeleteTask)

    return divTask
}

function loadTaskSaved(contentTask) {
    const task = new Task(contentTask);
    const taskElement = createBodyTask(task.descriptionTask);
    CONTAINER_TASK.appendChild(taskElement)

}

export { createBodyTask, createNewTask, loadTaskSaved }

window.addEventListener('load', loadTasksFromLocalStorage);
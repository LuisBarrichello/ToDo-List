import { getCurrentUser } from "./createNewTask.js";
import { getTaskListFromLocalStorage } from "./localStorage.js";
import { updateStatusTask } from "./updateStatus.js";

function deleteTask() {
    const BUTTONS_DELETE_TASK = document.querySelectorAll('.button-delete-task');

    BUTTONS_DELETE_TASK.forEach((button) => {
        button.addEventListener('click', (event) => {
            removeTaskTheDOM(event);
            removeTaskTheLocalStorage(event)
        })
    })
}

function removeTaskTheDOM(event) {
    const elementContainerTask = event.target.closest('.container-tasks');
    const taskSelected = event.target.closest('.task')
    elementContainerTask.removeChild(taskSelected);
}

async function removeTaskTheLocalStorage(event) {
    const user = getCurrentUser();
    const taskList = await getTaskListFromLocalStorage(user);
    const task = event.target.closest('.task');
    const taskId = Number(task.dataset.id);
    const listWithoutTaskSelected = taskList.filter(task => task.id !== taskId);
    const listTaskStringify = JSON.stringify(listWithoutTaskSelected);
    localStorage.setItem(`taskUser: ${user}`, `${listTaskStringify}`);
    updateStatusTask(listWithoutTaskSelected);
}

export { deleteTask }
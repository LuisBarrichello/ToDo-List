import { Task } from "./classTask.js";
import { loadTaskSaved } from "./createNewTask.js";

function saveLocalStorage(task) {
    return localStorage.setItem(`id ${Task.id}`, task.descriptionTask);
}

function loadTasksFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        loadTaskSaved(value)
    }
}

export { saveLocalStorage, loadTasksFromLocalStorage }


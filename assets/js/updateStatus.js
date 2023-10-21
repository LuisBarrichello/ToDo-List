import { getCurrentUser } from "./createNewTask.js";
import { getTaskListFromLocalStorage } from "./localStorage.js";

function updateStatusTask(taskList) {    
    const completedTasksCount = taskList.filter(task => task.completed === true).length;

    getTaskStatistics(completedTasksCount);
}

async function getTaskStatistics(completedTasksCount) {
    const elementTotalTasksCreated = document.querySelectorAll('.total-tasks-created');
    const elementTotalTasksCompleted = document.querySelector('.total-tasks-completed');

    const user = getCurrentUser();
    const taskList = await getTaskListFromLocalStorage(user);

    try {
        if(taskList.length === 0) {
            elementTotalTasksCreated.forEach((element) => element.textContent = 0) 
            elementTotalTasksCompleted.textContent = 0;
        } else {
            elementTotalTasksCreated.forEach((element) => element.textContent = taskList.length); 
            elementTotalTasksCompleted.textContent = completedTasksCount; 
        }
    } catch (error) {
        console.error(error)
    }
}

export { updateStatusTask }
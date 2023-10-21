    import { getCurrentUser } from "./createNewTask.js";
    import { getTaskListFromLocalStorage, saveTaskLocalStorage } from "./localStorage.js";
    import { updateStatusTask } from "./updateStatus.js";

    function completeTask() {
        const BUTTONS_COMPLETE_TASK = document.querySelectorAll('.button-task-checkbox');

        for (const button of BUTTONS_COMPLETE_TASK) {
            button.addEventListener('click', handleButtonClick);
        }

        async function handleButtonClick(event) {
            const user = getCurrentUser();
            const taskList = await getTaskListFromLocalStorage(user);
            const task = event.target.closest('.task');
            const taskId = Number(task.dataset.id);
            const taskFound = taskList.find(task => Number(task.id) === taskId);
            if(taskFound.completed === true) {
                taskFound.completed = false;
                taskElementLineThroughWhitID(taskList);
            } else {
                taskFound.completed = true;
            }

            const taskListStringify = JSON.stringify(taskList)
            saveTaskLocalStorage(taskListStringify, user)

            updateStatusTask(taskList)
        }
        
        BUTTONS_COMPLETE_TASK.forEach(async (button) => {
            let indexCurrent = 1;
            button.addEventListener('click', (event) => {
                taskElementLineThrough(event);

                //changeImgDueAndDone
                const imgSrc = event.target;
                const SVG = ['./assets/img/circle-blue.svg', './assets/img/circle-purple-done.svg']
                imgSrc.setAttribute('src', SVG[indexCurrent])
                indexCurrent = (indexCurrent + 1) % SVG.length;
            })
        })
    }

    function taskElementLineThrough(event) {
        const parentElementDivTask = event.target.closest('.task');
        const description = parentElementDivTask.querySelector('.description-task');
        const dueDate = parentElementDivTask.querySelector('.info-due-date');
        const priority = parentElementDivTask.querySelector('.info-priority');

        description.classList.toggle('done');
        dueDate.classList.toggle('done');
        priority.classList.toggle('done')
    }

    function taskElementLineThroughWhitID(listTask) {
        const listTasksCompleted = listTask.filter(task => task.completed === true);
        const listTasksIDS = listTasksCompleted.map(task => task.id);

        const tasksElements = document.querySelectorAll('.task');

        tasksElements.forEach(taskElement => {
            const taskId = Number(taskElement.dataset.id);
            if (listTasksIDS.includes(taskId)) {
                // Aplicar a classe "done" às partes da tarefa que você deseja estilizar.
                const description = taskElement.querySelector('.description-task');
                const dueDate = taskElement.querySelector('.info-due-date');
                const priority = taskElement.querySelector('.info-priority');
                const imgDone = taskElement.querySelector('.button-task-checkbox img')
    
                description.classList.add('done');
                dueDate.classList.add('done');
                priority.classList.add('done');
                imgDone.setAttribute('src', './assets/img/circle-purple-done.svg')
            }
        })
    }

    export { completeTask, taskElementLineThroughWhitID }
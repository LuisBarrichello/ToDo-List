import { getCurrentUser } from "./createNewTask.js";
import { loadTasksFromLocalStorage } from "./localStorage.js";

function editTask() {
    const BUTTONS_EDIT_TASK = document.querySelectorAll('.button-edit-task');

    BUTTONS_EDIT_TASK.forEach((button) => {
        button.addEventListener('click', (event) => {
            const modalContainer = document.createElement('div');
            modalContainer.setAttribute('id', 'editTaskModal')
            modalContainer.classList.add('modal')
            modalContainer.style.display = 'block';
            modalContainer.innerHTML = createModal();
            document.body.appendChild(modalContainer);

            const buttonSave = modalContainer.querySelector('#saveTaskChanges')
            buttonSave.addEventListener('click', () => {
                saveTaskEdited(modalContainer, event);
                loadTasksFromLocalStorage().then(() => {
                    
                }).catch((error) => {
                    console.error(error);
                });
                modalContainer.style.display = 'none';
            })

            closeModalButton(modalContainer);
        })
    })
}

function saveTaskEdited(modalContainer, event) {
    const {descriptionEdited, dueDateEdited, priorityEdited} = getInputsEdited(modalContainer);
    
    const foundTaskIdForEdit = getTaskSavedLocalStorage(event);

    const taskList = getTaskListFromLocalStorage();
    const index = taskList.findIndex((task) => task.id === foundTaskIdForEdit.id);
    // Atualize a tarefa na lista com os novos valores
    taskList[index].descriptionTask = descriptionEdited;
    taskList[index].dueDate = dueDateEdited;
    taskList[index].priority = priorityEdited;

    saveTaskListToLocalStorage(taskList)
}

function getTaskSavedLocalStorage(event) {
    const listTaskCurrentUser = getTaskListFromLocalStorage()
    const task = event.target.closest('.task')
    const taskId = Number(task.dataset.id);
    const foundTaskIdForEdit = listTaskCurrentUser.find(task => Number(task.id) === taskId)
    return foundTaskIdForEdit
}

function getTaskListFromLocalStorage() {
    const user = getCurrentUser();
    return JSON.parse(localStorage.getItem(`taskUser: ${user}`)) || [];
}

function createModal() {
    const templateModal = 
    `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Editar Tarefa</h2>
            <input type="text" id="editTaskDescription" placeholder="Descrição da Tarefa" required>
            <input type="date" id="editTaskDueDate" required>
            <select id="editTaskPriority" required>
                <option value="Priority 1">Priority 1</option>
                <option value="Priority 2">Priority 2</option>
                <option value="Priority 3">Priority 3</option>
                <option value="Priority 3">Priority 4</option>
            </select>
            <button id="saveTaskChanges">Salvar</button>
        </div>
    `;

    return templateModal
}

function closeModalButton(modalContainer) {
    const closeModalButton = modalContainer.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
        modalContainer.remove()
    })
}

function getInputsEdited(modalContainer) {
    const descriptionEdited = modalContainer.querySelector('#editTaskDescription').value;
    const dueDateEdited = modalContainer.querySelector('#editTaskDueDate').value;
    const priorityEdited = modalContainer.querySelector('#editTaskPriority').value;


    return { descriptionEdited, dueDateEdited, priorityEdited };
}

function saveTaskListToLocalStorage(taskList) {
    const user = getCurrentUser();
    localStorage.setItem(`taskUser: ${user}`, `${JSON.stringify(taskList)}`);
}

export { editTask }
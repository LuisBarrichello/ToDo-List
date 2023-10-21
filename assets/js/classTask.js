class Task {
    constructor(descriptionTask, dueDate, priority) {
        this.id = Task.getNextId();;
        this.descriptionTask = descriptionTask;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    static nextId = 1; // Inicialize o próximo ID como 1

    static getNextId() {
        return Task.nextId++; // Obtém o próximo ID e, em seguida, o incrementa
    }
}

export { Task }
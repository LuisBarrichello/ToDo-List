class Task {
    static id = 0;
    constructor(descriptionTask) {
        this.id = Task.id++;
        this.descriptionTask = descriptionTask;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

export {Task}
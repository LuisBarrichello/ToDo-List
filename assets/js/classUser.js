class User {
    constructor(userName, email, password) {
        this.id = User.getNextUserId(); // Obtenha o próximo ID único
        this.userName = userName,
        this.email = email;
        this.password = password;
    }

    static getNextUserId() {
        let nextId = +localStorage.getItem('nextUserId') || 1;
        localStorage.setItem('nextUserId', nextId + 1);
        return nextId;
    }
};

export { User }
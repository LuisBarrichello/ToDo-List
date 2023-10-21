import { User } from "./classUser.js";

document.addEventListener('DOMContentLoaded', () => {
    const BUTTON_SUBMIT = document.querySelector('.button-submit-form');
    const form = document.getElementById('register-form');
    let userAlreadyRegistered = false;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const userName = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(userName, email, password)

        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log(users)

        // Verificar se o usuário já está cadastrado por email ou nome de usuário.
        const registeredUser = users.find(user => user.email === email || user.userName === userName);

        if (registeredUser) {
            alert('Usuário já cadastrado');
            userAlreadyRegistered = true;
        } else {
            // Se o usuário não existe, crie um novo usuário.
            const newUser = new User(userName, email, password);
            localStorage.setItem('currentUserId', `${newUser.id}`);

            users.push(newUser);

            localStorage.setItem('isLoggedIn', 'true');

            const usersJSON = JSON.stringify(users);

            localStorage.setItem('users', usersJSON);

            window.location.href = 'index.html';
        }
    });
});

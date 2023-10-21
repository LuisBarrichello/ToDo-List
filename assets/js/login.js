document.addEventListener('DOMContentLoaded',  () => {
    /* const BUTTON_SUBMIT = document.querySelector('.button-submit-form'); */
    const loginForm = document.getElementById('login-form');
            
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const registeredUser = users.find(user => user.email === email && user.password === password);

        if (registeredUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUserId', registeredUser.id);
            window.location.href = "index.html";
        } else {
            if (users.every(user => user.email !== email)) {
                alert('Não há esse cadastro, faça sua inscrição para nossa toDo List')
                window.location.href = "register.html"; 
            } else {
                alert("Login failed. Please check your email and password.");
            }
        }
    })
})
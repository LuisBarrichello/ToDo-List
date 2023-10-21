document.addEventListener('DOMContentLoaded', () => {
    const users = localStorage.getItem('users');

    if (!users) {
        window.location.href = 'login.html'; 
    }
});
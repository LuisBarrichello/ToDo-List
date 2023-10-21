import { getCurrentUser } from "./createNewTask.js";

const buttonSideBar = document.querySelector('.button-side-bar');
const buttonClose = document.querySelector('.close');

buttonSideBar.addEventListener('click', () => {
    const sideBar = document.getElementById('side-bar')
    sideBar.style.display = 'flex';
    sideBar.style.left = '0';
    buttonSideBar.style.display = 'none';

    const main = document.querySelector('main')
    main.style.marginLeft = '15%';

    const nameUser = document.querySelector('.name-user');
    const emailUser = document.querySelector('.email-user');

    const currentUser = getCurrentUser();
    const listUsers = JSON.parse(localStorage.getItem('users'));

    const user = listUsers.find(user => user.id == currentUser);

    nameUser.textContent = `${user.userName}`;
    emailUser.textContent = `${user.email}`;
});

buttonClose.addEventListener('click', () => {
    const sideBar = document.getElementById('side-bar');
    sideBar.style.left = '-100%';
    buttonSideBar.style.display = 'block';

    const main = document.querySelector('main')
    main.style.marginLeft = '0%'
})
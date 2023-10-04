function completeTask() {
    const BUTTONS_COMPLETE_TASK = document.querySelectorAll('.button-task-checkbox');
    
    BUTTONS_COMPLETE_TASK.forEach((button) => {
        let indiceAtual = 1;
        button.addEventListener('click', (event) => {
            const parentElementDivTask = event.target.closest('.task');
            const description = parentElementDivTask.querySelector('.description-task')
            description.classList.add('done')

            /* toggle img */
            const imgSrc = event.target;
            const SVG = ['./assets/img-svg/circle-blue.svg', './assets/img-svg/circle-purple-done.svg']
            imgSrc.setAttribute('src', SVG[indiceAtual])
            indiceAtual = (indiceAtual + 1) % SVG.length;
        })
    })
}

export { completeTask }
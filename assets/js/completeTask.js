window.addEventListener('load', () => {
    const BUTTONS_COMPLETE_TASK = document.querySelectorAll('.button-task-checkbox');
    console.log( BUTTONS_COMPLETE_TASK)
    
    BUTTONS_COMPLETE_TASK.forEach((button) => {
        button.addEventListener('click', (event) => {
            console.log(event.target)
        })
    })
})


function completeTask() {

}
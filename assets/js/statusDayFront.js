function updateDateElements() {
    const elementToday = document.querySelector('.day-today');
    const elementTodayNumber = document.querySelector('.number-today');
    const elementMonth = document.querySelector('.current-month');

    // Day of the week
    const dayName = new Date();
    const optionDayName = { weekday: 'long' };
    const dayOfWeek = dayName.toLocaleDateString('pt-BR', optionDayName);
    elementToday.textContent = capitalizeFirstLetter(dayOfWeek);

    // Day number
    const today = new Date().getDate();
    elementTodayNumber.textContent = today;

    // Month
    const month = new Date();
    const optionsMonth = { month: 'long' };
    const monthName = month.toLocaleDateString('pt-BR', optionsMonth);
    const monthNameFormatted = capitalizeFirstLetter(monthName);
    elementMonth.textContent = monthNameFormatted.slice(0, 3);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

updateDateElements();
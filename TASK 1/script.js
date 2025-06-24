const hours = [
    '8 AM', '9 AM', '10 AM', '11 AM',
    '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'
];

const planner = document.getElementById('planner');
const currentHour = new Date().getHours();  

function hourTo24Format(hourStr) {
    let [hour, period] = hourStr.split(' ');
    hour = parseInt(hour);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    return hour;
}

hours.forEach(hour => {
    const hour24 = hourTo24Format(hour);
    const timeSlot = document.createElement('div');
    timeSlot.className = 'time-slot';

    if (hour24 < currentHour) {
        timeSlot.classList.add('past');
    } else if (hour24 === currentHour) {
        timeSlot.classList.add('present');
    } else {
        timeSlot.classList.add('future');
    }

    const label = document.createElement('div');
    label.className = 'time-label';
    label.textContent = hour;

    const input = document.createElement('input');
    input.className = 'task-input';
    input.type = 'text';
    input.value = localStorage.getItem(hour) || '';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => {
        localStorage.setItem(hour, input.value);
        alert('Task saved!');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        input.value = '';
        localStorage.removeItem(hour);
    });

    timeSlot.appendChild(label);
    timeSlot.appendChild(input);
    timeSlot.appendChild(saveBtn);
    timeSlot.appendChild(deleteBtn);
    planner.appendChild(timeSlot);
});

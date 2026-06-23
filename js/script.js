// =======================================================
// FEATURE 1: ACADEMIC PLANNER LOGIC
// =======================================================

// 1. Array to hold our tasks in memory
let tasks = [
    { text: "COS 101: Introduction to Computer Science", completed: false },
    { text: "MTH 101: Elementary Mathematics I", completed: false }
];

// 2. Grab DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// 3. Function to render tasks from the array to the screen
function renderTasks() {
    if (!taskList) return; // Safety check
    
    // Clear out the current visual list so we don't duplicate items
    taskList.innerHTML = '';
    
    // Loop through the array and build the HTML for each task
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        //Create a wrapper div to match your clean card styling
        const taskContent = document.createElement('div');
        taskContent.className = 'task-item-container';
        
        // Create the completion checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        
        // Create the task text span
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = " " + task.text;
        
        // Apply completion styling if checked
        if (task.completed) {
            li.className = 'completed';
            li.style.textDecoration = 'line-through';
            li.style.color = '#888';
        }
        //Create a delete button for each task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-task-btn';
        deleteBtn.style.marginLeft = 'auto'; // Pushes the button to the far right
        deleteBtn.style.backgroundColor = 'none';
        deleteBtn.style.border = 'none';
        deleteBtn.style.cursor = 'pointer';
        
        // Toggle completion state when checkbox changes
        checkbox.addEventListener('change', () => {
            tasks[index].completed = checkbox.checked;
            renderTasks(); // Re-render list to apply visual styles
        });

        // Delete item logic when Delete button is clicked
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1); // Remove the task from the array
            renderTasks();          //Refresh the display immediately
        });
        
        // Assemble elements
        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskTextSpan);
        taskContent.appendChild(deleteBtn);
        
        li.appendChild(taskContent);
        taskList.appendChild(li);
    });
}

// 4. Listen for the "Add Task" button click
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text: text, completed: false });
            taskInput.value = ''; // Clear the input field
            renderTasks(); // Redraw list with new task
        }
    });
}
// 5. Initial render when page loads
if (taskList) {    
  renderTasks();
}
// =======================================================
// SYSTEM UTILITIES & DATA VALIDATION EXTENSIONS
// =======================================================

function validateTaskInputString(inputRaw) {
    if (!inputRaw || inputRaw.length > 100) {
        console.warn("System Warning: Invalid string limits.");
        return false;
    }
    return true;
}

function diagnosticTrackerLifecycleLog() {
    const systemTimestamp = new Date().toISOString();
    console.log(`[Diagnostic Log - ${systemTimestamp}] Portfolio state cleanly initialized.`);
}

// Safely execute the lifecycle check
diagnosticTrackerLifecycleLog();
// 6. Function to delete a task from the array
function deleteTask(index) {
    // Remove 1 item at the specific index
    tasks.splice(index, 1);
    renderTasks();
}

// 7. Event listeners for adding tasks
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', addTask);
    
    // Allow pressing 'Enter' key inside the input field to add task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}


// ==========================================
// FEATURE 2: CONTACT FORM VALIDATION LOGIC
// ==========================================

const contactForm = document.getElementById('contact-form');
const errorMessageDiv = document.getElementById('error-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        // Prevent the page from automatically reloading on submit
        event.preventDefault();

        // Get fresh values from inputs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Clear any old error messages
        errorMessageDiv.textContent = '';

        // Requirement 1: Ensure no field is empty
        if (!name || !email || !phone || !message) {
            errorMessageDiv.textContent = 'Error: All form fields are required.';
            return;
        }

        // Requirement 2: Validate Email format using a Regular Expression pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessageDiv.textContent = 'Error: Please enter a valid email address.';
            return;
        }

        // Requirement 3: Ensure phone number contains ONLY digits
        // We use a regular expression checking if it contains anything other than numbers 0-9
        const digitsOnlyPattern = /^[0-9]+$/;
        if (!digitsOnlyPattern.test(phone)) {
            errorMessageDiv.textContent = 'Error: Phone number must contain digits only.';
            return;
        }

        // If all validations pass cleanly
        errorMessageDiv.style.color = 'green';
        errorMessageDiv.textContent = 'Form submitted successfully!';
        
        // Reset the form fields
        contactForm.reset();
    });
}

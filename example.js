const inputbox = document.getElementById("input-box"); // Input box
const listContainer = document.getElementById("list-container"); // List container

// Add task function
function addTask() {
  const taskValue = inputbox.value.trim(); // Trim the input value to remove any leading/trailing spaces

  if (taskValue === "") {
    alert("Please write something!"); // Alert if input is empty or only contains spaces
  } else {
    let li = document.createElement("li"); // Create a new list item

    // Add the input task as the list item text
    let taskText = document.createElement("span");
    taskText.textContent = taskValue; // Use trimmed input value
    taskText.classList.add("task-text");
    li.appendChild(taskText);

    // Create a "mark as done" button
    let doneButton = document.createElement("button");
    doneButton.textContent = "Mark as Done";
    doneButton.classList.add("done-button");
    li.appendChild(doneButton);

    // Create an "edit" button
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    li.appendChild(editButton);

    // Create a "remove" button
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    li.appendChild(removeButton);

    listContainer.appendChild(li); // Append the new list item to the list
  }

  inputbox.value = ""; // Clear input box
  saveData();
}

// Event delegation for marking as done, editing, and removing tasks
listContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("done-button")) {
    // Toggle the "checked" class for completed tasks
    e.target.parentElement
      .querySelector(".task-text")
      .classList.toggle("checked");
  } else if (e.target.classList.contains("edit-button")) {
    // Edit the task by prompting a new value
    let taskText = e.target.parentElement.querySelector(".task-text");
    let newTask = prompt("Edit your task:", taskText.textContent);
    if (newTask !== null && newTask.trim() !== "") {
      taskText.textContent = newTask;
    }
  } else if (e.target.classList.contains("remove-button")) {
    // Remove the task
    e.target.parentElement.remove();
  }
  saveData();
});

// Save list data to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load list data from local storage
function showList() {
  listContainer.innerHTML = localStorage.getItem("data");
}

// Call function to display list items stored in local storage
showList();

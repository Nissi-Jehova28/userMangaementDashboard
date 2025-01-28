let addUserBtn = document.getElementById("addUserBtn");
let formContainer = document.getElementById("formContainer");
let userForm = document.getElementById("userForm");
let saveBtnElement = document.getElementById("saveBtn");
let messageContainerElement = document.getElementById("messageContainer");
let usersContainerElement = document.getElementById("usersContainer");
let userContainer2 = document.getElementById("userContainer2");  // Get the container where the user cards will be added

//fetching each user and sending to display function 
let users = [];
async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await response.json();
    for (let user of users) {
        displayUsers(user);
        createUserCard(user);
    }
}
fetchUsers();

function createUserCard(user) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Create and append the Id label and paragraph
    const idDiv = document.createElement('div');
    idDiv.classList.add('user-item');
    const idLabel = document.createElement('label');
    idLabel.setAttribute('for', 'userId');
    idLabel.textContent = 'Id:';
    const idP = document.createElement('p');
    idP.id = 'userId';
    idP.textContent = user.id;
    idDiv.appendChild(idLabel);
    idDiv.appendChild(idP);
    card.appendChild(idDiv);
    
    // Create and append the Name label and paragraph
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('user-item');
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name-1');
    nameLabel.textContent = 'Name:';
    const nameP = document.createElement('p');
    nameP.id = 'name-1';
    nameP.textContent = user.name;
    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameP);
    card.appendChild(nameDiv);
    
    // Create and append the Email label and paragraph
    const emailDiv = document.createElement('div');
    emailDiv.classList.add('user-item');
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email-1');
    emailLabel.textContent = 'Email:';
    const emailP = document.createElement('p');
    emailP.id = 'email-1';
    emailP.textContent = user.email;
    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailP);
    card.appendChild(emailDiv);
    
    // Create and append the Username label and paragraph
    const userNameDiv = document.createElement('div');
    userNameDiv.classList.add('user-item');
    const userNameLabel = document.createElement('label');
    userNameLabel.setAttribute('for', 'userName-1');
    userNameLabel.textContent = 'User:';
    const userNameP = document.createElement('p');
    userNameP.id = 'userName-1';
    userNameP.textContent = user.username;
    userNameDiv.appendChild(userNameLabel);
    userNameDiv.appendChild(userNameP);
    card.appendChild(userNameDiv);
    
    // Create and append the buttons (Edit, Delete)
    const buttonDiv = document.createElement('div');
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-info','btn-outline-info');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger','btn-outline-danger');
    deleteButton.textContent = 'Delete';

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    card.appendChild(buttonDiv);
    
    // Append the card to the user container
    userContainer2.appendChild(card);
    
    editButton.onclick = function() {
        onEditTodo(user,card);
    };

    deleteButton.onclick = function() {
        onDeleteTodo(user, card);
    };
    
}

// Toggle form visibility when the "Add New User" button is clicked
addUserBtn.onclick = function() {
    if (formContainer.style.display === "none" || formContainer.style.display === "") {
        formContainer.style.display = "block"; // Show the form
        addUserBtn.style.display = "none";
    } else {
        formContainer.style.display = "none"; // Hide the form
    }
}

//sening Response when new user is added and saved when save button is clicked!
userForm.onsubmit = function(event) {
    event.preventDefault(); // Prevent page reload

    // Collecting the form data
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("userName").value;

    // Create user object
    let newUser = {
        name: `${firstName} ${lastName}`,
        email: email,
        user: username,
    };

    // Send POST request to JSONPlaceholder
    fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("User added:", data);
            displayMessage('User added successfully!', 'success');
            formContainer.style.display = "none"; // Hide the form
            addUserBtn.style.display = "block"; // Show the "Add New User" button
            userForm.reset(); // Reset the form
        })
        .catch((error) => console.error("Error adding user:", error));
};

function displayMessage(message, type) {
    messageContainerElement.textContent = message;
    messageContainerElement.className = type; // Use classes 'success' or 'error' for styling
    setTimeout(() => {
        messageContainerElement.textContent = '';
        messageContainerElement.className = '';
    }, 8000);
}


//function to view the the users list
function displayUsers(user) {
    let container = document.createElement("div");
    container.className = "header-row-2";
    usersContainerElement.appendChild(container);


    let iDItem = document.createElement("li");
    iDItem.textContent = user.id;
    iDItem.className = "list-style";
    container.appendChild(iDItem);

    let nameItem = document.createElement("li");
    nameItem.textContent = user.name;
    nameItem.className = "list-style";
    container.appendChild(nameItem);

    let emailItem = document.createElement("li");
    emailItem.textContent = user.email;
    emailItem.className = "list-style";
    container.appendChild(emailItem);

    let usernameItem = document.createElement("li");
    usernameItem.textContent = user.username;
    usernameItem.className = "list-style";
    container.appendChild(usernameItem);

    // Store references to the li elements in the container
    container.nameItem = nameItem;
    container.emailItem = emailItem;
    container.usernameItem = usernameItem;

    let iconsContainer = document.createElement("div");
    container.appendChild(iconsContainer);
    let editIcon = document.createElement("i");
    editIcon.classList.add("bi", "bi-pencil-square", "icons-style", "edit-icon");
    iconsContainer.appendChild(editIcon);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("bi", "bi-trash3-fill", "delete-icon", "icons-style");
    iconsContainer.appendChild(deleteIcon);

    editIcon.onclick = function() {
        onEditTodo(user,container);
    };

    deleteIcon.onclick = function() {
        onDeleteTodo(user, container);
    };

}

function onEditTodo(user, container) {
    // Showing the form
    formContainer.style.display = "block";
    addUserBtn.style.display = "none";

    // Pre-filling form with user's data
    const [firstName, lastName] = user.name.split(' ');
    document.getElementById("firstName").value = firstName || "";
    document.getElementById("lastName").value = lastName || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("userName").value = user.username || "";

    // Update form submission for editing
    userForm.onsubmit = function(event) {
        event.preventDefault(); // Prevent page reload

        // Collecting updated data
        const updatedUser = {
            ...user,
            name: `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`,
            email: document.getElementById("email").value,
            username: document.getElementById("userName").value,
        };

        // Sending PUT request to update the user
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("User updated:", data);
                displayMessage('User updated successfully!', 'success');
                formContainer.style.display = "none";
                addUserBtn.style.display = "block";
                userForm.reset();

                // Directly update the stored list item references
                container.nameItem.textContent = updatedUser.name;
                container.emailItem.textContent = updatedUser.email;
                container.usernameItem.textContent = updatedUser.username;
            })
            .catch((error) => console.error("Error updating user:", error));
    };
}

function onDeleteTodo(user, userRow) {
    // Confirm deletion
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        // Simulate DELETE request to the API
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                method: "DELETE",
            })
            .then((response) => {
                if (response.ok) {
                    userRow.remove(); // Remove the row directly
                    displayMessage("User deleted successfully!", "success");
                } else {
                    displayMessage("Error deleting user.", "error");
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                displayMessage("Error deleting user.", "error");
            });
    }
}


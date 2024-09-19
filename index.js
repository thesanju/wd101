// DOM element references
const userForm = document.getElementById("form");
const tableBody = document.querySelector("#entriesTableBody");
const nameValidation = document.getElementById("name");
const passwordValidation = document.getElementById("password");
const dobValidation = document.getElementById("dob");
const acceptTermsCheckbox = document.getElementById("Accept");

// Retrieve entries from local storage
const retrieveEntries = () => {
    const entries = localStorage.getItem("userentries");
    return entries ? JSON.parse(entries) : [];
};

// Display entries in the table
const displayEntries = () => {
    const entries = retrieveEntries();
    tableBody.innerHTML = entries.map(entry => `
        <tr>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptTerms ? 'Yes' : 'No'}</td>
        </tr>
    `).join('');
};

// Validate date of birth
const validateDob = () => {
    const dobValue = new Date(dobValidation.value);
    const today = new Date();
    let age = today.getFullYear() - dobValue.getFullYear();
    const isBeforeBirthday = (today.getMonth() < dobValue.getMonth()) || 
                             (today.getMonth() === dobValue.getMonth() && today.getDate() < dobValue.getDate());

    if (isBeforeBirthday) {
        age--;
    }

    if (isNaN(age)) {
        dobValidation.setCustomValidity("Please enter a valid date of birth.");
    } else if (age < 18 || age > 55) {
        dobValidation.setCustomValidity("You must be between 18 and 55 years old.");
    } else {
        dobValidation.setCustomValidity("");
    }
};

// Validate password length
const validatePassword = () => {
    const passwordLength = passwordValidation.value.length;
    if (passwordLength < 8) {
        passwordValidation.setCustomValidity("Password must be at least 8 characters!");
    } else {
        passwordValidation.setCustomValidity("");
    }
};

// Save form data
const saveUserForm = (event) => {
    event.preventDefault();
    
    if (!passwordValidation.checkValidity() || !nameValidation.checkValidity() || !dobValidation.checkValidity()) {
        return;
    }

    const entry = {
        name: nameValidation.value,
        email: document.getElementById("email").value,
        password: passwordValidation.value,
        dob: dobValidation.value,
        acceptTerms: acceptTermsCheckbox.checked,
    };

    const userEntries = retrieveEntries();
    userEntries.push(entry);
    localStorage.setItem("userentries", JSON.stringify(userEntries));

    displayEntries();
    userForm.reset();
};

// Event listeners
document.addEventListener("DOMContentLoaded", displayEntries);
userForm.addEventListener("submit", saveUserForm);
dobValidation.addEventListener('input', validateDob);
passwordValidation.addEventListener('input', validatePassword);

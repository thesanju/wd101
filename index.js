// DOM element references
const userForm = document.getElementById("form");
const tableBody = document.querySelector("#entriesTableBody");

// For validation purposes
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

    tableBody.innerHTML = ""; // Clear existing rows

    // Add table rows for each entry
    entries.forEach(entry => {
        const row = `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.acceptTerms ? 'Yes' : 'No'}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
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

    // Check validity of form fields
    if (!passwordValidation.checkValidity() || !nameValidation.checkValidity() || !dobValidation.checkValidity()) {
        return; // Don't save if there are validation errors
    }

    // Create a new entry object
    const entry = {
        name: nameValidation.value,
        email: document.getElementById("email").value,
        password: passwordValidation.value,
        dob: dobValidation.value,
        acceptTerms: acceptTermsCheckbox.checked,
    };

    // Retrieve current entries from localStorage and add the new entry
    const userEntries = retrieveEntries();
    userEntries.push(entry);
    localStorage.setItem("userentries", JSON.stringify(userEntries));

    // Display entries immediately and reset the form
    displayEntries();
    userForm.reset();
};

// Event listeners
document.addEventListener("DOMContentLoaded", displayEntries);
userForm.addEventListener("submit", saveUserForm);
dobValidation.addEventListener('input', validateDob);
passwordValidation.addEventListener('input', validatePassword);

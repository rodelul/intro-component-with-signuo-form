document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    validateForm(); // Validate the form when submitting
});

// Validate on blur (when the user clicks out of an input field)
document.querySelectorAll('input').forEach(inputElement => {
    inputElement.addEventListener('blur', () => {
        validateField(inputElement); // Validate the field when it loses focus
    });
});

// Function to validate the entire form
function validateForm() {
    const firstNameInput = document.querySelector('input[name="f-name"]');
    const lastNameInput = document.querySelector('input[name="l-name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="psw"]');

    validateField(firstNameInput);
    validateField(lastNameInput);
    validateField(emailInput);
    validateField(passwordInput);
}

// Function to validate a specific field
function validateField(inputElement) {
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const fieldName = inputElement.getAttribute('placeholder').split(' ')[0];

    if (inputElement.name === 'email') {
        // Validate email
        if (!validateEmail(inputElement.value.trim())) {
            showValidationMessage(inputElement, 'Looks like this is not an email', 'red');
        } else {
            clearValidationMessage(inputElement);
        }
    } else {
        // Validate other fields
        if (inputElement.value.trim() === '') {
            showValidationMessage(inputElement, `${fieldName} cannot be empty`, 'red');
        } else {
            clearValidationMessage(inputElement);
        }
    }
}

// Function to show a validation message
function showValidationMessage(inputElement, message, color) {
    // Remove any existing validation message
    const existingMessage = inputElement.nextElementSibling;
    if (existingMessage && existingMessage.classList.contains('validation-message')) {
        existingMessage.remove();
    }

    // Create a new element for the validation message
    const validationMessage = document.createElement('p');
    validationMessage.classList.add('validation-message');
    validationMessage.textContent = message;
    validationMessage.style.color = color;

    // Apply the border color and insert the validation message
    inputElement.style.borderColor = color;
    inputElement.insertAdjacentElement('afterend', validationMessage);
}

// Function to clear the validation message
function clearValidationMessage(inputElement) {
    // Remove any existing validation message
    const existingMessage = inputElement.nextElementSibling;
    if (existingMessage && existingMessage.classList.contains('validation-message')) {
        existingMessage.remove();
    }

    // Reset the border color
    inputElement.style.borderColor = '';
}

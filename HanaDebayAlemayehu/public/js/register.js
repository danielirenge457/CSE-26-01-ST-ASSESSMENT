const form = document.getElementById('registerForm');
const successMessage = document.getElementById('successMessage');

// --- HELPERS ---
const setError = (element, message) => {
    element.classList.remove('valid');
    element.classList.add('invalid');
    const errorDisplay = element.parentElement.querySelector('.error-message') || element.nextElementSibling;
    if (errorDisplay) {
        errorDisplay.innerText = message;
        errorDisplay.style.display = 'block';
    }
};

const setSuccess = (element) => {
    element.classList.remove('invalid');
    element.classList.add('valid');
    const errorDisplay = element.parentElement.querySelector('.error-message') || element.nextElementSibling;
    if (errorDisplay) {
        errorDisplay.innerText = '';
        errorDisplay.style.display = 'none';
    }
};

const clearValidation = (element) => {
    element.classList.remove('valid', 'invalid');
    const errorDisplay = element.parentElement.querySelector('.error-message') || element.nextElementSibling;
    if (errorDisplay) {
        errorDisplay.innerText = '';
        errorDisplay.style.display = 'none';
    }
}

// --- VALIDATION LOGIC ---
const validateInputs = () => {
    let isValid = true;
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const dob = document.getElementById('dob');
    const birthPlace = document.getElementById('birthPlace');
    const genderBox = document.querySelector('.gender-box');
    const genderChecked = document.querySelector('input[name="gender"]:checked');
    const nationality = document.getElementById('nationality');
    const marital = document.getElementById('marital');
    const camp = document.getElementById('camp');
    const joinDate = document.getElementById('joinDate');

    // First Name
    if (firstName.value.trim() === '') {
        setError(firstName, 'This field is required');
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        setError(firstName, 'Invalid field: must be at least 2 characters');
        isValid = false;
    } else {
        setSuccess(firstName);
    }

    // Last Name
    if (lastName.value.trim() === '') {
        setError(lastName, 'This field is required');
        isValid = false;
    } else if (lastName.value.trim().length < 2) {
        setError(lastName, 'Invalid field: must be at least 2 characters');
        isValid = false;
    } else {
        setSuccess(lastName);
    }

    // Date of Birth
    const dobValue = new Date(dob.value);
    if (dob.value === '') {
        setError(dob, 'This field is required');
        isValid = false;
    } else if (dobValue >= new Date()) {
        setError(dob, 'Invalid field: date cannot be in the future');
        isValid = false;
    } else {
        setSuccess(dob);
    }

    // Place of Birth
    if (birthPlace.value.trim() === '') {
        setError(birthPlace, 'This field is required');
        isValid = false;
    } else if (birthPlace.value.trim().length < 2) {
        setError(birthPlace, 'Invalid field: must be at least 2 characters');
        isValid = false;
    } else {
        setSuccess(birthPlace);
    }

    // Gender
    if (!genderChecked) {
        setError(genderBox, 'This field is required');
        isValid = false;
    } else {
        setSuccess(genderBox);
    }

    // Nationality
    if (nationality.value === '') {
        setError(nationality, 'This field is required');
        isValid = false;
    } else {
        setSuccess(nationality);
    }

    // Marital Status
    if (marital.value === '') {
        setError(marital, 'This field is required');
        isValid = false;
    } else {
        setSuccess(marital);
    }

    // Settlement Camp
    if (camp.value === '') {
        setError(camp, 'This field is required');
        isValid = false;
    } else {
        setSuccess(camp);
    }

    // Date of Joining
    const joinDateValue = new Date(joinDate.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (joinDate.value === '') {
        setError(joinDate, 'This field is required');
        isValid = false;
    } else if (joinDateValue > today) {
        setError(joinDate, 'Invalid field: date cannot be in the future');
        isValid = false;
    } else if (dob.value !== '' && joinDateValue <= dobValue) {
        setError(joinDate, 'Invalid field: must be after date of birth');
        isValid = false;
    } else {
        setSuccess(joinDate);
    }

    return isValid;
};


// --- FORM SUBMISSION ---
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successMessage.style.display = 'none'; // Hide previous success message

    if (validateInputs()) {
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            dateOfBirth: document.getElementById('dob').value,
            placeOfBirth: document.getElementById('birthPlace').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            nationality: document.getElementById('nationality').value,
            maritalStatus: document.getElementById('marital').value,
            settlementCamp: document.getElementById('camp').value,
            dateOfJoining: document.getElementById('joinDate').value,
        };

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            // Read the response body as text first to avoid "body stream already read" error
            const responseText = await response.text();
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (err) {
                // If JSON parsing fails, it's likely an HTML error page from the server.
                // We throw an error with the text content to make debugging easier.
                throw new Error(`Server error (${response.status}): ${responseText.substring(0, 100)}...`);
            }

            if (response.ok) {
                successMessage.innerText = 'Beneficiary registered successfully';
                successMessage.style.display = 'block';
                form.reset();
                const fields = form.querySelectorAll('input, select, .gender-box');
                fields.forEach(field => clearValidation(field));
                window.scrollTo(0, 0);
            } else {
                if (response.status === 400 && result.errors) {
                    const errorMsg = Object.values(result.errors).join('\n');
                    alert(`Validation Failed:\n${errorMsg}`);
                } else {
                    alert(`Registration failed: ${result.message || 'An unknown error occurred.'}`);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Error: ${error.message}`);
        }
    }
});

// Handle register button click on landing page
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    window.location.href = "registerForm.html";
  });
}

// Handle registration form submission
const form = document.querySelector(".formLayout");
const successAlert = document.getElementById("successAlert");
const closeAlert = document.getElementById("closeAlert");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Collect form data
    const formData = {
      firstName: document.getElementById("fname").value.trim(),
      lastName: document.getElementById("lname").value.trim(),
      dateOfBirth: document.getElementById("dateOB").value,
      placeOfBirth: document.getElementById("placeOB").value.trim(),
      gender: document.querySelector('input[name="gender"]:checked')?.value,
      nationality: document.getElementById("nationality").value,
      maritalStatus: document.getElementById("MaritalStatus").value,
      settlementCamp: document.getElementById("settlementCamp").value,
      dateOfJoining: document.getElementById("dateOfJoining").value,
    };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        showSuccess();
        form.reset();
        clearErrors(); // Also clear border colors on success
      } else {
        alert("Registration failed: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

function validateForm() {
  let isValid = true;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const firstName = document.getElementById("fname");
  if (!firstName.value.trim() || firstName.value.trim().length < 2) {
    setError(firstName);
    isValid = false;
  } else {
    clearError(firstName);
  }

  const lastName = document.getElementById("lname");
  if (!lastName.value.trim() || lastName.value.trim().length < 2) {
    setError(lastName);
    isValid = false;
  } else {
    clearError(lastName);
  }

  const placeOfBirth = document.getElementById("placeOB");
  if (!placeOfBirth.value.trim() || placeOfBirth.value.trim().length < 2) {
    setError(placeOfBirth);
    isValid = false;
  } else {
    clearError(placeOfBirth);
  }

  // Date of birth must be before date of registration (today)
  const dateOfBirthInput = document.getElementById("dateOB");
  const dob = new Date(dateOfBirthInput.value);
  if (!dateOfBirthInput.value || isNaN(dob.getTime()) || dob >= today) {
    setError(dateOfBirthInput);
    isValid = false;
  } else {
    clearError(dateOfBirthInput);
  }

  const nationality = document.getElementById("nationality");
  if (!nationality.value) {
    setError(nationality);
    isValid = false;
  } else {
    clearError(nationality);
  }

  const maritalStatus = document.getElementById("MaritalStatus");
  if (!maritalStatus.value) {
    setError(maritalStatus);
    isValid = false;
  } else {
    clearError(maritalStatus);
  }

  const settlementCamp = document.getElementById("settlementCamp");
  if (!settlementCamp.value) {
    setError(settlementCamp);
    isValid = false;
  } else {
    clearError(settlementCamp);
  }

  // Date of joining settlement camp must be after date of registration (today)
  const dateOfJoiningInput = document.getElementById("dateOfJoining");
  const doj = new Date(dateOfJoiningInput.value);
  if (!dateOfJoiningInput.value || isNaN(doj.getTime()) || doj <= today) {
    setError(dateOfJoiningInput);
    isValid = false;
  } else {
    clearError(dateOfJoiningInput);
  }

  return isValid;
}

function setError(element) {
  element.classList.add("error");
  element.style.borderColor = "#dc3545";
}

function clearError(element) {
  element.classList.remove("error");
  element.style.borderColor = "#ccc";
}

function clearErrors() {
  const inputs = form.querySelectorAll("input, select");
  inputs.forEach((input) => clearError(input));
}

function showSuccess() {
  successAlert.style.display = "block";
}

if (closeAlert) {
  closeAlert.addEventListener("click", () => {
    successAlert.style.display = "none";
    form.reset();
    clearErrors();
  });
}
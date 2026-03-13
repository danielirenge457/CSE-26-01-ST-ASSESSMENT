function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

function isAtLeastTwoChars(value) {
  return normalizeText(value).length >= 2;
}

function parseDateOrNull(value) {
  const v = normalizeText(value);
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}

function setFieldError(fieldEl, message) {
  if (!fieldEl) return;
  const field = fieldEl.closest(".field");
  if (!field) return;
  field.classList.add("invalid");
  const target = field.querySelector(".error");
  if (target) target.textContent = message || "";
}

function clearFieldError(fieldEl) {
  if (!fieldEl) return;
  const field = fieldEl.closest(".field");
  if (!field) return;
  field.classList.remove("invalid");
  const target = field.querySelector(".error");
  if (target) target.textContent = "";
}

function clearAllErrors(formEl) {
  $all(".field", formEl).forEach((field) => field.classList.remove("invalid"));
  $all(".error", formEl).forEach((err) => (err.textContent = ""));
}

function resetToDefaults(formEl) {
  formEl.reset();
  clearAllErrors(formEl);

  const female = formEl.querySelector('input[name="gender"][value="Female"]');
  if (female) female.checked = true;
}

function getSelectedGender(formEl) {
  const checked = formEl.querySelector('input[name="gender"]:checked');
  return checked ? checked.value : "";
}

function validateForm(formEl) {
  const firstName = $("#firstName", formEl);
  const lastName = $("#lastName", formEl);
  const placeOfBirth = $("#placeOfBirth", formEl);
  const dob = $("#dateOfBirth", formEl);
  const reg = $("#dateOfRegistration", formEl);
  const join = $("#dateOfJoining", formEl);

  const values = {
    firstName: normalizeText(firstName.value),
    lastName: normalizeText(lastName.value),
    placeOfBirth: normalizeText(placeOfBirth.value),
    dateOfBirth: dob.value,
    dateOfRegistration: reg.value,
    dateOfJoining: join.value,
    nationality: $("#nationality", formEl).value,
    maritalStatus: $("#maritalStatus", formEl).value,
    settlementCamp: $("#settlementCamp", formEl).value,
    gender: getSelectedGender(formEl),
  };

  clearAllErrors(formEl);
  let ok = true;

  // Required text fields (>= 2 chars)
  if (!isAtLeastTwoChars(values.firstName)) {
    ok = false;
    setFieldError(firstName, "First name is required (min 2 characters).");
  }
  if (!isAtLeastTwoChars(values.lastName)) {
    ok = false;
    setFieldError(lastName, "Last name is required (min 2 characters).");
  }
  if (!isAtLeastTwoChars(values.placeOfBirth)) {
    ok = false;
    setFieldError(placeOfBirth, "Place of birth is required (min 2 characters).");
  }

  // Required date fields
  if (!values.dateOfBirth) {
    ok = false;
    setFieldError(dob, "Date of birth is required.");
  }
  if (!values.dateOfRegistration) {
    ok = false;
    setFieldError(reg, "Date of registration is required.");
  }
  if (!values.dateOfJoining) {
    ok = false;
    setFieldError(join, "Date of joining is required.");
  }

  // Required select fields
  if (!values.nationality) {
    ok = false;
    setFieldError($("#nationality", formEl), "Nationality is required.");
  }
  if (!values.maritalStatus) {
    ok = false;
    setFieldError($("#maritalStatus", formEl), "Marital status is required.");
  }
  if (!values.settlementCamp) {
    ok = false;
    setFieldError($("#settlementCamp", formEl), "Settlement camp is required.");
  }

  // Required gender selection
  if (!values.gender) {
    ok = false;
    setFieldError($('input[name="gender"]', formEl), "Gender is required.");
  }

  // Date validation rules
  const dobDate = parseDateOrNull(values.dateOfBirth);
  const regDate = parseDateOrNull(values.dateOfRegistration);
  const joinDate = parseDateOrNull(values.dateOfJoining);

  // Rule: Date of birth must be before date of registration.
  if (dobDate && regDate) {
    if (!(dobDate.getTime() < regDate.getTime())) {
      ok = false;
      setFieldError(dob, "Date of birth must be before date of registration.");
      setFieldError(reg, "Date of registration must be after date of birth.");
    }
  }

  // Rule: Date of joining settlement camp must be after date of registration.
  if (joinDate && regDate) {
    if (!(joinDate.getTime() > regDate.getTime())) {
      ok = false;
      setFieldError(join, "Date of joining must be after date of registration.");
      setFieldError(reg, "Date of registration must be before date of joining.");
    }
  }

  // If any field is empty or invalid => do not submit (already enforced by above rules).
  // Selects are allowed to remain empty (rules only specify options), so no required checks here.

  return { ok, values };
}

function showSuccessAlert() {
  const alert = $("#successAlert");
  if (alert) {
    alert.hidden = false;
    alert.style.display = "flex"; // Ensure it's visible
    alert.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log("Success alert shown"); // Debug log
  }
}

function hideSuccessAlert() {
  const alert = $("#successAlert");
  if (alert) {
    alert.hidden = true;
    alert.style.display = "none"; // Ensure it's hidden
  }
}

function bindLiveValidation(formEl) {
  const liveTargets = [
    "#firstName",
    "#lastName",
    "#placeOfBirth",
    "#dateOfBirth",
    "#dateOfRegistration",
    "#dateOfJoining",
    "#nationality",
    "#maritalStatus",
    "#settlementCamp",
    'input[name="gender"]',
  ];

  liveTargets.forEach((sel) => {
    $all(sel, formEl).forEach((el) => {
      el.addEventListener("input", () => clearFieldError(el));
      el.addEventListener("change", () => clearFieldError(el));
      el.addEventListener("blur", () => {
        // Re-run full validation to enforce date comparisons
        validateForm(formEl);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (location.protocol === "file:") {
    alert(
      "Please open this form via http://localhost:3000/register.html (run `node server.js` in the project folder)."
    );
    return;
  }

  const form = $("#beneficiaryForm");
  if (!form) {
    return;
  }

  const resetBtn = $("#resetBtn");
  const closeAlertBtn = $("#closeAlertBtn");

  resetToDefaults(form);
  hideSuccessAlert();
  bindLiveValidation(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { ok, values } = validateForm(form);
    if (!ok) return;

    console.log("Submitting beneficiary", values);

    // Always send data to the backend server on port 3000, even if this page is served from a different port.
    const apiBase = window.location.port === "3000" ? "" : "http://localhost:3000";

    try {
      const response = await fetch(`${apiBase}/beneficiaries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      let result;
      try {
        result = await response.json();
      } catch (parseErr) {
        result = null;
      }

      if (response.ok) {
        showSuccessAlert();
        resetToDefaults(form);
      } else {
        console.error("Save failed", response.status, result);
        const msg = (result && result.message) ? result.message : response.statusText;
        alert("Error saving beneficiary: " + msg);
      }
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Error saving beneficiary: " + (err.message || err));
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      hideSuccessAlert();
      resetToDefaults(form);
    });
  }

  if (closeAlertBtn) {
    closeAlertBtn.addEventListener("click", () => {
      hideSuccessAlert();
      // On closing success alert: form and all fields resets to default.
      resetToDefaults(form);
    });
  }
});
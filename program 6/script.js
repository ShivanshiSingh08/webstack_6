document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const fullName = document.getElementById("full-name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const dob = document.getElementById("dob");
    const ageDisplay = document.getElementById("age");
    const submitButton = document.getElementById("submit-button");

    // Regular expressions for validation
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Function to check if a field is valid
    function isValid(input, regex) {
        return regex.test(input.value);
    }

    // Function to update the validation status in real-time
    function updateValidationStatus(input, regex) {
        if (isValid(input, regex)) {
            input.classList.remove("error");
            input.classList.add("success");
        } else {
            input.classList.remove("success");
            input.classList.add("error");
        }
    }

    // Function to check if passwords match
    function passwordsMatch() {
        return password.value === confirmPassword.value;
    }

    // Function to calculate age
    function calculateAge(inputDate) {
        const dobArray = inputDate.split("-");
        const userDate = new Date(dobArray[0], dobArray[1] - 1, dobArray[2]);
        const today = new Date();
        const age = today.getFullYear() - userDate.getFullYear();

        if (today < new Date(today.getFullYear(), userDate.getMonth(), userDate.getDate())) {
            return age - 1;
        }
        return age;
    }

    // Event listener for real-time validation
    fullName.addEventListener("input", () => {
        updateValidationStatus(fullName, nameRegex);
    });

    email.addEventListener("input", () => {
        updateValidationStatus(email, emailRegex);
    });

    password.addEventListener("input", () => {
        updateValidationStatus(password, passwordRegex);
        if (confirmPassword.value !== "") {
            updateValidationStatus(confirmPassword, passwordRegex);
        }
    });

    confirmPassword.addEventListener("input", () => {
        updateValidationStatus(confirmPassword, passwordRegex);
    });

    dob.addEventListener("input", () => {
        if (isValid(dob, /^(\d{4})-(\d{2})-(\d{2})$/)) {
            const age = calculateAge(dob.value);
            if (age < 18) {
                dob.classList.remove("success");
                dob.classList.add("error");
                submitButton.disabled = true;
            } else {
                dob.classList.remove("error");
                dob.classList.add("success");
                ageDisplay.innerText = `${age} years old`;
                submitButton.disabled = false;
            }
        } else {
            dob.classList.remove("success");
            dob.classList.add("error");
            submitButton.disabled = true;
        }
    });

    // Form submission handler
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Check all fields for validity before submitting
        const isFullNameValid = isValid(fullName, nameRegex);
        const isEmailValid = isValid(email, emailRegex);
        const isPasswordValid = isValid(password, passwordRegex);
        const isConfirmPasswordValid = isValid(confirmPassword, passwordRegex);
        const isDobValid = isValid(dob, /^(\d{4})-(\d{2})-(\d{2})$/);

        if (
            isFullNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isDobValid &&
            passwordsMatch()
        ) {
            // Form is valid, you can submit it here or perform other actions
            alert("Registration successful!");
        } else {
            alert("Form contains errors. Please check and correct.");
        }
    });
});



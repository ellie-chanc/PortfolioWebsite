const email = document.querySelector("#contact-form-email");

email.addEventListener("input", () => {
    const specialCharacters = /[?<>;]+/;
    
    if (specialCharacters.test(email.value)) {
        email.setCustomValidity("Cannot contain special characters.");
    } else if (email.validity.typeMismatch) {
        email.setCustomValidity("Invalid email address.");
    } else {
        email.setCustomValidity("");
    }
});
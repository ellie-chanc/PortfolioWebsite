import SpecialCharacterError from "../exceptions/special-character-exception.js";


validateContactForm();


function validateContactForm() {
    const contactFormInputs = document.forms["contact-form"].querySelectorAll("input, textarea");

    contactFormInputs.forEach((i) => {
        i.addEventListener("input", (event) => {
            alertSpecialCharacters(event.currentTarget);
        });
    });
}


function alertSpecialCharacters(element) {
    const specialCharacters = /[\\/:*?"<>|!$%=]+/;

    try {
        if (specialCharacters.test(element.value)) {
            throw new SpecialCharacterError;
        } else {
            element.setCustomValidity("");
        }
    } catch(err) {
        console.error(err.name);
        console.error(err.message);
        element.setCustomValidity("Cannot contain special characters.");
    }
}
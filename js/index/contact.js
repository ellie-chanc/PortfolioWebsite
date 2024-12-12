import SpecialCharacterError from "../exceptions/special-character-exception.js";


validateContactForm();
addMessageCharCounterListener();

function addMessageCharCounterListener() {
    const message = document.querySelector("#contact-form-message");
    const counter = document.querySelector("#contact-form-message-char-counter");

    message.addEventListener("keyup", () => {
        counter.innerText = `${message.value.length}/200`;
    });
}



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
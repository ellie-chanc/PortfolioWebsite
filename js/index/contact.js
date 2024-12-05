import SpecialCharacterError from "../exceptions/special-character-exception.js";

const contactFormInputs = document.querySelector("#contact-form").elements;
const specialCharacters = /[\/:*?"<>|!$%]+/;

for (let i = 0; i < contactFormInputs.length; i++) {
    contactFormInputs[i].addEventListener("input", (event) => {
        alertSpecialCharacters(event.currentTarget);
    });
}

function alertSpecialCharacters(element) {
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


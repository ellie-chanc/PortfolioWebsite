const contactFormInputs = document.querySelector("#contact-form").elements;
const specialCharacters = /[\/:*?"<>|]+/;

for (let i = 0; i < contactFormInputs.length; i++) {
    contactFormInputs[i].addEventListener("input", (event) => {    
        alertSpecialCharacters(event.currentTarget);
    });
}

function alertSpecialCharacters(element) {
    if (specialCharacters.test(element.value)) {
        element.setCustomValidity("Cannot contain special characters.");
    } else {
        element.setCustomValidity("");
    }
}
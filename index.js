const hamburger = document.querySelector("#hamburger");
const allLink = document.querySelectorAll(".top-nav-link");
const allProjectInfo = document.querySelectorAll(".project-info");
const allShowMoreBtn = document.querySelectorAll(".project-show-more");
let showMoreInfo = false;


hamburger.addEventListener("click", toggleMenu);


// collapse menu if a link is clicked
for (let i = 0; i < allLink.length; i++) {
    allLink[i].addEventListener("click", toggleMenu);
}

for (let i = 0; i < allShowMoreBtn.length; i++) {
    if ((allProjectInfo[i].innerText.length) > 50) {
        let originalProjectInfo = allProjectInfo[i].innerText;
        allShowMoreBtn[i].style.display = "inline-block";
        allShowMoreBtn[i].addEventListener("click", function(event) { toggleInfo(event, allProjectInfo[i], originalProjectInfo) });
    }
}


function toggleMenu() {
    hamburger.classList.toggle("active");
    for (let i = 0; i < allLink.length; i++) {
        allLink[i].classList.toggle("active");
    }
}


function toggleInfo(event, projectInfoElement, originalProjectInfo) {
    if (showMoreInfo === false) {
        projectInfoElement.innerText = originalProjectInfo;
        event.currentTarget.innerText = "Show Less";
        showMoreInfo = true;
    }
    else if (showMoreInfo === true) {
        projectInfoElement.innerText = projectInfoElement.innerText.substring(0, 50) + "... ";
        event.currentTarget.innerText = "Show More";
        showMoreInfo = false;
    }
}

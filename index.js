const hamburger = document.querySelector("#hamburger");
const allLink = document.querySelectorAll(".top-nav-link");
const allProjectInfo = document.querySelectorAll(".project-info");
const allShowMoreBtn = document.querySelectorAll(".project-show-more");
const allCourseCard = document.querySelectorAll(".course-card");
const courseBookmark = document.querySelector("#course-header .bookmark");


hamburger.addEventListener("click", toggleMenu);


// collapse menu if a link is clicked
for (let i = 0; i < allLink.length; i++) {
    allLink[i].addEventListener("click", toggleMenu);
}


// default show less project info
for (let i = 0; i < allShowMoreBtn.length; i++) {
    if ((allProjectInfo[i].innerText.length) > 50) {
        let originalProjectInfo = allProjectInfo[i].innerText;
        allProjectInfo[i].innerText = allProjectInfo[i].innerText.substring(0, 50) + "... ";
        allShowMoreBtn[i].style.display = "inline-block";
        allShowMoreBtn[i].classList.add("less");
        allShowMoreBtn[i].addEventListener("click", function(event) { toggleInfo(event, allProjectInfo[i], originalProjectInfo); });
    }
}


// The ondragover event specifies where the dragged data can be dropped.
// By default, data/elements cannot be dropped in other elements. 
// Prevent the default handling of the element to allow a drop.
courseBookmark.addEventListener("dragover", function(event) { event.preventDefault(); });


courseBookmark.addEventListener("drop", function(event) { 
    event.preventDefault();
    console.log(event.dataTransfer.getData("text/plain"));
});


for (let i = 0; i < allCourseCard.length; i++) {
    allCourseCard[i].addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", event.currentTarget.querySelector(".course-title").innerText); 
    })
}


function toggleMenu() {
    hamburger.classList.toggle("active");
    for (let i = 0; i < allLink.length; i++) {
        allLink[i].classList.toggle("active");
    }
}


function toggleInfo(event, infoElement, originalInfo) {
    if (event.currentTarget.classList.contains("less")) {
        infoElement.innerText = originalInfo;
        event.currentTarget.innerText = "Show Less";
        event.currentTarget.classList.remove("less")
    }
    else {
        infoElement.innerText = infoElement.innerText.substring(0, 50) + "... ";
        event.currentTarget.innerText = "Show More";
        event.currentTarget.classList.add("less");
    }
}

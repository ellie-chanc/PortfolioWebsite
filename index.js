const hamburger = document.querySelector("#hamburger");
const allLink = document.querySelectorAll(".top-nav-link");
const allProjectInfo = document.querySelectorAll(".project-info");


hamburger.addEventListener("click", toggleMenu);


// collapse menu if a link is clicked
for (let i = 0; i < allLink.length; i++) {
    allLink[i].addEventListener("click", toggleMenu);
}


for (let i = 0; i < allProjectInfo.length; i++) {
    if ((allProjectInfo[i].innerText.length) > 50) {
        let originalProjectInfo = allProjectInfo[i].innerText;
        allProjectInfo[i].innerText = allProjectInfo[i].innerText.substring(0, 50) + "... ";

        // add a show more button at the end
        let showMoreBtn = document.createElement("button");
        showMoreBtn.classList.add("project-show-more");
        showMoreBtn.innerText = "Show more";
        showMoreBtn.style.display = "inline-block";
        allProjectInfo[i].appendChild(showMoreBtn);

        showMoreBtn.addEventListener("click", () => { 
            allProjectInfo[i].innerText = originalProjectInfo; 
        });
    }
}


function toggleMenu() {
    hamburger.classList.toggle("active");
    for (let i = 0; i < allLink.length; i++) {
        allLink[i].classList.toggle("active");
    }
}

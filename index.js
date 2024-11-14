const hamburger = document.querySelector("#hamburger");
const allLink = document.querySelectorAll(".top-nav-link");

hamburger.addEventListener("click", activeMenu);

function activeMenu() {
    hamburger.classList.toggle("active");
    for (let i = 0; i < allLink.length; i++) {
        allLink[i].classList.toggle("active");
    }

    const activeLink = document.querySelectorAll(".top-nav-link.active")
    for (let i = 0; i < activeLink.length; i++) {
        activeLink[i].addEventListener("click", activeMenu);
    }
}
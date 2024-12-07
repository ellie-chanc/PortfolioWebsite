await getNavLinks();


const hamburger = document.querySelector(".hamburger");
const allLink = document.querySelectorAll(".top-nav-link");

hamburger.addEventListener("click", toggleMenu);

async function getNavLinks() {
    let navObj = {};
    try {
        const navRes = await fetch("./data/nav.json");
        navObj = await navRes.json();
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get project details");
        navObj = {};
    }

    const topNav = document.querySelector(".top-nav");

    for (let i = 0; i < Object.keys(navObj).length; i++) {
        let navLink = document.createElement("a");
        navLink.classList.add("top-nav-item", "top-nav-link");
        navLink.setAttribute("href", navObj[i+1]["nav-link"]);
        navLink.innerText = navObj[i+1]["nav-text"];
        navLink.addEventListener("click", toggleMenu);

        topNav.appendChild(navLink);
    }
}


function toggleMenu(event) {
    hamburger.classList.toggle("active");
    for (let i = 0; i < allLink.length; i++) {
        allLink[i].classList.toggle("active");
    }
}
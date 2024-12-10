getNavLinks();


async function getNavLinks() {
    const navLinksData = await getNavLinksData();
    generateNavLinksHtml(navLinksData);
    addToggleNavMenuListener();
}


async function getNavLinksData() {
    try {
        const navRes = await fetch("./data/nav.json");
        const navObj = await navRes.json();
        return navObj;
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get navigation links.");
        return {};
    }
}


function generateNavLinksHtml(navLinksData) {
    const topNav = document.querySelector(".top-nav");

    for (const i in navLinksData) {
        const navLink = `<a class="top-nav-item top-nav-link" href="${navLinksData[i]["nav-link"]}">${navLinksData[i]["nav-text"]}</a>`;
        topNav.innerHTML += navLink;
    }
}


function addToggleNavMenuListener() {
    const topNavItems = document.querySelectorAll(".top-nav-item");
    
    topNavItems.forEach((i) => {
        i.addEventListener("click", () => {
            topNavItems.forEach((j) => {
                j.classList.toggle("active");
            })
        })
    });
}
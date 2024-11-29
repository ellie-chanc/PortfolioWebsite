import { Octokit } from "https://esm.sh/@octokit/core";

const octokit = new Octokit({
    auth: ""
});


await getNavLinks();
await getProjects();
await getCourses();

const hamburger = document.querySelector("#hamburger");
const allLink = document.querySelectorAll(".top-nav-link");
const courseBookmark = document.querySelector(".bookmark-container");
const contactForm = document.querySelector("#contact-form");
let numberOfBookmark = 0;


// drag and frop for courses
courseBookmark.addEventListener("dragover", function (event) { event.preventDefault(); });


courseBookmark.addEventListener("drop", function (event) {
    event.preventDefault();
    numberOfBookmark++;
    let courseName = event.dataTransfer.getData("text/plain");
    sessionStorage.setItem(`course-name-${numberOfBookmark}`, courseName);
    console.log(sessionStorage.getItem(`course-name-${numberOfBookmark}`));
});


hamburger.addEventListener("click", toggleMenu);


async function getNavLinks() {
    let navRes = await fetch("data/nav.json");
    let navObj = await navRes.json();
    let topNav = document.querySelector("#top-nav");

    for (let i = 0; i < Object.keys(navObj).length; i++) {
        let navLink = document.createElement("a");
        navLink.classList.add("top-nav-item", "top-nav-link");
        navLink.setAttribute("href", navObj[i+1]["nav-link"]);
        navLink.innerText = navObj[i+1]["nav-text"];
        navLink.addEventListener("click", toggleMenu);


        topNav.appendChild(navLink);
    }
}


async function getProjects() {
    let projectListObj = {};
    try {
        let projectListRes = await fetch("data/project.json");
        projectListObj = await projectListRes.json();
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get project details");
        projectListObj = {};
    }

    let projectContainer = document.querySelector("#project-container");
    for (let i = 1; i <= Object.keys(projectListObj).length; i++) {
        let projectImg = `<img class="project-img card-img" src="${projectListObj[i]["img"]}" alt="${projectListObj[i]["title"]} Demo">`;
        let projectTitle = `<h2 class="project-title card-title">${projectListObj[i]["title"]}</h2>`;
        let projectInfo = ``;
        if (projectListObj[i]["info"].length > 50) {
            projectInfo = `<p class="project-info">${projectListObj[i]["info"].substring(0, 50)}... <a class="project-show-more hide">Show More</a></p>`;
        } else {
            projectInfo = `<p class="project-info">${projectListObj[i]["info"]}</p>`;
        }
        let projectGithubLink = "github-url" in projectListObj[i] ? `<a href="${projectListObj[i]["github-url"]}" target="_blank" class="project-github-link button">Go to Github <i class="project-github-icon fa-brands fa-github"></i></a>` : "";
        let projectCard = `<article class="project-card">${projectImg + projectTitle + projectInfo + projectGithubLink}</article>`;
        
        projectContainer.innerHTML += projectCard;
    }

    let projectCard = document.querySelectorAll(".project-card");
    for (let i = 0; i < projectCard.length; i++) {
        let projectShowMoreBtn = projectCard[i].querySelector(".project-show-more");
        if (projectShowMoreBtn) {
            projectShowMoreBtn.addEventListener("click", (event) => {
                if (event.currentTarget.classList.contains("hide")) {
                    projectCard[i].querySelector(".project-info").childNodes[0].nodeValue = projectListObj[i+1]["info"] + " ";;
                    projectShowMoreBtn.innerText = "Hide";
                    projectShowMoreBtn.classList.remove("hide")
                } else {
                    projectCard[i].querySelector(".project-info").childNodes[0].nodeValue = projectListObj[i+1]["info"].substring(0, 50) + "... ";
                    projectShowMoreBtn.innerText = "Show More";
                    projectShowMoreBtn.classList.add("hide");
                }
            });
        }
    }
}


async function getCourses() {
    let courseListObj = {};
    try {
        let courseListRes = await fetch("data/course.json");
        courseListObj = await courseListRes.json();
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get course details");
        courseListObj = {};
    }

    let courseContainer = document.querySelector("#course-container");
    for (let i = 1; i <= Object.keys(courseListObj).length; i++) {
        let courseTitle = `<h2 class="course-title card-title">${courseListObj[i]["title"]}</h2>`;
        let courseLink = `<a href="${courseListObj[i]["url"]}" target="_blank" class="course-link button">Go to course <i class="course-link-icon fa-solid fa-arrow-up-right-from-square"></i></a>`;
        let courseCard = `<article class="course-card" draggable="true">${courseTitle + courseLink}</article>`;
        
        courseContainer.innerHTML += courseCard;
    }
}


let courseCards = document.querySelectorAll(".course-card");
for (let i = 0; i < courseCards.length; i++) {
    courseCards[i].addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", courseCards[i].querySelector(".course-title").innerText);
    });
}


function toggleMenu(event) {
    hamburger.classList.toggle("active");
    for (let i = 0; i < allLink.length; i++) {
        allLink[i].classList.toggle("active");
    }
}


async function GetGithubCommit(repoName) {
    try {
        let commitRes = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: 'ellie-chanc',
            repo: repoName,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        return commitRes["data"].length;
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get github commit");
        return 0;
    }
}


function validateForm() {
    return false;
}

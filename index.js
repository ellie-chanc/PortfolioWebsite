import { Octokit } from "https://esm.sh/@octokit/core";


const octokit = new Octokit({
    auth: ""
});


await getNav();
await getProject();
await getCourse();

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

async function getNav() {
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


async function getProject() {
    let projectListRes = {};
    let projectListObj = {};
    try {
        projectListRes = await fetch("data/project.json");
        projectListObj = await projectListRes.json();
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get project details");
        projectListRes = {};
        projectListObj = {};
    }

    let projectContainer = document.querySelector("#project-container");

    for (let i = 0; i < Object.keys(projectListObj).length; i++) {
        let projectCard = document.createElement("article");
        projectCard.classList.add("project-card");

        let projectImg = document.createElement("img");
        projectImg.classList.add("project-img", "card-img")
        projectImg.setAttribute("src", projectListObj[i+1]["img"]);
        projectImg.setAttribute("alt", `${projectListObj[i+1]["title"]} Demo`);
        projectCard.appendChild(projectImg);

        let projectTitle = document.createElement("h2");
        projectTitle.classList.add("project-title", "card-title");
        projectTitle.innerText = projectListObj[i+1]["title"];
        projectCard.appendChild(projectTitle);

        let projectInfo = document.createElement("p");
        projectInfo.classList.add("project-info");
        projectInfo.innerText = projectListObj[i+1]["info"];
        projectCard.appendChild(projectInfo);

        // hide part of the info if too long
        if ((projectInfo.innerText.length) > 50) {
            projectInfo.innerText = projectInfo.innerText.substring(0, 50) + "... ";
            let projectShowMore = document.createElement("a");
            projectShowMore.classList.add("project-show-more", "hide");
            projectShowMore.innerText = "Show More";
            projectInfo.appendChild(projectShowMore);
            projectShowMore.addEventListener("click", function (event) { toggleProjectInfo(event, projectInfo, projectListObj[i+1]["info"]); });
        }
        
        let projectGithubLink = document.createElement("a");
        projectGithubLink.classList.add("project-github-link", "button");
        projectGithubLink.setAttribute("href", projectListObj[i+1]["github-url"]);
        projectGithubLink.setAttribute("target", "_blank");
        projectGithubLink.innerText = "Go to Github "
        let projectGithubIcon = document.createElement("i");
        projectGithubIcon.classList.add("project-github-icon", "fa-brands", "fa-github");
        projectGithubLink.appendChild(projectGithubIcon);
        projectCard.appendChild(projectGithubLink);

        projectContainer.appendChild(projectCard);
    }
}


async function getCourse() {
    let courseListRes = {};
    let courseListObj = {};
    try {
        courseListRes = await fetch("data/course.json");
        courseListObj = await courseListRes.json();
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get course details");
        courseListRes = {};
        courseListObj = {};
    }

    let courseContainer = document.querySelector("#course-container");
    
    for (let i = 0; i < Object.keys(courseListObj).length; i++) {
        let courseCard = document.createElement("article");
        courseCard.classList.add("course-card");
        courseCard.setAttribute("draggable", "true");

        let couseTitle = document.createElement("h2");
        couseTitle.classList.add("course-title", "class-title");
        couseTitle.innerText = courseListObj[i+1]["title"];
        courseCard.appendChild(couseTitle);

        let couseLink = document.createElement("a");
        couseLink.classList.add("course-link", "button");
        couseLink.setAttribute("href", courseListObj[i+1]["url"]);
        couseLink.setAttribute("target", "_blank");
        couseLink.innerText = "Go to course ";
        let couseLinkIcon = document.createElement("i");
        couseLinkIcon.classList.add("course-link-icon", "fa-solid", "fa-arrow-up-right-from-square");
        couseLink.appendChild(couseLinkIcon);
        courseCard.appendChild(couseLink);

        courseCard.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text/plain", courseListObj[i+1]["title"]);
        });

        courseContainer.appendChild(courseCard);
    }
}


function toggleMenu(event) {
    hamburger.classList.toggle("active");
    for (let i = 0; i < allLink.length; i++) {
        allLink[i].classList.toggle("active");
    }
}


function toggleProjectInfo(event, infoElement, originalInfo) {
    if (event.currentTarget.classList.contains("hide")) {
        infoElement.childNodes[0].nodeValue = originalInfo + " ";
        event.currentTarget.innerText = "Hide";
        event.currentTarget.classList.remove("hide")
    } else {
        infoElement.childNodes[0].nodeValue = infoElement.childNodes[0].nodeValue.substring(0, 50) + "... ";
        event.currentTarget.innerText = "Show More";
        event.currentTarget.classList.add("hide");
    }
}


function toggleProjectGithubInfo(event, githubRepoName, githubCommit, githubLink) {
    if (event.currentTarget.classList.contains("hide")) {
        githubRepoName.style.display = "block";
        githubCommit.style.display = "block";
        githubLink.style.display = "block";
        event.currentTarget.innerText = "Hide";
        event.currentTarget.classList.remove("hide")
    } else {
        githubRepoName.style.display = "none";
        githubCommit.style.display = "none";
        githubLink.style.display = "none";
        event.currentTarget.innerText = "Show Github details";
        event.currentTarget.classList.add("hide");
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

import { Octokit } from "https://esm.sh/@octokit/core";


const octokit = new Octokit({
    auth: ""
});


await getNav();
await getProject();
await getCourse();

const hamburger = document.querySelector("#hamburger");
const allLink = document.querySelectorAll(".top-nav-link");
const courseBookmark = document.querySelector("#course-header .bookmark");
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
    let projectListRes = await fetch("data/project.json");
    let projectListObj = await projectListRes.json();
    let projectContainer = document.querySelector("#project-container");

    for (let i = 0; i < Object.keys(projectListObj).length; i++) {
        let projectCard = document.createElement("article");
        projectCard.classList.add("project-card");

        let projectImg = document.createElement("img");
        projectImg.classList.add("project-img")
        projectImg.setAttribute("src", projectListObj[i+1]["img"]);
        projectImg.setAttribute("alt", `${projectListObj[i+1]["title"]} Demo`);
        projectCard.appendChild(projectImg);

        let projectTitle = document.createElement("h2");
        projectTitle.classList.add("project-title");
        projectTitle.innerText = projectListObj[i+1]["title"];
        projectCard.appendChild(projectTitle);

        let projectInfo = document.createElement("p");
        projectInfo.classList.add("project-info");
        projectInfo.innerText = projectListObj[i+1]["info"];
        projectCard.appendChild(projectInfo);

        let projectShowMore = document.createElement("button");
        projectShowMore.classList.add("project-show-more");
        projectShowMore.classList.add("hide");
        projectShowMore.innerText = "Show more";
        projectCard.appendChild(projectShowMore);

        // hide part of the info if too long
        if ((projectInfo.innerText.length) > 50) {
            projectInfo.innerText = projectInfo.innerText.substring(0, 50) + "... ";
            projectShowMore.style.display = "inline-block";
            projectShowMore.classList.add("hide");
            projectShowMore.addEventListener("click", function (event) { toggleProjectInfo(event, projectInfo, projectListObj[i+1]["info"]); });
        }
        

        let projectGithubLink = document.createElement("a");
        projectGithubLink.classList.add("project-github-link");
        projectGithubLink.setAttribute("href", projectListObj[i+1]["github-url"]);
        projectGithubLink.setAttribute("target", "_blank");
        projectGithubLink.style.display = "none";
        let projectGithubIcon = document.createElement("img");
        projectGithubIcon.classList.add("project-github-icon")
        projectGithubIcon.setAttribute("src", "img/github-mark-white.png");
        projectGithubIcon.setAttribute("alt", "Github Icon");
        projectGithubLink.appendChild(projectGithubIcon);
        projectCard.appendChild(projectGithubLink);

        let projectGithubRepoName = document.createElement("p");
        projectGithubRepoName.classList.add("project-github-repo-name");
        projectGithubRepoName.style.display = "none";;
        projectGithubRepoName.innerText = projectListObj[i+1]["github-repo-name"];
        projectCard.appendChild(projectGithubRepoName);

        let projectGithubCommit = document.createElement("p");
        projectGithubCommit.classList.add("project-github-commit");
        projectGithubCommit.style.display = "none";
        projectGithubCommit.innerText = "Number of commits: " + await GetGithubCommit(projectListObj[i+1]["github-repo-name"]);
        projectCard.appendChild(projectGithubCommit);

        let projectGithubShowMore = document.createElement("button");
        projectGithubShowMore.classList.add("project-github-show-more");
        projectGithubShowMore.innerText = "Show Github details";
        projectGithubShowMore.classList.add("hide");
        projectGithubShowMore.addEventListener("click", function (event) { toggleProjectGithubInfo(event, projectGithubRepoName, projectGithubCommit, projectGithubLink); });
        projectCard.appendChild(projectGithubShowMore);

        projectContainer.appendChild(projectCard);
    }
}


async function getCourse() {
    let courseListRes = await fetch("data/course.json");
    let courseListObj = await courseListRes.json();
    let courseContainer = document.querySelector("#course-container");
    
    for (let i = 0; i < Object.keys(courseListObj).length; i++) {
        let courseCard = document.createElement("article");
        courseCard.classList.add("course-card");
        courseCard.setAttribute("draggable", "true");

        let couseTitle = document.createElement("h2");
        couseTitle.classList.add("course-title");
        couseTitle.innerText = courseListObj[i+1]["title"];
        courseCard.appendChild(couseTitle);

        let couseLink = document.createElement("a");
        couseLink.classList.add("course-link");
        couseLink.setAttribute("href", courseListObj[i+1]["url"]);
        couseLink.setAttribute("target", "_blank");
        couseLink.innerText = "Go to course";
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
        infoElement.innerText = originalInfo;
        event.currentTarget.innerText = "Hide";
        event.currentTarget.classList.remove("hide")
    } else {
        infoElement.innerText = infoElement.innerText.substring(0, 50) + "... ";
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
        console.log(`Error message: ${err.message}`);
        console.log("Unable to get github commit");
        return 0;
    }
}


function validateForm() {
    return false;
}

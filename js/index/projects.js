getProjects();


async function getProjects() {
    const projectListData = await getProjectListData();
    generateProjectListHtml(projectListData);
    addExpandProjectInfoListener(projectListData);
}


async function getProjectListData() {
    try {
        const projectListRes = await fetch("./data/project.json");
        const projectListObj = await projectListRes.json();
        return projectListObj;
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get project details");
        return {};
    }
}


function generateProjectListHtml(projectListData) {
    const projectContainer = document.querySelector("#project-container");
    
    for (const i in projectListData) {
        const projectImg = `<img class="project-img card-img" src="${projectListData[i]["img"]}" alt="${projectListData[i]["title"]} Demo">`;
        const projectTitle = `<h2 class="project-title card-title">${projectListData[i]["title"]}</h2>`;
        const projectGithubLink = "github-url" in projectListData[i] ? `<a href="${projectListData[i]["github-url"]}" target="_blank" class="project-github-link button">Go to Github <i class="project-github-icon fa-brands fa-github"></i></a>` : "";
        const projectInfo = simplifyProjectInfoHtml(projectListData[i]["info"]);
        const projectCard = `<article class="project-card card">${projectImg + projectTitle + projectInfo}<div class="card-footer">${projectGithubLink}</div></article>`;
        
        projectContainer.innerHTML += projectCard;
    }
}


function simplifyProjectInfoHtml(info) {
    if (info.length > 50) {
        return `<p class="project-info">${info.substring(0, 50)}... <a class="project-show-more show-more-link hide">Show More</a></p>`;
    } else {
        return `<p class="project-info">${info}</p>`;
    }
}


function addExpandProjectInfoListener(projectListData) {
    const projectCard = document.querySelectorAll(".project-card");
    
    for (let i = 0; i < projectCard.length; i++) {
        const projectShowMoreLink = projectCard[i].querySelector(".project-show-more");
        
        if (projectShowMoreLink) {
            projectShowMoreLink.addEventListener("click", (event) => {
                if (event.currentTarget.classList.contains("hide")) {
                    projectCard[i].querySelector(".project-info").childNodes[0].nodeValue = projectListData[i+1]["info"] + " ";;
                    projectShowMoreLink.innerText = "Hide";
                    projectShowMoreLink.classList.remove("hide")
                } else {
                    projectCard[i].querySelector(".project-info").childNodes[0].nodeValue = projectListData[i+1]["info"].substring(0, 50) + "... ";
                    projectShowMoreLink.innerText = "Show More";
                    projectShowMoreLink.classList.add("hide");
                }
            });
        }
    }
}
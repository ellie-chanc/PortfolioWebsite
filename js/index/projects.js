await getProjects();


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
        const projectTitle = `<h2 class="project-title card-title">${projectListObj[i]["title"]}</h2>`;
        const projectGithubLink = "github-url" in projectListObj[i] ? `<a href="${projectListObj[i]["github-url"]}" target="_blank" class="project-github-link button">Go to Github <i class="project-github-icon fa-brands fa-github"></i></a>` : "";
        let projectCard = ``;

        let projectInfo = ``;
        if (projectListObj[i]["info"].length > 50) {
            projectInfo = `<p class="project-info">${projectListObj[i]["info"].substring(0, 50)}... <a class="project-show-more show-more-link hide">Show More</a></p>`;
        } else {
            projectInfo = `<p class="project-info">${projectListObj[i]["info"]}</p>`;
        }

        projectCard = `<article class="project-card card">${projectImg + projectTitle + projectInfo}<div class="card-footer">${projectGithubLink}</div></article>`;
        
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
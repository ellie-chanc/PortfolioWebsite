getCourses();


async function getCourses() {
    const courseListData = await getCoursesData();
    generateCourseCardsHtml(courseListData);
    addSearchListener();
}


async function getCoursesData() {
    try {
        const courseListRes = await fetch("./data/course.json");
        const courseListObj = await courseListRes.json();
        return courseListObj;
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get course details");
        return {};
    }
}


function generateCourseCardsHtml(courseListData) {
    const courseContainer = document.querySelector("#course-container");

    for (const i in courseListData) {
        const courseTitle = `<h2 class="course-title card-title">${courseListData[i]["title"]}</h2>`;
        const courseLink = `<a href="${courseListData[i]["url"]}" target="_blank" class="course-link button">Go to course <i class="course-link-icon fa-solid fa-arrow-up-right-from-square"></i></a>`;
        const courseCard = `<article class="course-card card">${courseTitle}<div class="card-footer">${courseLink}</div></article>`;
        
        courseContainer.innerHTML += courseCard;
    }
}


function addSearchListener() {
    const searchCourses = document.querySelector("#search-courses");
    const allCourseCards = document.querySelectorAll(".course-card");

    searchCourses.addEventListener("keyup", () => {
        const filter = searchCourses.value.toLowerCase();

        allCourseCards.forEach((i) => {
            const title = i.querySelector(".course-title").innerText.toLowerCase();
            
            if (title.indexOf(filter) === -1) {
                i.style.display = "none";
            } else {
                i.style.display = "";
            }
        })
    });
}
await getCourses();

const searchCourses = document.querySelector("#search-courses");

searchCourses.addEventListener("keyup", search);

function search() {
    let allCourseCards = document.querySelectorAll(".course-card");
    let filter = searchCourses.value.toLowerCase();
    for (let i = 0; i < allCourseCards.length; i++) {
        let title = allCourseCards[i].querySelector(".course-title").innerText.toLowerCase();
        if (title.indexOf(filter) === -1) {
            allCourseCards[i].style.display = "none";
        } else {
            allCourseCards[i].style.display = "";
        }
    }
}

async function getCourses() {
    let courseListObj = {};
    try {
        let courseListRes = await fetch("../data/course.json");
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
        let courseCard = `<article class="course-card card">${courseTitle}<div class="card-footer">${courseLink}</div></article>`;
        
        courseContainer.innerHTML += courseCard;
    }
}
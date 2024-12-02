await getCourses();

const courseBookmark = document.querySelector(".bookmark-container");
let numberOfBookmark = 0;


// drag and frop for courses
let courseCards = document.querySelectorAll(".course-card");
for (let i = 0; i < courseCards.length; i++) {
    courseCards[i].addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", courseCards[i].querySelector(".course-title").innerText);
    });
}

courseBookmark.addEventListener("dragover", function (event) { event.preventDefault(); });

courseBookmark.addEventListener("drop", function (event) {
    event.preventDefault();
    numberOfBookmark++;
    let courseName = event.dataTransfer.getData("text/plain");
    sessionStorage.setItem(`course-name-${numberOfBookmark}`, courseName);
    console.log(sessionStorage.getItem(`course-name-${numberOfBookmark}`));
});


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
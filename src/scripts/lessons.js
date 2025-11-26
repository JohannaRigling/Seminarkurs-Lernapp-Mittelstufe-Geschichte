// This file handles the loading and display of lesson content.
// It exports functions to fetch lessons from the JSON file and render them on the page.

const lessonsContainer = document.getElementById('lessons-container');

async function fetchLessons() {
    try {
        const response = await fetch('./assets/data/lessons.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const lessons = await response.json();
        return lessons;
    } catch (error) {
        console.error('Error fetching lessons:', error);
    }
}

function renderLessons(lessons) {
    lessonsContainer.innerHTML = '';
    lessons.forEach(lesson => {
        const lessonElement = document.createElement('div');
        lessonElement.classList.add('lesson');
        lessonElement.innerHTML = `
            <h2>${lesson.title}</h2>
            <p>${lesson.content}</p>
        `;
        lessonsContainer.appendChild(lessonElement);
    });
}

export async function loadLessons() {
    const lessons = await fetchLessons();
    if (lessons) {
        renderLessons(lessons);
    }
}
function createNavigation() {
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    const lessonsLink = document.createElement('li');
    lessonsLink.innerHTML = '<a href="#lessons">Lessons</a>';
    ul.appendChild(lessonsLink);

    const quizzesLink = document.createElement('li');
    quizzesLink.innerHTML = '<a href="#quizzes">Quizzes</a>';
    ul.appendChild(quizzesLink);

    nav.appendChild(ul);
    return nav;
}

export default createNavigation;
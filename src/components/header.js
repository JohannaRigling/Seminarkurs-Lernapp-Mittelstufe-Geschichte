function createHeader() {
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = 'History Learning App';
    
    const nav = document.createElement('nav');
    const lessonsLink = document.createElement('a');
    lessonsLink.href = '#lessons';
    lessonsLink.textContent = 'Lessons';
    
    const quizzesLink = document.createElement('a');
    quizzesLink.href = '#quizzes';
    quizzesLink.textContent = 'Quizzes';
    
    nav.appendChild(lessonsLink);
    nav.appendChild(quizzesLink);
    
    header.appendChild(title);
    header.appendChild(nav);
    
    return header;
}

export default createHeader;
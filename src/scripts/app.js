// This file initializes the history learning app, sets up event listeners, and manages the overall application flow.

import { loadLessons } from './lessons.js';
import { loadQuizzes } from './quiz.js';
import { createHeader } from '../components/header.js';
import { createNavigation } from '../components/navigation.js';
import { createFooter } from '../components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the app
    createHeader();
    createNavigation();
    createFooter();

    // Load lessons and quizzes
    loadLessons();
    loadQuizzes();
});
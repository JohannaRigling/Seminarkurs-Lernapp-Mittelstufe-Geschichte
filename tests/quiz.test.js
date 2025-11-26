import { loadQuiz, calculateScore } from '../src/scripts/quiz';

describe('Quiz Functionality', () => {
    let quizData;

    beforeAll(async () => {
        quizData = await loadQuiz();
    });

    test('should load quiz data correctly', () => {
        expect(quizData).toBeDefined();
        expect(Array.isArray(quizData.questions)).toBe(true);
        expect(quizData.questions.length).toBeGreaterThan(0);
    });

    test('should calculate score correctly', () => {
        const answers = ['A', 'C', 'B']; // Example answers
        const score = calculateScore(answers, quizData.questions);
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(quizData.questions.length);
    });
});
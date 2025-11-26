import { fetchLessons, renderLessons } from '../src/scripts/lessons';

describe('Lessons Module', () => {
    let lessonsData;

    beforeAll(async () => {
        lessonsData = await fetchLessons();
    });

    test('fetchLessons should return an array of lessons', () => {
        expect(Array.isArray(lessonsData)).toBe(true);
    });

    test('renderLessons should correctly render lessons', () => {
        const container = document.createElement('div');
        renderLessons(lessonsData, container);
        expect(container.children.length).toBe(lessonsData.length);
    });

    test('each lesson should have a title and content', () => {
        lessonsData.forEach(lesson => {
            expect(lesson).toHaveProperty('title');
            expect(lesson).toHaveProperty('content');
        });
    });
});
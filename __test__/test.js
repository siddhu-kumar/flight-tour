
import fs from "node:fs"
import path from "node:path";

describe('HTML Content Tests', () => {
    let htmlContent;

    beforeAll(() => {
        // Load the HTML file
        htmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        document.body.innerHTML = htmlContent; // Set the HTML content to the document body
    });

    test('should contain the correct title', () => {
        const titleElement = document.getElementById('title');
        expect(titleElement.textContent).toBe('Hello, World!');
    });

    test('should contain the correct description', () => {
        const descriptionElement = document.querySelector('.description');
        expect(descriptionElement.textContent).toBe('This is a simple HTML content for testing.');
    });
});
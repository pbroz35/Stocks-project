const { compile } = require("html-to-text");
const fs = require("fs");
const path = require("path");

const filterData = () => {

    console.log("Inside filter data..");

    const options = {
        wordwrap: 130,
        baseElement: "body", // Focus on the body tag
        selectors: [
            { selector: "a", format: "skip" }, // Remove links
            { selector: "img", format: "skip" }, // Remove images
            { selector: "video", format: "skip" }, // Remove videos
            { selector: "aside", format: "skip" }, // Remove sidebars
            { selector: "nav", format: "skip" }, // Remove navigation
            { selector: "footer", format: "skip" }, // Remove footers
            { selector: "header", format: "skip" }, // Remove headers
            { selector: "script", format: "skip" }, // Remove scripts
            { selector: "style", format: "skip" }, // Remove styles
            { selector: "noscript", format: "skip" }, // Remove noscript tags
        ],
    };

    const compiledConvert = compile(options);
    const promptsFilePath = "prompts.txt";

    fs.writeFileSync(promptsFilePath, ""); // Clear the prompts file before writing

    for (let i = 0; i < 100; i++) {
        const filePath = path.join("articles", `article${i}.html`);
        try {
            if (fs.existsSync(filePath)) {
                const articleText = fs.readFileSync(filePath, "utf8");
                const text = compiledConvert(articleText);
                fs.appendFileSync(promptsFilePath, text + "\n\n");
            } else {
                console.log(`File ${filePath} does not exist, skipping...`);
                continue;
            }
        } catch (error) {
            console.error(`Error processing file ${filePath}:`, error);
        }
    }

    // Read prompts.txt, filter out lines that don't start with a character, and write back
    const promptsContent = fs.readFileSync(promptsFilePath, "utf8");
    const filteredContent = promptsContent
        .split('\n')
        .filter(line => /^[a-zA-Z]/.test(line) && !(line.trim().split(' ').length < 10 && !line.endsWith('.')))
        .join('\n');
    fs.writeFileSync(promptsFilePath, filteredContent);

    console.log("Data filtering complete, sending info to the AI API...");

    
};

module.exports = { filterData };

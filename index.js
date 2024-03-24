#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// ASCII art for the game title
const title = `
██████╗░██╗░░░░░██╗███████╗███████╗██████╗░░█████╗░██████╗░
██╔══██╗██║░░░░░██║██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗
██║░░██║██║░░░░░██║█████╗░░█████╗░░██████╦╝██║░░██║██║░░██║
██║░░██║██║░░░░░██║██╔══╝░░██╔══╝░░██╔══██╗██║░░██║██║░░██║
██████╔╝███████╗██║███████╗███████╗██████╦╝╚█████╔╝██████╔╝
╚═════╝░╚══════╝╚═╝╚══════╝╚══════╝╚═════╝░░╚════╝░╚═════╝░
`;
console.log(chalk.yellow.bold(title));
let attempts = 5; // Number of attempts allowed
let score = 0; // Player's score
// Function to simulate typing animation
// Function to simulate delay
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Function to simulate typing animation
async function typeMessage(message, delay) {
    for (const char of message) {
        process.stdout.write(char);
        await sleep(delay);
    }
}
// Main game loop
async function playGame() {
    const randomNumber = Math.floor(Math.random() * 6 + 1); // Generate random number for this game session
    while (attempts > 0) {
        console.log(chalk.blue.bold("──────────────────────────────────────"));
        const answer = await inquirer.prompt([
            {
                name: "userGuessedNumber",
                type: "number",
                message: chalk.cyanBright(`Attempts left: ${chalk.whiteBright.bold(attempts)}. Please guess a number between 1 to 6: `),
            },
        ]);
        const userGuess = answer.userGuessedNumber;
        if (userGuess === randomNumber) {
            score += attempts * 10; // Increment score based on attempts remaining
            console.log(chalk.green.bold("──────────────────────────────────────"));
            await typeMessage(chalk.green.bold(`Congratulations! You guessed the right number. Your current score: ${score}`), 50);
            console.log(""); // New line for spacing
            break;
        }
        else {
            // Provide feedback based on closer guesses
            const difference = Math.abs(randomNumber - userGuess);
            let hint = difference > 2 ? "You're very far." : difference > 1 ? "You're getting colder." : "You're getting warmer.";
            console.log(chalk.red.bold("──────────────────────────────────────"));
            await typeMessage(chalk.red.bold(`Sorry, you guessed the wrong number. ${hint}`), 50);
            console.log(""); // New line for spacing
            attempts--;
        }
    }
    // If player couldn't guess the number
    if (attempts === 0) {
        console.log(chalk.red.bold("──────────────────────────────────────"));
        await typeMessage(chalk.red.bold(`Oops! You've run out of attempts. The correct number was ${randomNumber}. Your final score: ${score}`), 50);
        console.log(""); // New line for spacing
    }
}
// Start the game
playGame();

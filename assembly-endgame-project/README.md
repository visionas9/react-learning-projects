## 🚀 Key Features

- **Dynamic Game Logic:** Real-time updates for surviving languages and remaining attempts.
- **Transient Feedback:** Displays humorous "Farewell" messages that appear only on the specific turn a language is eliminated.
- **Endgame Polish:** Automatically reveals the word upon loss, visually distinguishing between correctly guessed letters and missed ones (highlighted in red).
- **Keyboard Management:** Visual feedback for used keys; automatically disables interaction when the game ends.

## 🧠 Technical Highlights

This project focuses on clean React architecture and modern patterns:

- **Derived State:** Instead of creating redundant state variables for `isGameWon` or `isGameLost`, these values are calculated on-the-fly based on the `currentWord` and `guessedLetters` arrays. This prevents state synchronization bugs.
- **Lazy State Initialization:** Utilized `useState(() => function())` to ensure the random word generation algorithm runs only once on the initial mount, optimizing performance.
- **Complex Conditional Rendering:** Implemented a rendering hierarchy where Game Over status takes priority over transient game messages.
- **Dynamic Styling:** Integrated `clsx` to conditionally apply CSS classes for the game status and keyboard visual feedback.

## 🛠 Tech Stack

- React
- JavaScript (ES6+)
- CSS3
- clsx (for conditional class names)

## 🏃‍♂️ How to Run

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

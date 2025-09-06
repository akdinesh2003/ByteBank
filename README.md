# ByteBank X 🏦

### Smarter money. Zero cloud. Total control.

ByteBank X is a privacy-first, offline-capable personal finance tracker that doesn’t just record your expenses—it understands your financial behavior. Built with Next.js and powered by on-device AI, it’s designed for users who demand full control, zero cloud dependency, and smart insights without sacrificing simplicity.

---

## ✨ Key Features

-   **🔐 Encrypted Multi-Profile Support**: Securely track finances for multiple users or wallets (e.g., personal, freelance, household).
-   **🧠 AI-Powered Expense Clustering**: Automatically groups similar expenses using local NLP. The system learns from your corrections to improve categorization over time.
-   **📈 Predictive Budgeting**: Forecasts next month’s expenses based on historical patterns and provides smart budget cap suggestions.
-   **🎯 Goal Tracker with Milestone Visuals**: Set savings goals, break them into milestones, and visualize your progress with celebratory visuals.
-   **📊 Financial Health Score**: Get a dynamic score based on your savings rate, debt ratio, and spending habits, complete with actionable tips for improvement.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/akdinesh2003/ByteBank.git
    cd ByteBank
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a file named `.env` in the root of your project and add your AI provider's API key.

    ```env
    # .env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

    > **⚠️ Important!**
    > The AI-powered features, such as predictive budgeting and expense clustering, will not work without a valid API key.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at [http://localhost:9002](http://localhost:9002).

---

## 📜 Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm start`: Starts a Next.js production server.
-   `npm run lint`: Lints the project files using ESLint.

---

## 🛠️ Built With

-   [Next.js](https://nextjs.org/) - React Framework
-   [React](https://reactjs.org/) - UI Library
-   [TypeScript](https://www.typescriptlang.org/) - Programming Language
-   [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
-   [Shadcn UI](https://ui.shadcn.com/) - Component Library
-   [Genkit](https://firebase.google.com/docs/genkit) - AI Framework

---

## ✍️ Author

-   **akdinesh2003** - https://github.com/akdinesh2003

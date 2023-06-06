# Intellectial

Welcome to Intellectial, a web-based app that generates random 3 question quizzes on any topic using the power of OpenAI API.

## Installation

To get started with Intellectial, follow these simple steps:

1. Clone the repository to your local machine using the following command:

   ```
   git clone [repo_url]
   ```

2. Navigate to the project directory:

   ```
   cd intellectial
   ```

3. Install the necessary dependencies by running the following command:

   ```
   npm install
   ```

4. Set up the environment variables by creating a `.env` file based on the provided `.env.example` file. Modify the values in the `.env` file to set your APIKEY and everything you need.

   ```
   cp .env.example .env
   ```

   **Note:** Ensure that you have appropriate credentials for the OpenAI API and any other required services.

5. You're all set! Run the application using the following command:

   ```
   node index.js
   ```

   Intellectial will now be up and running on your local machine.

## Usage

Once Intellectial is running, follow these steps to use the application:

1. Open your preferred web browser and navigate to `http://localhost:3000` (or the specified port in your `.env` file).

2. On the Intellectial homepage, you can submit your desired topic for the quiz.

3. After submitting the topic, Intellectial will make a request to the OpenAI API and generate a quiz based on the provided topic.

4. Enjoy

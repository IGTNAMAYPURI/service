---
description: AI Assistant for Medical and Lifestyle Program
---

# 🤖 GinAI

1. User Authentication:
   * Users can either authenticate themselves or be added via the dashboard.
   * For instance:
     1. A user learns about the website and attempts to seek assistance online.
     2. A user visits the hospital, consults with a doctor, and during patient registration, an account is created. This account can be accessed through the website and mobile app, allowing the user to manage their information, including accounts, reports, analysis, and interact with the chatbot.
   * We have the option to implement our own authentication system through coding, or utilize online services like Firebase, Supabase, etc.
   * Creating a manual authentication system is preferred for the flexibility it offers.
   * Libraries such as Passport.js in Express, and equivalents like Python's FastAPI-Users, Django-Allauth, and Flask-Login can be employed.
   * Data can be stored in MongoDB, Postgres, Supabase, or Firebase.
   * Cloud database providers are preferred for their ability to store embeddings and perform feature queries on them.
   * References:
     * MongoDB: [Link](https://www.mongodb.com/products/platform/atlas-vector-search)
     * Supabase: [Link](https://supabase.com/docs/guides/ai)
2. Chatbot/Virtual Assistant:
   * The chatbot answers questions related to lifestyle and diabetes. Users have the option to give it a personalized name.
   * Every user within the application will have their own chatbot.
   * The chatbot functions as a human-like personal assistant, equipped with all relevant user information to generate appropriate responses.
   * It retrieves user-uploaded data and extracts the necessary information from the database (Gini Health clinical judgments) to formulate analyses and solutions.
   * Retrieval is an AI process for fetching pertinent information from a database.
   * The process involves:
     1. Storing base data in the database in the form of embeddings.
     2. User uploads a document.
     3. The document is processed and stored in the database as vector embeddings.
     4. The chatbot's analysis actions are triggered.
     5. ChatAPI retrieves relevant information from the base data to analyze user data and generate a response.
     6. All information and history are saved in the database for future use.
   * Technologies that can be utilized:
     1. OpenAI conversational models like GPT-4. Reference: [Link](https://platform.openai.com/docs/models/overview)
     2. OpenAI function calling. Reference: [Link](https://openai.com/blog/function-calling-and-other-api-updates)
     3. Function calling is useful for triggering vector retrieval, obtaining user information, and accessing previous reports.
     4. A system can be created using function calling to efficiently perform all necessary tasks.
     5. Langchain (Reference: [Link](https://python.langchain.com/docs/modules/agents/agent\_types/openai\_functions\_agent)) or a custom system for API calls can be implemented for efficiency.
     6. For argument and function calling, OpenAPI Specification ([https://www.openapis.org/](https://www.openapis.org/)) and JSON Schema ([https://json-schema.org/](https://json-schema.org/)) can be used, both of which are employed by ChatGPT for creating dynamic plugins.
3. File Upload:
   * In the file upload feature, users can upload documents of any type, and we need to extract meaningful information from them.
   * There will be a section to manage files and documents.
   * A code will be implemented to extract all the data from a user's document.
   * After extracting user data, it will be presented to the user for editing and confirmation, before being stored in our database for future use by the chatbot.
   * S3 can be utilized for storing files.
4. Team Chat:
   * If the application requires team chat functionality, a feature for creating teams will be implemented.
   * Subsequently, a chat interface will be provided to the team for communication (similar to group chat).
   * Sockets can be used for the chat feature, or a messaging service like SendBird (for reference) can be considered.
5. Online Payment:
   * Stripe can be integrated to add payment functionality.
6. Visualization:
   * ApexCharts ([https://apexcharts.com](https://apexcharts.com)) can be used for visualization.
7. Daily Dashboard:
   * A daily dashboard will be implemented to display tasks and provide access to the assistant interface.
8. React Native/Flutter:
   * I will prefer React Native as it is:
   * **JavaScript-Based:** React Native uses JavaScript, one of the most widely used programming languages, making it easy to find developers who are familiar with it.
   * **Single Codebase, Multiple Platforms:** With React Native, you can write one codebase and deploy it on both iOS and Android platforms. This significantly reduces development time and effort compared to building separate apps for each platform.
   * **Large Community and Ecosystem:** React Native has a vast and active community of developers. This means there are plenty of libraries, tools, and resources available, which can help speed up development.
   * **Performance:** React Native apps are compiled into native code, providing performance similar to that of a fully native app. Additionally, it allows for the integration of native modules for tasks that require native capabilities.
   * **Native Look and Feel:** React Native allows developers to use native components, resulting in an app that looks and feels like a native one. This leads to a better user experience.
   * **Code Reusability:** While not all parts of an app can be shared across platforms, a significant portion of the code can be reused. This can lead to substantial time savings.
   * **Third-Party Plugin Compatibility:** React Native is compatible with a wide range of third-party plugins, allowing for easy integration of various features and functionalities.
9. **Technology Stack**:
   * MERN stack with TypeScript for the web application.
   * React Native for mobile app development.
   * Support for Langchain for certain functionalities.

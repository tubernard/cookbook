# Cookbook

Love to cook but struggle to keep track of all your favorite recipes? Cookbook was created as an easy way to store, search, and find inspiration for new recipes!

## Project Status

This project is an MVP and serves as a demonstration of core full-stack features. It is still under active development.

## Technology Stack

- **Frontend:** React (with Vite) & Mantine UI
- **Backend:** Node.js & Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Image Management:** Cloudinary
- **Schema Validation:** Zod
- **Monorepo:** npm Workspaces

## Features

### Implemented

- **Dynamic Recipe Forms & Display**
  - Users can add new recipes through a dynamic form and view the entire collection in a responsive grid.
  - _Built with React and Mantine UI, with client-side validation powered by Zod._

- **Secure Cloud Image Uploads**
  - Implements a secure, signed upload flow. The Node.js backend generates a one-time signature, allowing the client to upload images directly to Cloudinary without exposing secret credentials.
  - _This keeps the server stateless and improves performance by offloading the upload process._

- **Optimized Image Delivery**
  - Utilizes Cloudinary transformations to serve optimized images for different parts of the UI (e.g., thumbnails), ensuring fast load times and a smooth user experience.

### Upcoming

- **User Authentication:** Implementing login, registration, and session management so users can have their own private recipe collections.
- **AI-Powered Suggestions:** Integrating a Large Language Model (LLM) to generate new recipe ideas that users can edit and save.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm (v7 or later for workspace support)
- A MongoDB database instance (local or cloud-hosted via MongoDB Atlas)
- A Cloudinary account

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/recipe-book.git
    cd recipe-book
    ```

2.  **Install dependencies from the root directory:**
    This command will install dependencies for the root, `server`, and `client` workspaces.

    ```sh
    npm install
    ```

3.  **Create the environment files:**
    In both the client and server directories, create `.env` files and populate them with your credentials. You can use the `.env.example` in the client and server directories as a template:

    Server:

    ```
    MONGO_URI=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    CLOUDINARY_UPLOAD_PRESET=your_signed_upload_preset_name
    ```

    Client:

    ```
    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
    VITE_CLOUDINARY_API_KEY=your_api_key
    VITE_CLOUDINARY_UPLOAD_PRESET=your_signed_upload_preset_name
    ```

### Running the Application

1.  **Start the development servers:**
    Run the `dev` script from the root directory to start both the backend server and the frontend Vite server concurrently.

    ```sh
    npm run dev
    ```

2.  Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

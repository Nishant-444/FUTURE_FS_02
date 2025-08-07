# Mini E-Commerce Storefront

This project is a mini e-commerce platform built as part of the **Future Interns Full Stack Web Development Internship (Task 2)**. It features a modern, responsive user interface for browsing products, adding items to a shopping cart, and simulating a checkout process.

![E-Commerce Storefront Screenshot](/src/assets/Front%20page.png)

---

## ✨ Key Features

- **Product Listings**: Displays a grid of products with images, descriptions, and prices.
- **Dynamic Shopping Cart**: Users can add products to the cart, update item quantities, and remove items.
- **Real-time Cart Updates**: The total price is calculated automatically as the cart changes.
- **Checkout Simulation**: A simple, validated form to simulate the final step of a purchase.
- **Responsive Design**: The layout is optimized for a seamless experience on both desktop and mobile devices.

---

## 🛠️ Technologies Used

- **Frontend**: [React.js](https://react.dev/) (with Hooks)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your computer.

### Installation

1.  **Clone the repository** to your local machine:

    ```bash
    git clone https://github.com/Nishant-444/FUTURE_FS_02.git
    ```

2.  **Navigate into the project directory**:

    ```bash
    cd your-repository-name
    ```

3.  **Install the required dependencies**:
    ```bash
    npm install
    ```

### How to Run the Application

Once the installation is complete, you can start the development server:

```bash
npm run dev

This will start the application and open it in your default web browser at http://localhost:5173 (or the next available port).

📂 Project Structure
The project follows a standard Vite + React folder structure to keep the code organized and maintainable.

/
├── public/              # Static assets (images, fonts)
├── src/
│   ├── assets/          # Local images used in components
│   ├── components/      # Reusable React components
│   ├── context/         # React Context for state management
│   ├── data/            # Mock data files
│   ├── App.jsx          # Main application component
│   ├── index.css        # Main CSS file with Tailwind imports
│   └── main.jsx         # Application entry point
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

# Shapika - Online Store Web Application

Shapika is a modern e-commerce web application built with **Next.js 13**, **TypeScript**, and **Tailwind CSS**. The project allows users to browse products, manage a shopping cart, and view product details. This repository demonstrates a production-ready frontend with dynamic rendering, reusable components, and responsive design.

## Features

- Display products in different categories (T-shirts, Hoodies, Shoes, Bags, etc.)
- Shopping cart with add/remove functionality
- Mini cart preview on hover
- Total price calculation
- Responsive UI with Tailwind CSS
- Skeleton loaders for better user experience
- Persistent cart using `localStorage`

## Tech Stack

- **Frontend:** Next.js 13, TypeScript, React
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **Mock API:** JSON Server (for local development)

## Project Structure

shapika/
├── app/ # Next.js app directory
│ ├── page.tsx # Main homepage
│ └── layout.tsx
├── components/ # Reusable UI components
│ ├── product/
│ └── ui/
├── stores/ # Zustand stores
├── types/ # TypeScript type definitions
├── public/ # Images and static assets
└── package.json

bash
Copy code

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- JSON Server (for mock API)

### Installation

1. Clone the repository:

```bash
<<<<<<< HEAD
git clone https://github.com/<YOUR_USERNAME>/shapika.git
=======
git clone https://github.com/<aminabbasi-dev>/shapika
>>>>>>> b5f82e27b9d0f0fae94eadd2f1fb06a5899b6d7a
cd shapika
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Start JSON Server (local mock API):

bash
Copy code
npx json-server --watch db.json --port 5001
Run the development server:

bash
Copy code
npm run dev
# or
yarn dev
The app will be available at http://localhost:3000.

Usage
Hover over the shopping cart icon in the header to see the mini cart.

Add or remove products directly from the mini cart.

Browse products by category using the category carousel.

Deployment
Shapika can be deployed easily on Vercel:

Push your code to GitHub.

Connect the repository to Vercel.

Set the environment variable for the API endpoint if needed.

Deploy the application.

Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

License
This project is licensed under the MIT License.

yaml
Copy code
```

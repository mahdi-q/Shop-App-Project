# 🛒 Shop App Project

An e-commerce website where users can browse products by category, place orders, and admins can manage products, categories, and discount codes.

## Table of Contents

- [Features](#features)
- [Packages](#packages)
- [Project Structure](#project-structure)
- [Acknowledgements](#acknowledgements)
- [Contact Information](#contact-information)

## Features

- **Developed with Next.js for optimized performance and SEO**
- **Responsive design with Tailwind CSS**
- **User authentication and order management**
- **Admin panel for managing products, categories, and discount codes**
- **Form validation using React Hook Form**
- **Data fetching handled with React Query**
- **Search, Sort and Pagination Features**

## Packages

- **next**: React framework with SSR and routing.
- **axios**: HTTP client for API integration.
- **tanstack/react-query**: Handles server-side data fetching and caching.
- **react-hook-form**: Form validation and management.
- **react-hot-toast**: Notifications and alerts.
- **@pathofdev/react-tag-input**: Tag input component for managing multiple tags.
- **classnames**: Utility for conditionally joining and managing CSS class names.
- **query-string**: Parses and stringifies URL query strings.
- **react-icons**: Collection of popular icons for React projects.
- **react-multi-date-picker**: Select multiple dates with a customizable date picker.
- **react-otp-input**: Customizable input for OTP (One-Time Password) fields.
- **react-select**: Flexible and customizable select input with search and multi-select support.
- **react-spinners**: Loading spinners for data-fetching states.
- **yup**: JavaScript schema builder for value parsing and form validation.

## Project Structure

```bash
project-root/
│
├── public/ # Public assets available directly
│ ├── fonts/ # Custom fonts used in the project
│ └── images/ # Static images and icons
│
├── src/ # Main source code
│ ├── app/ # Next.js app directory (pages, layouts, routes)
│ ├── components/ # Reusable UI components
│ ├── constants/ # Constant values and configuration variables
│ ├── contexts/ # React context providers for global state
│ ├── hooks/ # Custom React hooks
│ ├── providers/ # Application-level providers
│ ├── services/ # API & data fetching logic
│ ├── styles/ # Global styles and theme files
│ ├── ui/ # Shared UI elements (buttons, inputs, modals, etc.)
│ ├── utils/ # Utility/helper functions
│ └── middleware.js # Middleware for handling authentication, redirects, etc.
│
└── README.md # Project documentation

```

## Acknowledgements

Special thanks to [Saheb Mohammadi](https://github.com/sahebmohammadi) for developing the backend of this project.

## Contact Information

For any questions or feedback, please reach out at [ghasemi84mahdi@gmail.com](mailto:ghasemi84mahdi@gmail.com).

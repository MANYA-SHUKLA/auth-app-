# Auth App

A beautiful and modern authentication application built with Next.js, featuring elegant login and signup pages with smooth animations, comprehensive form validation, and a responsive design.

## 📖 About

This is a full-featured authentication application that provides a seamless user experience for login and signup flows. The app features:

- **Beautiful UI/UX**: Modern gradient designs with smooth animations and transitions
- **Form Validation**: Comprehensive client-side validation for all form fields
- **Responsive Design**: Works seamlessly across all device sizes
- **Material UI Integration**: Uses Material UI components with custom theming
- **Password Strength Indicator**: Visual feedback for password strength during signup
- **Real-time Validation**: Instant feedback as users type
- **Accessibility**: Proper form labels, error messages, and keyboard navigation

## 🏗️ Folder Structure

```
auth-app/
├── app/                          # Next.js App Router directory
│   ├── favicon.ico               # App favicon
│   ├── globals.css               # Global styles and Tailwind CSS
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home/landing page
│   ├── login/                    # Login page route
│   │   └── page.tsx              # Login page component
│   ├── signup/                   # Signup page route
│   │   └── page.tsx              # Signup page component
│   └── providers/                # React context providers
│       └── theme-provider.tsx    # Material UI theme provider
├── lib/                          # Utility functions and helpers
│   └── validation.ts             # Form validation functions
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js TypeScript definitions
├── package.json                  # Project dependencies
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## 🚀 Features

### Home Page (`/`)
- Welcome screen with gradient background
- Navigation buttons to login and signup pages
- Feature highlights section
- Smooth animations and transitions

### Login Page (`/login`)
- Email and password validation
- Password visibility toggle
- Real-time form validation
- Success/error message handling
- Link to signup page
- Forgot password link (placeholder)

### Signup Page (`/signup`)
- Full name, email, password, and confirm password fields
- Comprehensive password validation with strength indicator
- Real-time validation for all fields
- Password visibility toggles for both password fields
- Success/error message handling
- Link to login page

### Validation Features
- **Email**: Format validation
- **Password (Login)**: Minimum 6 characters
- **Password (Signup)**: Minimum 8 characters with uppercase, lowercase, and number requirements
- **Name**: 2-50 characters, letters, spaces, hyphens, and apostrophes only
- **Confirm Password**: Must match the original password

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Material Icons](https://mui.com/material-ui/material-icons/)
- **Fonts**: [Geist](https://vercel.com/font) (Sans & Mono)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auth-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful indigo-purple-pink gradients
- **Glass Morphism**: Backdrop blur effects on cards
- **Smooth Animations**: Fade and slide transitions
- **Hover Effects**: Interactive button and card hover states
- **Custom Theme**: Material UI theme with custom colors and typography
- **Responsive Layout**: Mobile-first design approach

## 📝 Notes

- Currently, the authentication is simulated (no backend integration)
- Form submissions show success messages but don't persist data
- Ready for backend API integration
- All validation is client-side

## 🔮 Future Enhancements

- Backend API integration
- Database connection
- JWT token management
- Password reset functionality
- Social authentication (Google, GitHub, etc.)
- User profile management
- Session management

---

Made with ❤️ by Manya Shukla

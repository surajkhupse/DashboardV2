# DashboardV2
<img width="1468" alt="Screenshot 2025-05-22 at 11 58 19 PM" src="https://github.com/user-attachments/assets/c9825e46-f2f8-4432-ba21-e3d487c26b23" />

A modern dashboard application built with **React**, **TypeScript**, **Vite**, and **Material-UI**. This project features a modular layout, dynamic widgets, and a responsive UI.

## Features

- React 19 + TypeScript + Vite for fast development
- Material-UI components and theming
- Modular dashboard layout with add/remove widgets
- Search functionality for widgets
- Responsive design

## Project Structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── Navbar.tsx
│   │   └── widgets/
│   │       ├── addWidgetDrawer.tsx
│   │       └── managedWidgetDrawer.tsx
│   ├── pages/
│   │   └── Dashboard.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

```sh
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:

```sh
npm run build
```

### Lint

To lint the codebase:

```sh
npm run lint
```

## Customization

- Add new widgets in [`DashboardLayout.tsx`](src/components/layout/DashboardLayout.tsx)
- Update the dashboard layout or navigation in [`Navbar.tsx`](src/components/layout/Navbar.tsx)

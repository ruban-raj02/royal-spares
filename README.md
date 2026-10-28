# RoyalSpares

RoyalSpares is an online store project focused on helping customers browse Royal Enfield motorcycle spare parts.

## Features

- Browse spare parts by category and motorcycle model.
- View product details and related information.
- Navigate dedicated pages for bikes, categories, and spare parts.
- Responsive interface for desktop and mobile devices.
- Reusable UI components and shared utilities.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS
- npm

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Install the project dependencies:

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
```

Check `package.json` for the available scripts.

## Project Structure

```text
royalspares/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── bikes/
│   │   ├── categories/
│   │   └── parts/
│   ├── components/
│   └── lib/
├── components.json
├── package.json
├── package-lock.json
└── README.md
```

## Development

1. Add application pages inside `src/app/`.
2. Create reusable components inside `src/components/`.
3. Store shared utilities inside `src/lib/`.
4. Store public assets inside `public/`.
5. Test changes locally before deployment.

## Environment Variables

If environment variables are required, add them to `.env.local`. Never commit secrets or API keys to Git.

## Production Build

```bash
npm run build
npm run start
```

## License

A license has not yet been specified.

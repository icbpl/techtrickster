
# OKTRIK Hugo Site

This is a static website built with Hugo, converted from a React application.

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/) (extended version)
- [Node.js](https://nodejs.org/) (for Tailwind CSS)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

1. Start the Hugo development server:
   ```bash
   npm run dev
   ```
2. Build the CSS (in a separate terminal):
   ```bash
   npm run build:css
   ```

### Production Build

To build the site for production:

```bash
npm run build
```

The output will be in the `public` directory.

## Project Structure

- `content/`: Contains all the content files (Markdown)
- `layouts/`: HTML templates for the site
- `static/`: Static assets (images, etc.)
- `assets/`: Source files for CSS
- `themes/`: Hugo themes

## CSS Processing

This project uses Tailwind CSS. The source files are in `assets/css/` and the compiled output goes to `static/css/styles.css`.

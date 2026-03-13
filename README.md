# Bhargava Manikanta — Portfolio

Personal portfolio website for a Full Stack .NET Developer.
Built with **React + Vite + Tailwind CSS**.

---

## Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Fixed navigation bar
│   │   ├── Hero.jsx          # Landing / hero section
│   │   ├── About.jsx         # About + stats
│   │   ├── Skills.jsx        # Grouped skill lists
│   │   ├── Projects.jsx      # Project cards
│   │   ├── Experience.jsx    # Work experience timeline
│   │   ├── Achievements.jsx  # Key metrics
│   │   ├── Contact.jsx       # Email + LinkedIn links
│   │   ├── Footer.jsx        # Footer
│   │   └── Divider.jsx       # Section separator
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```

---

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

Output goes to dist/ — deploy to Vercel, Netlify, or any static host.

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS v3
- Lucide React (icons)
- JetBrains Mono + DM Sans (fonts via Google Fonts)

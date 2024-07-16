import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "rgb(var(--background-rgb))",
        "background-focus": "rgb(var(--background-focus-rgb))",
        "primary": "rgb(var(--primary-rgb))",
        "secondary": "rgb(var(--secondary-rgb))",
        "priority-high": "rgb(var(--priority-high-rgb))",
        "priority-medium": "rgb(var(--priority-medium-rgb))",
        "priority-low": "rgb(var(--priority-low-rgb))",
        "priority-blank": "rgb(var(--priority-blank-rgb))",
        "deadline-late": "rgb(var(--deadline-late-rgb))",
        "deadline-close": "rgb(var(--deadline-close-rgb))",
        "status-finished": "rgb(var(--status-finished-rgb))",
        "status-inprogress": "rgb(var(--status-inprogress-rgb))",
        "status-todo": "rgb(var(--status-todo-rgb))",
      },
    },
  },
  plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{js,jsx}"],
theme: {
extend: {
fontFamily: {
inter: ["Inter", "sans-serif"],
playfair: ["Playfair Display", "serif"],
},
colors: {
primary: {
600: "#6b46c1",
700: "#553c9a",
},
},
},
},
plugins: [],
};

/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
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
=======

import { plugin } from 'postcss'

export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                playfair: ["playfair Display","serif"],
            },
            colors: {
                primary: {
                    600: "#6b46c1",
                    700: "#553c9a",
                },

            },
        },
    },
    plugin: [],
>>>>>>> 2d74ae233b887728118d5262145299b81cb44a8c
};

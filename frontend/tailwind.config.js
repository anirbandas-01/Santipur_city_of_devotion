/** @type {import('tailwindcss').Config} */

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
};

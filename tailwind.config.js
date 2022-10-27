/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            "midnight": "#121063",
            "gray-light": "#d3dce6",
            "gray": "#374151",
            "dark": "#121616",
            "white": "#fff",
            "cyan": "#06F7F7",
        },
        fontFamily: {
            anton: ["Anton", "sans-serif"],
        },
    },
    plugins: [],
};

/** @type {import('tailwindcss').Config} */
const plugin = require("@tailwindcss/forms");

module.export = {
    mode: "jit",
    content : ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
    darkMode: "class",
    theme: {
        screen: { md: { max: "1050px" }, sm: {max: "550px"} },
        extend: {
            color: {
                white: { 
                    a700: "var(--white_a700)",
                    a700_01: "var(--white_a700_01)",
                    a700_b2: "var(--white_a700_b2)"
                },
                indigo: {
                    400: "var(--indigo_400)",
                    "800_7f": "var(--indigo_800_7f)"
                },
                black: {
                    900: "var(--black_900)",
                    "900_3f": "var(--black_900_3f)",
                    "900_19": "var(--black_900_19)",
                    "900_7f": "var(--black_900_7f)"
                },
                blue_gray: {
                    600: "var(--blue_gray_600)",
                    800: "var(--blue_gray_800)",
                    900: "var(--blue_gray_900)",
                    "800_01": "var(--blue_gray_800_01)"
                },
                gray: {
                    400: "var(--gray_400)",
                    900: "var(--gray_900)"
                },
            },
            boxShadow: {},
            backgroundImage: {
                gradient2: "linear-gradient(90deg, #4d8eb7, #223F51)"
            },
            fontFamily: {
                quicksand1: "Quicksand"
            },
            textShadow: {
                ts2: "0px 0px 1px #373e837f",
                ts3: "0px 4px 4px #0000003f"
            },
        },
    },
    plugins: [require("@tailwindcss/form")],
};
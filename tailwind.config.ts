import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontSize: {
      heading: ["36px", { lineHeight: "150%", letterSpacing: "-0.025em" }], // Heading 36px
      subHeading: ["28px", { lineHeight: "150%", letterSpacing: "-0.025em" }], // SubHeading 28px
      title1: ["24px", { lineHeight: "150%", letterSpacing: "-0.025em" }], // Title1 24px
      subtitle: ["20px", { lineHeight: "150%", letterSpacing: "-0.015em" }], // Subtitle 20px
      subtitle2: ["20px", { lineHeight: "200%", letterSpacing: "-0.015em" }], // Subtitle2 20px (for hero subtitle)
      title2: ["18px", { lineHeight: "150%", letterSpacing: "-0.015em" }], // Title2 18px
      body1: ["15px", { lineHeight: "150%", letterSpacing: "0.010em" }], // Body1 15px
      body2: ["15px", { lineHeight: "150%", letterSpacing: "0" }], // Body2 15px (For Galmuri)
      caption: ["13px", { lineHeight: "150%", letterSpacing: "0" }], // Caption 13px
      small: ["11px", { lineHeight: "150%", letterSpacing: "0" }], // Small1 11px
      mini: ["9px", { lineHeight: "150%", letterSpacing: "0" }] // Mini 9px
    },
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        galmuri: ["var(--font-galmuri)"]
      },
      colors: {
        primary: {
          default: "#845F4C", // Brown/700
          light: "#BCA386", // Brown/400
          strong: "#553428" // Brown/900
        },
        secondary: {
          default: "#CDD5AE", // SageGreen/500
          light: "#E9F0DB" // SageGreen/100
        },
        status: {
          success: "#00F050", // Green/600
          danger: "#ED7373", // Red/400
          warning: "#FFDA6B", // Yellow/300
          info: "#71AAFE" // Blue/300
        },
        brown: {
          "50": "#FFF9F0",
          "100": "#F4EBDC",
          "200": "#D2C7B6",
          "300": "#BEB29F",
          "400": "#BCA386",
          "500": "#A88A76",
          "600": "#93705C",
          "700": "#845F4C",
          "800": "#6C4839",
          "900": "#553428",
          "950": "#3D241B"
        },
        sageGreen: {
          DEFAULT: "#CDD5AE", // SageGreen/500
          "50": "#F7F9F3", // SageGreen/50
          "100": "#E9F0DB", // SageGreen/100
          "200": "#DDE4C7", // SageGreen/200
          "300": "#D2DAB6", // SageGreen/300
          "400": "#C9D1AA", // SageGreen/400
          "500": "#CDD5AE", // SageGreen/500
          "600": "#B4BF98", // SageGreen/600
          "700": "#9AA57F", // SageGreen/700
          "800": "#7F8C68", // SageGreen/800
          "900": "#5A6248", // SageGreen/900
          "950": "#39402F" // SageGreen/950
        },
        bg: {
          "01": "#FFFFFF",
          "02": "#FFF9F0", // Brown/50
          "03": "#D2C7B6" // Brown/200
        },
        line: {
          "01": "#F5F5F5",
          "02": "#E8E8E8",
          "03": "#D1D1D1",
          "04": "#B8B8B8"
        },
        text: {
          "01": "#FFFFFF",
          "02": "#B8B8B8",
          "03": "#6E6E6E",
          "04": "#1A1A1A"
        },
        gray: {
          "50": "#F5F5F5",
          "100": "#E8E8E8",
          "200": "#D1D1D1",
          "300": "#B8B8B8",
          "400": "#9E9E9E",
          "500": "#878787",
          "600": "#6E6E6E",
          "700": "#575757",
          "800": "#3D3D3D",
          "900": "#242424",
          "950": "#1A1A1A"
        },
        green: {
          "100": "#F0FFF5",
          "200": "#BDFFD3",
          "300": "#8AFFB1",
          "400": "#57FF8F",
          "500": "#24FF6D",
          "600": "#00F050",
          "700": "#00BF40",
          "800": "#008A2E",
          "900": "#00571D",
          "950": "#00240C"
        },
        red: {
          "100": "#FEFAFA",
          "200": "#F9CDCD",
          "300": "#F3A0A0",
          "400": "#ED7373",
          "500": "#E74646",
          "600": "#DF1D1D",
          "700": "#B01717",
          "800": "#831111",
          "900": "#560B0B",
          "950": "#290505"
        },
        yellow: {
          "100": "#FFF4D1",
          "200": "#FFE79E",
          "300": "#FFDA6B",
          "400": "#FFCD38",
          "500": "#FFC107",
          "600": "#D19D00",
          "700": "#9E7700",
          "800": "#6B5000",
          "900": "#382A00",
          "950": "#050400"
        },
        blue: {
          "100": "#D7E7FF",
          "200": "#A4C8FE",
          "300": "#71AAFE",
          "400": "#3F8CFD",
          "500": "#0C6EFD",
          "600": "#0257D4",
          "700": "#0142A2",
          "800": "#012E6F",
          "900": "#01193D",
          "950": "#00040A"
        }
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        loadingText: {
          "0%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(0)" }
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        scaleUp: {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" }
        },
        scaleDown: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.95)" }
        },
        slideIn: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" }
        },
        slideOut: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" }
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      },
      animation: {
        gradient: "gradient 4s linear infinite",
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-out",
        scaleUp: "scaleUp 0.3s ease-out",
        scaleDown: "scaleDown 0.3s ease-out",
        slideIn: "slideIn 0.3s ease-in-out",
        slideOut: "slideOut 0.3s ease-in-out"
      },
      screens: {
        xs: "280px", // Extra small (≥280px)
        s: "320px", // small (≥320px)
        sm: "380px", // default mobile (≥380px)
        mb: "480px", // Mobile (≥480px)
        ml: "640px", // Small Tablet (≥640px)
        tb: "768px", // Tablet (≥768px)
        lt: "1024px", // Desktop (≥1024px)
        xl: "1200px" // Large desktop (≥1200px)
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["checked"], // checked 상태에서 배경색 활성화
      borderColor: ["checked"], // checked 상태에서 테두리색 활성화
      textColor: ["checked"] // checked 상태에서 텍스트 색상 활성화
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      const newUtilities = {
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }
      };
      addUtilities(newUtilities);
    }
  ]
};
export default config;

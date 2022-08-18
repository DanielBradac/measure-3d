module.exports = {

    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            measure3dTheme: {
                // tailwind blue - 600
                "primary": "#2563EB",
                // tailwind blue - 300
                "secondary": "#93C5FD",
                // tailwind emerald - 400
                "accent": "#34D399",
                // tailwind slate - 200
                "neutral": "#E2E8F0",
                "base-100": "#FFFFFF",
                // tailwind sky - 500
                "info": "#0EA5E9",
                // tailwind green - 500
                "success": "#22C55E",
                // tailwind yellow - 400
                "warning": "#FACC15",
                // tailwind red - 500
                "error": "#EF4444"
            },
        }, ],
    },
    theme: {
        extend: {
            fontFamily: {
                'main': ["'Roboto Mono', monospace"],
                'tag': ["'Courier New', Courier, monospace"]
            },
            minHeight: {
                'canvas': '35%'
            },
            minWidth: {
                'canvas': '35%'
            },
            width: {
                'controlPanel': '80vw'
            },
            height: {
                'fullScreen': '100vh'
            },
            alignItems: {
                'top': 'top'
            },
            display: {
                'displatTable': 'table'
            }
        }
    }
}
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
            minWidth: {
                'leftSide': '30%'
            },
            maxWidth: {
                'leftSide': '70%',
                'calculatorInput': 'inherit'
            },
            minHeight: {
                'canvas': '35%'
            },
            maxHeight: {
                'canvas': '95%'
            },
            width: {
                'halfScreen': '50vw'
            },
            alignItems: {
                'top': 'top'
            },
            keyframes: {
                'fade-in-down': {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(-10px)',
                        display: 'none'
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
                'fade-out-up': {
                    'from': {
                        opacity: '1',
                        transform: 'translateY(0px)'
                    },
                    'to': {
                        opacity: '0',
                        transform: 'translateY(-10px)',
                        display: 'none'
                    },
                }
            },
            animation: {
                'fade-in-down': 'fade-in-down 0.5s',
                'fade-out-up': 'fade-out-up 0.5s'
            }
        }
    }
}
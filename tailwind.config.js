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
                'fade-in': {
                    'from': {
                        opacity: '0',

                    },
                    'to': {
                        opacity: '1',
                    },
                },
                'fade-out': {
                    'from': {
                        opacity: '1',

                    },
                    'to': {
                        opacity: '0',
                    },
                },
                'fade-in-down': {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(-15px)',
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
                        transform: 'translateY(-15px)',
                        display: 'none'
                    },
                },
                'rotate-180': {
                    'to': {
                        transform: 'rotate(180deg)'
                    },
                },
                'click': {
                    'to': {
                        transform: 'translateY(4px)'
                    }
                },
                'clickPrimaryBg': {
                    'from': {
                        backgroundColor: '#2563EB'
                    },
                    'to': {
                        transform: 'translateY(4px)',
                        backgroundColor: 'inherit'
                    }
                },
                'toWhite': {
                    'to': {
                        color: 'white'
                    }
                },
                'bgToPrimary': {
                    'to': {
                        // primary
                        backgroundColor: '#2563EB'
                    }
                }

            },
            animation: {
                'fade-in-down': 'fade-in-down 0.5s forwards',
                'fade-out-up': 'fade-out-up 0.5s forwards',
                'rotate-180': 'rotate-180 0.7s forwards',
                'click': 'click 0.2s forwards',
                'clickPrimaryBg': 'clickPrimaryBg 0.2s forwards',
                'toWhite': 'toWhite 0.6s forwards',
                'bgToPrimary': 'bgToPrimary 0.6s forwards',
                'fade-in': 'fade-in 0.7s forwards',
                'fade-out': 'fade-out 0.7s forwards'
            }
        }
    }
}
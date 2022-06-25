module.exports = {
    important: '#root',
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
            alignItems: {
                'top': 'top'
            }
        }
    },
    plugins: []
}
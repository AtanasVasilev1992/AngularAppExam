const PROXY_HOST = "http://localhost:3030";

const PROXY_CONFIG = [
    {
        context: ["/api"],
        target: PROXY_HOST,
        secure: false,
    },
];

module.exports = PROXY_CONFIG;

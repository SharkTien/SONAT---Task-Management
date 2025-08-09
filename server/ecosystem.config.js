module.exports = {
    apps: [
        {
            name: "SONAT---Task-Management",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
            },
        },
    ],
};
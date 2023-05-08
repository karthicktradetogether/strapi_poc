module.exports = {
    routes: [
        {
            method: 'POST',
            path: "/createApplicant",
            handler: "get-cart-data.customAction",
            config: {
                auth: false
            }
        }
    ]
}
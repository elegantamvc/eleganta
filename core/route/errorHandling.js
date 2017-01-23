module.exports.setErrors = (app, config) => {
    app.use((req, res, next) => {
        res.status(404).render(config.Error404);
    });

    app.use((err, req, res, next) => {
        res.status(500).render(config.Error500, {error: err.stack});
    });
};

module.exports.setErrors = (app) => {
    app.use((req, res, next) => {
        res.status(404).render('shared/404');
    });

    app.use((err, req, res, next) => {
        res.status(500).render('shared/error', {error: err.stack});
    });
};

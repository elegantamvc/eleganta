module.exports.setErrors = (app) => {
    app.use((req, res, next) => {
        res.status(404).render('shared/404');
    });
};

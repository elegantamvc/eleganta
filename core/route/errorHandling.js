module.exports.setErrors = (app, config) => {
    app.use((req, res, next) => {
        res.status(404).render(config.Error404);
    });

    app.use((err, req, res, next) => {
        let errorArray = err.stack.split('at');
        let regExp = /\(([^)]+)\)/;
        let errorBreakDown = regExp.exec(errorArray[1])[1].split(':');
        let filePath = errorBreakDown[0];
        let fileLine = errorBreakDown[1];
        let fileColumn = errorBreakDown[2];
        
        console.log(filePath);
        res.status(500).render(config.Error500, {errors: errorArray});
    });
};

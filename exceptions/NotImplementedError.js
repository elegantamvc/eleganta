class NotImplementedError extends Error {

    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber);
    }

}

module.exports = NotImplementedError;
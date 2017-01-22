const fs = require('fs');

/**
 * Helper config class for reading values from project's
 * config folder
 */
class Config {
    /**
     * Contrustor taking the path we will be using to build
     * our eleganta project
     * @param {string} path - Absolute ath of project's config folder
     */
    constructor(path) {
        this.settingsPath = path+'/config/';
    }


    /**
     * Method for returning the config.json
     * file in the Eleganta project as an object
     * @return {Object} - Object representation of config.json
     */
    config() {
        return this.getSettingsFiles('config');
    }


    /**
     * Method that syncronously reads a file json file and
     * returns it's contense as an object
     * @param {String} filename - Name of config to get
     * @return {Object}
     */
    getSettingsFiles(filename) {
        let content = fs.readFileSync(this.settingsPath + 'config.json');
        return JSON.parse(content);
    }
}

module.exports = Config;
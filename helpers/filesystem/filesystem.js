const path = require('path');
const fs = require('fs');


/**
 * Function for recursively finding files in a provided path
 * and returning the absolute paths in a string array.
 * @param {String} dir - Directory to recursively look in
 * @param {String[]} filelist - Nullable array of files to add too
 * @return {String[]} - Abosolute path of all files in folder
 */
module.exports.walkSync = function(dir, filelist) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = module.exports.walkSync(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

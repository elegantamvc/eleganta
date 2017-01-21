
/**
 * Helper function for parsing out the noise
 * of the command line arguments and returning
 * just the eleganta commands
 * @param {String[]} args - Array of arguments from the terminal
 * @return {String[]} - Shortend array of just useful string for commands
 */
module.exports.parseOutCommands = (args) => {
    let commandIndex = 0;

    for(let i = 0; i < args.length; i ++) {
        if(args[i].indexOf('eleganta') > -1 || args[i].indexOf('core') > -1) {
            commandIndex = i+1;
            break;
        }
    }

    return args.splice(commandIndex, args.length);
};


/**
 * Method that runs Eleganta it self by parsing out
 * command line arguments and choosing the action
 * to take.
 * @param {String[]} args - Array of arguments from the terminal
 */
module.exports.runEleganta = (args) => {
    let commands = parseOutCommands(args);

    if(commands.length == 1 && commands[0] == 'serve') {

    }
};

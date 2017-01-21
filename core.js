const Cli = require('./cli/cli');
const args = process.argv;

console.log(Cli.parseOutArguments(args));



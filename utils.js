const { exec } = require('child_process'); // to execute shell commands

function executeCommand(command, callbackFunction = null) {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            // an error occured
            console.error(err);
            // stderr contains only the error message without all the verbose details in 'err' variable
            var errorMessage = stderr;
        } 
        if (callbackFunction != null) {
            callbackFunction(stdout);
        }
    });
}

module.exports = {
    executeCommand,
};
// written by Hassan Kanj (https://www.hassankanj.com) [MIT License]

const utils = require("./utils.js");
const commandLineArgs = require('command-line-args')

// defining the CLI args
const optionDefinitions = [
  { name: 'container-id', type: String},
  { name: 'old-volume', type: String},
  { name: 'new-volume', type: String},
  { name: 'additional-options', type: String},
]

// get the CLI args
const options = commandLineArgs(optionDefinitions);


// if the option --container-id is not set, exit.
if(typeof options['container-id'] === 'undefined') {
    console.log('Error: --container-id is not set! exiting...');
    return;
}

// if the option --old-volume is not set, exit.
if(typeof options['old-volume'] === 'undefined') {
    console.log('Error: --old-volume is not set! exiting...');
    return;
}

// if the option --new-volume is not set, exit.
if(typeof options['new-volume'] === 'undefined') {
    console.log('Error: --new-volume is not set! exiting...');
    return;
}

let oldVolume                   = options['old-volume'];
let newVolume                   = options['new-volume'];
let currentContainerId          = options['container-id'];
let attachedDirectory           = null; // this is the directory that's attached to the volume
let additionalOptions           = '';  // any extra options that should be attached to the 'docker run' command [e.g publishing port(s), setting env variables,...]
let stopCurrentContainerCommand = `docker stop ${currentContainerId}`;

let containerImage;
let createContainerCommand;

// additionalOptions is an optional arg, set it only if specified in the CLI
if(typeof options['additional-options'] !== 'undefined') {
    additionalOptions = options['additional-options'];
}

// first get some details about the current container.
utils.executeCommand(`docker inspect ${currentContainerId}`, (result) => {
    let containerInfo = JSON.parse(result);
    containerImage    = containerInfo[0].Config.Image; // get the current container image [used when creating the new container with the new volume]

    // check if the oldVolume is actually attached to the container (if not, exit)
    containerInfo[0].Mounts.forEach(element => {
        if(element.Type == 'volume' && element.Name == oldVolume) {
            attachedDirectory = element.Destination;
        }
    });
    if(attachedDirectory == null) {
        console.log(`Error: The source volume [${oldVolume}] isn't attached to the specified container! exiting...`);
        return;
    } else {
        console.log(`>> The source volume is currently attached to the directory: [${attachedDirectory}]`);

        console.log(`>> Stopping the current container...`);
        console.log(`>> ${stopCurrentContainerCommand}`);

        // stop the current container, and create a new container with the new volume
        utils.executeCommand(stopCurrentContainerCommand, (result) => {
            console.log(result);
            console.log(`>> Creating a new container and attaching the new volume [${newVolume}] to it.`);
            createContainerCommand = `docker run -dit -v ${newVolume}:${attachedDirectory} ${additionalOptions} ${containerImage}`;        
            console.log(`>> ${createContainerCommand}`);

            utils.executeCommand(createContainerCommand, (result) => {
                console.log(`Your new container ID is: ${result}`);
            })
        })        
    } // else
}); // executeCommand()


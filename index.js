const { fork } = require('child_process');
const fileNameArray = [
    "file1.txt",
    "file2.txt",
    "file3.txt",
    "file4.txt",
    "file5.txt",
    "file6.txt",
    "file7.txt",
    "file8.txt",
    "file9.txt",
    "file10.txt"
];

let i = 0;
invoke(fileNameArray[i]);

function invoke(fileName) {
    const readProcess = fork('./fileRead.js');
    // listen for messages from forked process
    readProcess.send({ fileName });
    readProcess.on('message', (message) => {
        readProcess.kill('SIGTERM');
        console.log(`Data read for file: ${fileName}`);

        const writeProcess = fork('./fileWrite.js');
        writeProcess.send({ content: message.content });
        writeProcess.on('message', (message2) => {
            writeProcess.kill('SIGTERM');
            console.log(`Data written for file: ${fileName}`);
            i++;
            if (i < fileNameArray.length) {
                invoke(fileNameArray[i])
            }
        });
    });
}
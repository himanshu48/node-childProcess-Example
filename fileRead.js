const fs = require('fs');

async function readFile(fileName) {
    try {
        const data = fs.readFileSync('./read/' + fileName, 'utf8')
        console.log("Child Process: Read")
        return data;
    } catch (err) {
        console.log(err)
    }
}

process.on('message', async (message) => {
    const content = await readFile(message.fileName);
    process.send({ content });
});
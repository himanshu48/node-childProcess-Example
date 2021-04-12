const fs = require('fs');

async function writeFile(data) {
    try {
        data += "\n"
        const res = fs.writeFileSync('combine.txt', data, { flag: 'a' })
        console.log("Child Process: Write")
        return res;
    } catch (err) {
        console.log(err)
    }
}
// receive message from master process
process.on('message', async (message) => {
    const status = await writeFile(message.content);
    process.send({ status });
});
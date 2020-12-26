const fs = require('fs');
const smartcast = require('vizio-smart-cast');
const readline = require('readline');

const tv = new smartcast('192.168.0.154');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


tv.pairing.initiate().then(response => {
    rl.question('Enter PIN: ', answer => {
        tv.pairing.pair(answer).then(response => {
            console.log(`Received token: ${response.ITEM.AUTH_TOKEN}`);
            fs.writeFileSync('vizio_token', response.ITEM.AUTH_TOKEN);
        });

        rl.close();
    });
});

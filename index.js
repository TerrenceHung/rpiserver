const { exec } = require('child_process');
const { StatusCodes } = require('http-status-codes');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const smartcast = require('vizio-smart-cast');

const app = express();
app.use(express.json());
app.use(morgan('short'));

app.get('/', (req, res) => res.send('Hello world'));

app.post('/api/steamlink', async (req, res) => {
    if (req.body.action == 'start') {
        console.log('Running Steam Link script');
        const steamProcess = exec(`sh ${__dirname}/scripts/start_steam_link.sh`, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
            } else {
                res.send('Steam Link is now running');
            }
        });

        steamProcess.stdout.pipe(process.stdout);
        steamProcess.stderr.pipe(process.stderr);

        let tv;
        try {
            tv = new smartcast('192.168.0.154', fs.readFileSync(`${__dirname}/vizio_token`));
         } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Could not find Vizio token');
            return;
        }

        const isTvOn = Boolean(await tv.power.currentMode().then(data => data.ITEMS[0].VALUE));
        if (!isTvOn) {
            console.log('Turning on Vizio TV');
            tv.control.power.on();
        }

        console.log('Changing input to Raspberry Pi');
        tv.input.set('HDMI-2');
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

app.listen(8000, () => {
    console.log('Now listening on port 8000');
});

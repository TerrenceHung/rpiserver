const { exec } = require('child_process');
const { StatusCodes } = require('http-status-codes');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('short'));

app.get('/', (req, res) => res.send('Hello world'));

app.post('/api/steamlink', (req, res) => {
    if (req.body.action == 'start') {
        console.log('Running Steam Link script');
        const steamProcess = exec('sh /opt/scripts/start_steam_link.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            } else {
                res.send('Steam Link is now running');
            }
        });

        steamProcess.stdout.pipe(process.stdout);
        steamProcess.stderr.pipe(process.stderr);
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

app.listen(8000, () => {
    console.log('Now listening on port 8000');
});

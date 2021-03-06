const express = require('express');
const { AuthenticationClient } = require('forge-server-utils');

const { FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, PORT } = process.env;

const serverPort = PORT || 3000;

let app = express();
app.use(express.static('public'));
app.get('/api/auth/token', async function (req, res) {
    try {
        const authClient = new AuthenticationClient(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET);
        const token = await authClient.authenticate(['viewables:read']);
        res.json(token);
    } catch(err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
app.listen(serverPort, () => console.log(`Server listening on port ${serverPort}...`));
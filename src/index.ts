import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

import {APP_PORT} from "../config/env.conf";

let app = express();

app.use('/', express.static(__dirname + '../static'));
app.use(bodyParser({limit: '500mb'}));
app.use(compression());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Register routes
app.use('/make-file', maker);

app.get('*', function (request, response) {
    response.sendFile(__dirname + '../static/index.html');
});

app.listen(APP_PORT, () => {
});
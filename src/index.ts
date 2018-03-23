import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as path from 'path';
import {Maker} from "./maker";

import {APP_PORT} from "./config/env.conf";

let app = express();

app.use('/', express.static(__dirname + '/../static'));
app.use(bodyParser({limit: '500mb'}));
app.use(compression());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Register routes
app.use('/make-file', Maker.run);

app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname + '/../static/index.html'));
});

app.listen(APP_PORT, () => {
});
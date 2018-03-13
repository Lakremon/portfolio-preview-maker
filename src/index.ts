import * as path from 'path';
// import * as childProcess from 'child_process';
import * as phantomjs from 'phantomjs-prebuilt';
import * as process from 'process';

var program = phantomjs.exec(
    __dirname + '/uploader.js',
    'https://sib220v.ru/',
    './assets/desktop.png',
    '1920x1080'
);
program.stdout.pipe(process.stdout);
program.stderr.pipe(process.stderr);
let getAllImages = new Promise();
const desktopImage = program.on('exit');

getAllImages.all([desktopImage]);
getAllImages.then(function (){

});

// const binPath = phantomjs.path;
// let t = Date.now();
// phantomjs.open('https://sib220v.ru/', function (status) {
//     console.log(status);
//     if (status !== 'success') {
//         console.log('FAIL to load the address');
//     } else {
//         t = Date.now() - t;
//         console.log('Loading ' + system.args[1]);
//         console.log('Loading time ' + t + ' msec');
//     }
//     phantomjs.exit();
// });
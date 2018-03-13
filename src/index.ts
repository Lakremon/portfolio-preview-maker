import * as phantomjs from 'phantomjs-prebuilt';
import * as process from 'process';

let script = __dirname + '/uploader.js';
let url = 'https://sib220v.ru/';

let getDesktopImage = phantomjs.exec(
    script,
    url,
    './tmp/desktop.png',
    '1920x1080'
);
let getTabletImage = phantomjs.exec(
    script,
    url,
    './tmp/tablet.png',
    '1366x1024'
);
let getMobileImage = phantomjs.exec(
    script,
    url,
    './tmp/mobile.png',
    '320x568'
);
getDesktopImage.stdout.pipe(process.stdout);
getDesktopImage.stderr.pipe(process.stderr);
getTabletImage.stdout.pipe(process.stdout);
getTabletImage.stderr.pipe(process.stderr);
getMobileImage.stdout.pipe(process.stdout);
getMobileImage.stderr.pipe(process.stderr);
Promise.all([
    new Promise((resolve, reject) => {
        getDesktopImage.on('exit', code => {
            if(code===0){
                resolve(code);
            }else{
                reject(code);
            }
        })
    }),
    new Promise((resolve, reject) => {
        getTabletImage.on('exit', code => {
            if(code===0){
                resolve(code);
            }else{
                reject(code);
            }
        });

    }),
    new Promise((resolve, reject) => {
        getMobileImage.on('exit', code => {
            if(code===0){
                resolve(code);
            }else{
                reject(code);
            }
        });
    })
]).then(result => {
    console.log(result);123
});
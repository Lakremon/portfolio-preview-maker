import * as phantomjs from 'phantomjs-prebuilt';
import * as process from 'process';
import * as Jimp from "jimp";

let script = __dirname + '/uploader.js';
let url = 'https://github.com/';

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
            if (code === 0) {
                resolve(code);
            } else {
                reject(code);
            }
        })
    }),
    new Promise((resolve, reject) => {
        getTabletImage.on('exit', code => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(code);
            }
        });

    }),
    new Promise((resolve, reject) => {
        getMobileImage.on('exit', code => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(code);
            }
        });
    })
]).then(result => {
    new Jimp(1000, 800, (err, image) => {
        Promise.all([
            Jimp.read("./tmp/desktop.png"),
            Jimp.read("./tmp/mobile.png"),
            Jimp.read("./assets/template.png"),
        ]).then(images => {
            images.push(image)
            console.log(images);
            let desctopImage = images[0];
            let mobileImage = images[1];
            let templateImage = images[2];
            desctopImage.resize(903,507);
            mobileImage.resize(236,418);
            image
                .blit(desctopImage, 49, 49)
                .blit(mobileImage, 674, 225)
                .composite(templateImage, 0, 0)
                .write('./tmp/result.png');
        })
    });

});
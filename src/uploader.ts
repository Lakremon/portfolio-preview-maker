var page = require('webpage').create(),
    system = require('system');
address = system.args[1];
imageName = system.args[2];
//viewportSize being the actual size of the headless browser
page.viewportSize = {width: 1920, height: 1080};
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = {top: 0, left: 0, width: 1920, height: 1080};
page.open(address, function (status) {
    page.render(imageName);
    phantom.exit();
});

//viewportSize being the actual size of the headless browser
page.viewportSize = {width: 640, height: 1136};
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = {top: 0, left: 0, width: 640, height: 1136};
page.open(address, function (status) {
    page.render(imageName);
    phantom.exit();
});
